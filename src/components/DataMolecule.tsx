'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);
  const currentScroll = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. KINETIC MOUSE TRACKING: The entire text group tilts toward your cursor
    const targetRotationX = (state.pointer.y * Math.PI) / 8; // Tilt up/down
    const targetRotationY = (state.pointer.x * Math.PI) / 6; // Tilt left/right

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotationX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, delta * 3);

    // 2. SCROLL PARALLAX: The text moves upward as you scroll down
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = scrollY / maxScroll;

    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollPercent, delta * 5);
    groupRef.current.position.y = currentScroll.current * 8;
  });

  // We use a reliable CDN for the 3D font JSON so it works instantly without downloading files
  const fontUrl = "https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_bold.typeface.json";

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#00D4FF" />

      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Center>
            <group position={[0, 1, 0]}>
              {/* TOP WORD: CLINICAL */}
              <Text3D 
                font={fontUrl}
                size={1.2}
                height={0.4} // Extrusion depth (makes it 3D)
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-4, 0, 0]} // Offset to center it manually
              >
                CLINICAL
                <meshStandardMaterial 
                  color="#ffffff" 
                  metalness={0.8} 
                  roughness={0.2} 
                />
              </Text3D>

              {/* BOTTOM WORD: DATA */}
              <Text3D 
                font={fontUrl}
                size={1.2}
                height={0.4}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
                position={[-2.2, -1.8, 0]}
              >
                DATA
                <meshStandardMaterial 
                  color="#C8A96E" // Clinical Gold
                  metalness={0.8} 
                  roughness={0.2} 
                />
              </Text3D>
            </group>
          </Center>
        </Float>
      </group>

      {/* A subtle shadow caught beneath the floating text */}
      <ContactShadows 
        position={[0, -3.5, 0]} 
        opacity={0.4} 
        scale={20} 
        blur={2} 
        far={10} 
      />
    </>
  );
}
