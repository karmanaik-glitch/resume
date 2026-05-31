//
'use client';

import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// --- CHILD COMPONENT: Handles the math for a single letter ---
const AnimatedLetter = ({ 
  char, 
  progress, 
  randomData 
}: { 
  char: string; 
  progress: MotionValue<number>; 
  randomData: { x: number; y: number; rotate: number; z: number; blur: number } 
}) => {
  // As 'progress' goes from 0 (top of scroll) to 1 (fully scrolled in),
  // we transition from the random chaotic state to the perfect 0 state.
  const x = useTransform(progress, [0, 1], [randomData.x, 0]);
  const y = useTransform(progress, [0, 1], [randomData.y, 0]);
  const z = useTransform(progress, [0, 1], [randomData.z, 0]);
  const rotate = useTransform(progress, [0, 1], [randomData.rotate, 0]);
  
  // Opacity fades in over the first 50% of the scroll
  const opacity = useTransform(progress, [0, 0.5, 1], [0, 1, 1]);
  // Blur sharpens as it locks into place
  const filter = useTransform(progress, [0, 1], [`blur(${randomData.blur}px)`, 'blur(0px)']);

  return (
    <motion.span
      style={{
        x,
        y,
        z,
        rotate,
        opacity,
        filter,
        display: 'inline-block',
        whiteSpace: char === ' ' ? 'pre' : 'normal',
      }}
      className="will-change-transform"
    >
      {char}
    </motion.span>
  );
};

// --- MAIN COMPONENT: The Slide Container ---
export default function MatrixSlide() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Capture the scroll progress specifically for this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"] // Starts assembling when it enters the screen, finishes when centered
  });

  const heading1 = "CLINICAL DATA";
  const heading2 = "MANAGEMENT & ENGINEERING";

  // Generate permanent random starting positions for the letters
  // We use useMemo so they don't jump around if the component re-renders
  const generateRandoms = (text: string) => {
    return text.split('').map(() => ({
      x: (Math.random() - 0.5) * 1500,       // Scatter widely left/right
      y: (Math.random() - 0.5) * 1000,       // Scatter up/down
      z: (Math.random() - 0.5) * 1000,       // Scatter deep into the screen
      rotate: (Math.random() - 0.5) * 720,   // Spin wildly
      blur: Math.random() * 20 + 5,          // Start very blurry
    }));
  };

  const randoms1 = useMemo(() => generateRandoms(heading1), []);
  const randoms2 = useMemo(() => generateRandoms(heading2), []);

  return (
    // We make the container highly tall (200vh) so the user has to scroll *through* it to trigger the animation
    <div ref={containerRef} className="h-[200vh] relative bg-[#0a0a0a]">
      
      {/* The sticky wrapper locks the text in the center of the screen while they scroll */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden perspective-[1000px]">
        
        {/* Top Heading */}
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-[#00D4FF] mb-4">
          {heading1.split('').map((char, index) => (
            <AnimatedLetter 
              key={`h1-${index}`} 
              char={char} 
              progress={scrollYProgress} 
              randomData={randoms1[index]} 
            />
          ))}
        </h1>

        {/* Bottom Heading */}
        <h2 className="text-3xl md:text-5xl font-light tracking-widest text-[#C8A96E]">
          {heading2.split('').map((char, index) => (
            <AnimatedLetter 
              key={`h2-${index}`} 
              char={char} 
              progress={scrollYProgress} 
              randomData={randoms2[index]} 
            />
          ))}
        </h2>

        {/* Subtle subtext that fades in normally at the end */}
        <motion.p 
          style={{ opacity: scrollYProgress }}
          className="mt-12 text-gray-400 max-w-lg text-center text-lg"
        >
          Transforming chaotic trial datasets into structured, actionable intelligence.
        </motion.p>
        
      </div>
    </div>
  );
}
