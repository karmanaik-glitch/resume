'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.1;
    }
    // Make the inner core pulse
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
      </EffectComposer>

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group ref={groupRef} scale={1.5}>
          
          {/* INNER GLOWING CORE (The Data) */}
          <mesh ref={coreRef}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#C8A96E" // Clinical Gold
              emissive="#C8A96E"
              emissiveIntensity={2} 
              wireframe 
            />
          </mesh>

          {/* OUTER FROSTED GLASS SHELL (The Structure) */}
          <mesh scale={1.8}>
            <icosahedronGeometry args={[1, 1]} />
            <meshPhysicalMaterial 
              color="#ffffff"
              transmission={0.9}     // Makes it glass-like
              opacity={1}
              metalness={0.1}
              roughness={0.3}        // Gives it a 'frosted' look
              ior={1.5}              // Index of Refraction (bends light)
              thickness={0.5}        // Volume of the glass
            />
          </mesh>

        </group>
      </Float>
    </>
  );
}
