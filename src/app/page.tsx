'use client'

import { motion, useSpring, useMotionTemplate, PanInfo, Transition } from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Link from 'next/link';

const sections = [
    {
        name: "github",
        link: "https://github.com/KingsleyBell"
    },
    {
        name: "resume",
        link: "/Resume.pdf"
    },
    {
        name: "contact",
        link: "mailto:lukekingsleybell@gmail.com"
    },
];

const stiffness = 10;
const damping = 5;
const mass = 0.05;

const HoverCard = () => {
  const mouseX = useSpring(0, {
    stiffness: stiffness,
    damping: damping,
    mass: mass
  });
  const mouseY = useSpring(0, {
    stiffness: stiffness,
    damping: damping,
    mass: mass
  });
  const rotateX = useSpring(0, {
    stiffness: stiffness,
    damping: damping,
    mass: mass
  });
  const rotateY = useSpring(0, {
    stiffness: stiffness,
    damping: damping,
    mass: mass
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const [shadow, setShadow] = useState('33px 58px 30px rgba(0, 0, 0, 0.2)');
  const angle = 7.5;
  const lastPanTime = useRef(0);

  const handleMove = (x: number, y: number) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const relativeX = Math.round((x - cardCenterX) * 1.7);
      const relativeY = Math.round((y - cardCenterY) * 1.7);
      
      mouseX.set(relativeX);
      mouseY.set((relativeY - 150));
    }
  };

const handlePan = (e: Event, info: PanInfo) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) return;

    // Throttle to run at most every 16ms (roughly 60fps)
    const now = Date.now();
    if (now - lastPanTime.current < 16) return;
    lastPanTime.current = now;

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const sensitivity = 2;
      
      handleMove(
        rect.left + rect.width/2 + info.offset.x * sensitivity,
        rect.top + rect.height/2 + info.offset.y * sensitivity
      );
    }
  };

  const handlePanEnd = () => {
    lastPanTime.current = 0;
  };

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const degX = (width/angle)*0.1;
      const degY = (height/angle)*0.1;

      const unsubscribeX = mouseX.on("change", latest => {
        const ry = (latest / degX);
        rotateY.set(ry);

        // Update shadow X component
        const shadowOffset = 90;
        let shadowX = Math.abs(Math.sin(ry * (Math.PI / 180)) * shadowOffset);
        shadowX = ry > 0 ? shadowX : -shadowX;
        
        // Get current Y shadow from rotateX
        const rx = rotateX.get();
        let shadowY = Math.abs(Math.sin(rx * (Math.PI / 180)) * shadowOffset);
        shadowY = rx > 0 ? shadowY : -shadowY;

        setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`);
      });

      const unsubscribeY = mouseY.on("change", latest => {
        const rx = -(latest / degY);
        rotateX.set(rx);

        // Update shadow Y component
        const shadowOffset = 90;
        let shadowY = Math.abs(Math.sin(rx * (Math.PI / 180)) * shadowOffset);
        shadowY = rx > 0 ? shadowY : -shadowY;

        // Get current X shadow from rotateY
        const ry = rotateY.get();
        let shadowX = Math.abs(Math.sin(ry * (Math.PI / 180)) * shadowOffset);
        shadowX = ry > 0 ? shadowX : -shadowX;

        setShadow(`${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`);
      });

      return () => {
        unsubscribeX();
        unsubscribeY();
      };
    }
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <motion.main 
      className="min-h-screen flex items-center justify-center"
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >
      <section className="w-full flex items-center justify-center py-2">
        <div ref={cardRef} className="relative">
          <motion.div
            layout={true}
            transition={trans}
            initial={{
              transform: "perspective(1000px) rotateX(40deg) rotateY(32deg)"
            }}
            style={{
              transform: useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              boxShadow: shadow
            }}
            className="max-w-xs w-full mx-4 px-8 pt-8 text-center paper-texture touch-none select-none"
          >
            <div className="relative mb-8 text-xl z-10">
              <span className="inline-block terminal-text select-none">
                luke bell
              </span>
            </div>
            <hr></hr>
            <div className="flex items-center justify-between mt-12 mb-2 relative z-10">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.link}
                  target="_blank"
                  className="block group mb-1 px-4 py-2 font-light transition-colors relative overflow-hidden select-none terminal-text"
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.main>
  )
}

const trans: Transition = {
  duration: 0.8
}

export default HoverCard
