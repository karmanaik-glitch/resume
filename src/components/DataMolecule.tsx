'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slowly rotate the entire liquid shape
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.2} />
      </EffectComposer>

      {/* Float makes it gently bob up and down like it's in zero-gravity */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={meshRef} scale={1.8}>
          {/* A complex interlocking torus knot shape */}
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          
          {/* The magic: A shader that warps the geometry like liquid */}
          <MeshDistortMaterial
            color="#161927"           // Matches your surface color
            emissive="#00D4FF"        // Clinical Cyan glow
            emissiveIntensity={0.2}
            distort={0.4}             // How much it morphs
            speed={2}                 // Speed of the morphing
            roughness={0.2}           // Makes it look shiny/wet
            metalness={0.8}
            wireframe={true}          // Keeps it tech-focused rather than a solid blob
          />
        </mesh>
      </Float>
    </>
  );
}
