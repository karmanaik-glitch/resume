'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function DataMolecule() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate the math for the molecule structure
  const { nodes, edges } = useMemo(() => {
    const generatedNodes: { position: [number, number, number]; color: string; size: number }[] = [];
    const generatedEdges: [readonly [number, number, number], readonly [number, number, number]][] = [];
    const count = 45;

    // 1. Create nodes in a scattered spherical pattern
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      // Radius of the molecule
      const r = 2.5 + (Math.random() * 0.5 - 0.25); 
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // Distribute brand colors
      let color = 'rgba(232, 238, 247, 0.4)'; // Ice Dim
      if (i % 4 === 0) color = '#00D4FF';      // Clinical Cyan
      if (i % 7 === 0) color = '#C8A96E';      // Clinical Gold

      generatedNodes.push({ position: [x, y, z], color, size: Math.random() * 0.08 + 0.04 });
    }

    // 2. Connect nodes that are close to each other
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

  // Slowly rotate the entire molecule
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <>
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
      
      {/* High-end glow effect */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
      </EffectComposer>

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      <group ref={groupRef}>
        {/* Render the connections (lines) */}
        {edges.map((edge, i) => (
          <Line 
            key={`edge-${i}`} 
            points={edge as any} 
            color="#00D4FF" 
            lineWidth={1} 
            transparent 
            opacity={0.15} 
          />
        ))}

        {/* Render the data points (spheres) */}
        {nodes.map((node, i) => (
          <Sphere key={`node-${i}`} args={[node.size, 16, 16]} position={node.position}>
            <meshStandardMaterial 
              color={node.color} 
              emissive={node.color}
              emissiveIntensity={node.color !== 'rgba(232, 238, 247, 0.4)' ? 2 : 0}
              transparent
              opacity={0.9}
            />
          </Sphere>
        ))}
      </group>
    </>
  );
}
