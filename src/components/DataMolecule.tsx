'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. ADVANCED VERTEX SHADER (Calculates 100,000 points on the GPU)
// --------------------------------------------------------
const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  
  attribute float aRandom;
  varying vec3 vColor;

  void main() {
    vec3 pos = position;
    
    // FLUID NOISE MATH: Creates organic, flowing waves inside the particle system
    float noiseFreq = 0.5;
    float noiseAmp = 0.4;
    vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq - uTime * 0.2, pos.z * noiseFreq);
    
    pos.x += sin(noisePos.y) * cos(noisePos.z) * noiseAmp;
    pos.y += sin(noisePos.z) * cos(noisePos.x) * noiseAmp;
    pos.z += sin(noisePos.x) * cos(noisePos.y) * noiseAmp;
    
    // SCROLL PHYSICS: Twist the particles into a tighter vortex as the user scrolls
    float twistAmount = uScroll * 15.0; // How hard it twists
    float angle = atan(pos.z, pos.x) + (twistAmount * aRandom * (pos.y * 0.1));
    float radius = length(pos.xz);
    
    pos.x = cos(angle) * radius;
    pos.z = sin(angle) * radius;

    // COLOR INTERPOLATION: Cyan to Gold based on scroll depth and Y-position
    vec3 cyan = vec3(0.0, 0.83, 1.0);  // #00D4FF
    vec3 gold = vec3(0.78, 0.66, 0.43); // #C8A96E
    float mixFactor = (pos.y + 10.0) / 20.0 + (uScroll * 0.5);
    vColor = mix(cyan, gold, clamp(mixFactor, 0.0, 1.0));

    // PROJECTION
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    // Particles get smaller the further away they are (Depth of Field effect)
    gl_PointSize = (8.0 * aRandom) * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// --------------------------------------------------------
// 2. FRAGMENT SHADER (Renders perfectly soft glowing orbs)
// --------------------------------------------------------
const fragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Instead of rendering ugly square pixels, we use math to draw a soft circle
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1; // Soft glowing edge
    
    if (strength < 0.0) discard; // Don't render pure black pixels
    
    gl_FragColor = vec4(vColor, strength * 1.5);
  }
`;

// --------------------------------------------------------
// 3. MAIN COMPONENT
// --------------------------------------------------------
export default function DataMolecule() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentScroll = useRef(0);

  // Generate 100,000 particles in a massive spatial cylinder
  const particleCount = 100000;
  
  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const randoms = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Create a cylindrical galaxy shape
      const radius = Math.random() * Math.random() * 8; // Concentrated in the center
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 25; // How tall the vortex is
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      randoms[i] = Math.random(); // Pass random numbers to GPU for variance
    }
    return { positions, randoms };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 }
  }), []);

  useFrame((state, delta) => {
    if (!materialRef.current || !pointsRef.current) return;

    // 1. Update Time for the fluid noise
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // 2. Calculate Smooth Scroll
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = scrollY / maxScroll;
    
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollPercent, delta * 4);

    // 3. Send Scroll Data to GPU
    materialRef.current.uniforms.uScroll.value = currentScroll.current;

    // 4. Move the camera "down" into the tunnel as they scroll
    pointsRef.current.position.y = currentScroll.current * 15;
    
    // Add a very slow ambient rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <>
      <EffectComposer>
        {/* mipmapBlur creates that expensive, hazy cinematic glow */}
        <Bloom luminanceThreshold={0.01} mipmapBlur intensity={1.2} />
      </EffectComposer>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
