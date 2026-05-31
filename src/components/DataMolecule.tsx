'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. VERTEX SHADER (Controls the 3D Liquid Morphing)
// --------------------------------------------------------
const vertexShader = `
  uniform float uTime;
  uniform float uScroll;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vNormal = normalize(normalMatrix * normal);
    
    // Create an organic, liquid-like morphing effect using sine waves
    vec3 pos = position;
    
    // The distortion gets stronger and faster based on scroll depth
    float speed = uTime * (0.5 + uScroll * 2.0);
    float noise = sin(pos.x * 3.0 + speed) * cos(pos.y * 3.0 + speed) * sin(pos.z * 3.0 + speed);
    
    // Push the surface of the sphere in and out
    pos += normal * noise * 0.3;
    
    // Pass the new position to the fragment shader
    vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

// --------------------------------------------------------
// 2. FRAGMENT SHADER (Controls the X-Ray / Holographic Glow)
// --------------------------------------------------------
const fragmentShader = `
  uniform vec3 uColorCyan;
  uniform vec3 uColorGold;
  uniform float uScroll;
  
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    // FRESNEL EFFECT: Calculates the angle of the viewer's camera to the 3D object
    // This makes the edges glow brightly while the center remains transparent (X-Ray effect)
    vec3 viewDirection = normalize(-vPosition);
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 3.0); // The higher the power, the sharper the edge glow
    
    // Blend the colors based on how far the user has scrolled
    vec3 finalColor = mix(uColorCyan, uColorGold, uScroll);
    
    // Apply the color and transparency
    gl_FragColor = vec4(finalColor * fresnel * 2.0, fresnel * 0.9);
  }
`;

// --------------------------------------------------------
// 3. REACT THREE FIBER COMPONENT
// --------------------------------------------------------
export default function DataMolecule() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentScroll = useRef(0);

  // Define the variables (Uniforms) that we send to the GPU
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColorCyan: { value: new THREE.Color('#00D4FF') }, // Clinical Cyan
    uColorGold: { value: new THREE.Color('#C8A96E') }  // Clinical Gold
  }), []);

  useFrame((state, delta) => {
    // 1. Update the Time variable for the liquid animation
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }

    // 2. Capture and calculate scroll position safely
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = scrollY / maxScroll;

    // 3. Smooth the scroll data (LERP)
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollPercent, delta * 4);

    // 4. Send the smooth scroll data to the GPU Shader
    if (materialRef.current) {
      materialRef.current.uniforms.uScroll.value = currentScroll.current;
    }

    // 5. Slowly rotate the entire hologram
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.05;
      
      // Move it down slightly as they scroll
      meshRef.current.position.y = -(currentScroll.current * 3);
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
      </EffectComposer>

      {/* A massive sphere with ultra-high segments (128x128) to allow for smooth liquid distortion */}
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 128, 128]} />
        
        {/* Our Custom GLSL Material */}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.AdditiveBlending} // Makes it glow like pure light
          depthWrite={false}
          wireframe={false} // Set to true if you want a liquid wireframe network!
        />
      </mesh>
    </>
  );
}
