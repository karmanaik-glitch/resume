'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, MeshTransmissionMaterial, Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

export default function DataMolecule() {
  const lensRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!lensRef.current || !groupRef.current) return;

    // 1. KINETIC MOUSE OPTICS: The glass lens smoothly follows your cursor
    // We map the mouse coordinates to the viewport width/height
    const targetX = (state.pointer.x * viewport.width) / 4;
    const targetY = (state.pointer.y * viewport.height) / 4;

    lensRef.current.position.x = THREE.MathUtils.lerp(lensRef.current.position.x, targetX, delta * 4);
    lensRef.current.position.y = THREE.MathUtils.lerp(lensRef.current.position.y, targetY, delta * 4);

    // Slowly rotate the lens to catch reflections
    lensRef.current.rotation.x += delta * 0.15;
    lensRef.current.rotation.y += delta * 0.2;

    // 2. SCROLL PARALLAX: The entire scene shifts dynamically as the user scrolls
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = scrollY / maxScroll;

    // Move the typography and lens based on scroll depth
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollPercent * 10, delta * 3);
  });

  return (
    <>
      {/* Invisible studio lighting to create reflections on the glass */}
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />

      <group ref={groupRef}>
        
        {/* BACKGROUND TYPOGRAPHY */}
        {/* Placed far back in the Z-axis (-6) so the lens can float in front of it */}
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <Text
            position={[0, 1.5, -6]}
            fontSize={3.5}
            color="#00D4FF" // Clinical Cyan
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            fontWeight="bold"
            letterSpacing={-0.05}
          >
            CLINICAL
          </Text>
          <Text
            position={[0, -2, -6]}
            fontSize={3.5}
            color="#C8A96E" // Clinical Gold
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
            fontWeight="bold"
            letterSpacing={-0.05}
          >
            DATA
          </Text>
        </Float>

        {/* THE SPATIAL GLASS LENS */}
        {/* Positioned in front (Z=2) to bend the light of the text behind it */}
        <mesh ref={lensRef} position={[0, 0, 2]} scale={2.5}>
          <icosahedronGeometry args={[1, 16]} />
          
          <MeshTransmissionMaterial
            backside={true}         
            samples={4}             
            thickness={2.5}         
            chromaticAberration={0.1} // Rainbow edge dispersion
            anisotropy={0.3}        
            distortion={0.3}        // Ripples the surface slightly
            distortionScale={0.5}
            temporalDistortion={0.1} 
            ior={1.4}               // Bends light heavily
            color="#ffffff"
            roughness={0.05}        // Highly polished feel
          />
        </mesh>

      </group>
    </>
  );
}
}
