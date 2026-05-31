'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create a high-density plane geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(25, 25, 60, 60);
    // Rotate it to lay flat like a floor/landscape
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;

    // Iterate through every vertex on the plane
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      // Apply mathematical waves to create rolling topography
      const waveX1 = 0.5 * Math.sin(x * 0.5 + time * 0.7);
      const waveZ1 = 0.5 * Math.sin(z * 0.5 + time * 0.5);
      const waveX2 = 0.2 * Math.sin(x * 1.5 - time * 1.2);
      const waveZ2 = 0.2 * Math.sin(z * 1.5 + time * 0.8);

      // Modify the Y-axis (height) of the vertex
      positions.setY(i, waveX1 + waveZ1 + waveX2 + waveZ2);
    }

    // Flag buffer for WebGL update
    positions.needsUpdate = true;
    
    // Very slowly rotate the entire landscape for a cinematic feel
    meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={2.0} />
      </EffectComposer>

      {/* Position it slightly lower so the text floats above it */}
      <group position={[0, -3, 0]}>
        <mesh ref={meshRef} geometry={geometry}>
          <meshBasicMaterial 
            color="#C8A96E" // Clinical Gold
            wireframe={true} 
            transparent={true}
            opacity={0.15}
          />
        </mesh>
      </group>
    </>
  );
}
