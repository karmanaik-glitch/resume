'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --------------------------------------------------------
// 1. VERTEX SHADER (Passes coordinates to the fragment shader)
// --------------------------------------------------------
const vertexShader = `
  varying vec3 vPos;
  
  void main() {
    vPos = position;
    // We create a gentle topographical "wave" so the grid isn't perfectly flat
    float wave = sin(position.x * 0.5) * cos(position.y * 0.5) * 0.5;
    vec3 newPos = vec3(position.x, position.y, position.z + wave);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
`;

// --------------------------------------------------------
// 2. FRAGMENT SHADER (Draws the grid, the scanner, and the fog)
// --------------------------------------------------------
const fragmentShader = `
  varying vec3 vPos;
  uniform float uTime;
  uniform float uScroll;
  
  void main() {
    // 1. Move the grid based on time and scroll depth
    vec2 uv = vPos.xy * 1.5; 
    uv.y -= uTime * 0.5;      // Constant slow forward movement
    uv.y -= uScroll * 15.0;   // Moves faster when user scrolls
    
    // 2. Mathematical Grid Generation (Thick main grid)
    vec2 grid = abs(fract(uv - 0.5) - 0.5);
    vec2 lines = smoothstep(0.03, 0.0, grid);
    float gridAlpha = max(lines.x, lines.y);
    
    // 3. Sub-grid Generation (Fainter, smaller squares inside the main grid)
    vec2 subUv = uv * 4.0;
    vec2 subGrid = abs(fract(subUv - 0.5) - 0.5);
    vec2 subLines = smoothstep(0.03, 0.0, subGrid);
    float subGridAlpha = max(subLines.x, subLines.y) * 0.15; // Much fainter
    
    float totalGrid = max(gridAlpha, subGridAlpha);
    
    // 4. The "Scanner Sweep" Effect (A horizontal line moving across the data)
    float scanner = sin(vPos.y * 0.5 + uTime * 1.5);
    float scannerLine = smoothstep(0.98, 1.0, scanner);
    float scannerGlow = smoothstep(0.7, 1.0, scanner) * 0.3;
    
    // 5. Colors (Clinical Cyan)
    vec3 baseColor = vec3(0.0, 0.83, 1.0); 
    
    // 6. Depth Fog (Fades the grid into the background so it looks infinite)
    float distanceToCenter = length(vPos.xy);
    float depthFade = smoothstep(20.0, 5.0, distanceToCenter);
    
    // Combine everything
    vec3 finalColor = baseColor * totalGrid * 0.5 + baseColor * (scannerLine + scannerGlow);
    float finalAlpha = (totalGrid * 0.4 + scannerLine + scannerGlow) * depthFade;
    
    // Discard completely empty pixels to ensure perfect transparency with the CSS background
    if (finalAlpha < 0.02) discard;
    
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// --------------------------------------------------------
// 3. REACT COMPONENT
// --------------------------------------------------------
export default function DataMolecule() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const currentScroll = useRef(0);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 }
  }), []);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    // Update time
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth Scroll Capture
    const scrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    const scrollPercent = scrollY / maxScroll;
    
    currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, scrollPercent, delta * 5);

    // Send smooth scroll to shader
    materialRef.current.uniforms.uScroll.value = currentScroll.current;
  });

  return (
    <>
      <EffectComposer>
        {/* Subtle bloom gives the grid lines a high-end LED screen feel */}
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.0} />
      </EffectComposer>

      {/* We use a massive plane geometry (40x40).
        By rotating it on the X-axis, it lays flat like a floor beneath your content.
      */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
        <planeGeometry args={[40, 40, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}
