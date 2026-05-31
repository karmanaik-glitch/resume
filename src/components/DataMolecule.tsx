//
'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate the math for a DNA Double Helix
  const { nodes, edges, backbone1, backbone2 } = useMemo(() => {
    const generatedNodes: { position: [number, number, number]; color: string; size: number }[] = [];
    const generatedEdges: [readonly [number, number, number], readonly [number, number, number]][] = [];
    
    // Arrays to hold the continuous backbone lines
    const bb1: [number, number, number][] = [];
    const bb2: [number, number, number][] = [];
    
    const count = 25; // Number of base pairs (rungs)

    for (let i = 0; i < count; i++) {
      // Calculate vertical position (y) and rotation (t)
      const t = (i / count) * Math.PI * 6 - (Math.PI * 3); // Spans 3 full twists
      const y = t * 0.6; 
      const radius = 2;

      // Strand 1 (Clinical Cyan)
      const x1 = Math.cos(t) * radius;
      const z1 = Math.sin(t) * radius;
      const pos1: [number, number, number] = [x1, y, z1];
      
      // Strand 2 (Clinical Gold - offset by 180 degrees)
      const x2 = Math.cos(t + Math.PI) * radius;
      const z2 = Math.sin(t + Math.PI) * radius;
      const pos2: [number, number, number] = [x2, y, z2];

      // Add nodes
      generatedNodes.push({ position: pos1, color: '#00D4FF', size: 0.12 });
      generatedNodes.push({ position: pos2, color: '#C8A96E', size: 0.12 });

      // Add connecting rung
      generatedEdges.push([pos1, pos2]);

      // Add points to backbone paths
      bb1.push(pos1);
      bb2.push(pos2);
    }

    return { nodes: generatedNodes, edges: generatedEdges, backbone1: bb1, backbone2: bb2 };
  }, []);

  // Slowly twist the DNA continuously
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.2; // Smooth rotation
      // Gentle floating up and down
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      
      {/* Crisp lighting for the data nodes */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />

      <group ref={groupRef} rotation={[0.2, 0, 0.2]}>
        
        {/* Render the DNA Backbone Strands */}
        <Line points={backbone1} color="#00D4FF" lineWidth={1.5} transparent opacity={0.4} />
        <Line points={backbone2} color="#C8A96E" lineWidth={1.5} transparent opacity={0.4} />

        {/* Render the Base Pairs (Connecting Rungs) */}
        {edges.map((edge, i) => (
          <Line 
            key={`rung-${i}`} 
            points={edge as any} 
            color="#E8EEF7" 
            lineWidth={0.5} 
            transparent 
            opacity={0.15} 
          />
        ))}

        {/* Render the Data Points (Spheres) */}
        {nodes.map((node, i) => (
          <Sphere key={`node-${i}`} args={[node.size, 16, 16]} position={node.position}>
            <meshStandardMaterial 
              color={node.color} 
              emissive={node.color}
              emissiveIntensity={0.5}
            />
          </Sphere>
        ))}
      </group>
    </>
  );
}
