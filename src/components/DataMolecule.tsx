'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = 150;
  const maxDistance = 2.5;

  // Initialize positions and velocities
  const { particlesData, positions } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const particlesData = [];
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        numConnections: 0,
      });
    }
    return { particlesData, positions };
  }, []);

  // Initialize line geometry buffer
  const linePositions = useMemo(() => new Float32Array(particleCount * particleCount * 3), []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    let vertexpos = 0;
    let numConnected = 0;

    const pointPositions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Reset connections
    for (let i = 0; i < particleCount; i++) particlesData[i].numConnections = 0;

    for (let i = 0; i < particleCount; i++) {
      // Update positions based on velocity
      pointPositions[i * 3] += particlesData[i].velocity.x;
      pointPositions[i * 3 + 1] += particlesData[i].velocity.y;
      pointPositions[i * 3 + 2] += particlesData[i].velocity.z;

      // Bounce off invisible boundaries
      if (Math.abs(pointPositions[i * 3]) > 5) particlesData[i].velocity.x *= -1;
      if (Math.abs(pointPositions[i * 3 + 1]) > 5) particlesData[i].velocity.y *= -1;
      if (Math.abs(pointPositions[i * 3 + 2]) > 5) particlesData[i].velocity.z *= -1;

      // Check distance against other particles to draw lines
      for (let j = i + 1; j < particleCount; j++) {
        const dx = pointPositions[i * 3] - pointPositions[j * 3];
        const dy = pointPositions[i * 3 + 1] - pointPositions[j * 3 + 1];
        const dz = pointPositions[i * 3 + 2] - pointPositions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          particlesData[i].numConnections++;
          particlesData[j].numConnections++;

          linePositions[vertexpos++] = pointPositions[i * 3];
          linePositions[vertexpos++] = pointPositions[i * 3 + 1];
          linePositions[vertexpos++] = pointPositions[i * 3 + 2];

          linePositions[vertexpos++] = pointPositions[j * 3];
          linePositions[vertexpos++] = pointPositions[j * 3 + 1];
          linePositions[vertexpos++] = pointPositions[j * 3 + 2];
          numConnected++;
        }
      }
    }

    // Flag buffers for WebGL update
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slowly rotate the entire network
    pointsRef.current.rotation.y += 0.002;
    linesRef.current.rotation.y += 0.002;
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
      </EffectComposer>

      <group>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.08} color="#00D4FF" transparent opacity={0.8} />
        </points>

        <lineSegments ref={linesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#00D4FF" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </lineSegments>
      </group>
    </>
  );
}
