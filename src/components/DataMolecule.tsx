'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate the math for the molecule structure
  const { nodes, edges } = useMemo(() => {
    const generatedNodes: { position: [number, number, number]; color: string; size: number }[] = [];
    const generatedEdges: [readonly [number, number, number], readonly [number, number, number]][] = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const r = 2.5 + (Math.random() * 0.5 - 0.25); 
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // Distribute subtle, muted brand colors
      let color = '#2A3045'; // Muted dark blue/grey for the majority
      if (i % 4 === 0) color = '#008B99'; // Deep, muted Cyan
      if (i % 7 === 0) color = '#8C7040'; // Deep, muted Gold

      generatedNodes.push({ position: [x, y, z], color, size: Math.random() * 0.06 + 0.03 });
    }

    // Connect nearby nodes
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const a = generatedNodes[i].position;
        const b = generatedNodes[j].position;
        const distance = Math.sqrt(
          Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2) + Math.pow(a[2] - b[2], 2)
        );
        
        if (distance < 1.8) {
          generatedEdges.push([a, b]);
        }
      }
    }

    return { nodes: generatedNodes, edges: generatedEdges };
  }, []);

  // Slowly, elegantly rotate the structure
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      
      {/* Soft, premium lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#E8EEF7" />

      <group ref={groupRef}>
        {/* Subtle, barely-there connecting lines */}
        {edges.map((edge, i) => (
          <Line 
            key={`edge-${i}`} 
            points={edge as any} 
            color="#E8EEF7" 
            lineWidth={0.5} 
            transparent 
            opacity={0.05} 
          />
        ))}

        {/* Matte, solid data points */}
        {nodes.map((node, i) => (
          <Sphere key={`node-${i}`} args={[node.size, 32, 32]} position={node.position}>
            <meshStandardMaterial 
              color={node.color} 
              roughness={0.7} // Makes it look matte and sophisticated
              metalness={0.2}
            />
          </Sphere>
        ))}
      </group>
    </>
  );
}
