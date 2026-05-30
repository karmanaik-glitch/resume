'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  const { nodes, lines } = useMemo(() => {
    const tempNodes = [];
    const tempLines = [];
    const NODE_COUNT = 20;
    const RADIUS = 2.5;

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
      const x = RADIUS * Math.sin(phi) * Math.cos(theta);
      const y = RADIUS * Math.sin(phi) * Math.sin(theta);
      const z = RADIUS * Math.cos(phi);

      let color = '#E8EEF7'; 
      let isPrimary = false;
      if (i % 4 === 0) { color = '#00D4FF'; isPrimary = true; } 
      else if (i % 7 === 0) { color = '#C8A96E'; isPrimary = true; } 

      tempNodes.push({ position: new THREE.Vector3(x, y, z), color, isPrimary });
    }

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const distance = tempNodes[i].position.distanceTo(tempNodes[j].position);
        if (distance < 2.8) {
          tempLines.push({
            start: tempNodes[i].position,
            end: tempNodes[j].position,
            opacity: tempNodes[i].isPrimary || tempNodes[j].isPrimary ? 0.3 : 0.05
          });
        }
      }
    }
    return { nodes: tempNodes, lines: tempLines };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <>
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      </EffectComposer>
      <group ref={groupRef} position={[0, 0, 0]}>
        {lines.map((line, i) => (
          <Line key={`line-${i}`} points={[line.start, line.end]} color="#00D4FF" lineWidth={1} transparent opacity={line.opacity} />
        ))}
        {nodes.map((node, i) => (
          <mesh key={`node-${i}`} position={node.position}>
            <sphereGeometry args={[node.isPrimary ? 0.08 : 0.04, 16, 16]} />
            <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={node.isPrimary ? 2 : 0.5} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </>
  );
}