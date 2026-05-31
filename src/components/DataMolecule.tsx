'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 2,500 data points to form a massive double helix
  const particleCount = 2500;
  
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const colorCyan = new THREE.Color('#00D4FF'); // Clinical Cyan
    const colorGold = new THREE.Color('#C8A96E'); // Clinical Gold

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const angle = t * Math.PI * 40; // Number of twists in the helix
      
      // Add random noise to make it look like a cloud of data, not a perfect solid line
      const radius = 2.5 + (Math.random() - 0.5) * 0.8;
      const height = (t - 0.5) * 40; // Total length of the tunnel

      // Strand 1 or Strand 2 (offset by 180 degrees)
      const strandOffset = i % 2 === 0 ? 0 : Math.PI;
      
      const x = Math.cos(angle + strandOffset) * radius + (Math.random() - 0.5) * 0.5;
      const z = Math.sin(angle + strandOffset) * radius + (Math.random() - 0.5) * 0.5;
      const y = height;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Gradient color mapping: Starts Cyan at the top, blends to Gold at the bottom
      const mixedColor = colorCyan.clone().lerp(colorGold, t);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return { positions, colors };
  }, []);

  // We use this ref to smoothly interpolate the scroll position
  const currentScroll = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Capture the browser's exact scroll position
    const scrollY = window.scrollY;
    // Calculate max scroll safely, defaulting to 1 to avoid division by zero
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    
    const scrollPercent = scrollY / maxScroll;

    // 2. LERP (Linear Interpolation) 
    // This makes the 3D movement buttery smooth
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollPercent, delta * 4);

    // 3. Scroll Animation Mechanics:
    // Move the entire helix DOWN as the user scrolls, creating a "diving" effect
    groupRef.current.position.y = currentScroll.current * 20;
    
    // Furiously twist the helix based on scroll depth
    groupRef.current.rotation.y = currentScroll.current * Math.PI * 3;

    // Add a very slow, constant ambient rotation so it feels alive even when not scrolling
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 + 0.5;
  });

  return (
    <>
      {/* High-end post-processing glow */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.8} />
      </EffectComposer>

      {/* The main helix group */}
      <group ref={groupRef}>
        <points>
          <bufferGeometry>
            {/* FIXED TYPESCRIPT ARGS FOR VERCEL */}
            <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            <bufferAttribute attach="attributes-color" args={[colors, 3]} />
          </bufferGeometry>
          <pointsMaterial 
            size={0.06} 
            vertexColors={true} 
            transparent={true} 
            opacity={0.8}
            sizeAttenuation={true} 
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
