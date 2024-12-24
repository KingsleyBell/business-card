'use client'

import { motion, useMotionValue, Transition, PanInfo } from "framer-motion";
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

const HoverCard = ({ i }: { i: number }) => {
  const [mouseX, setMouseX] = useState(-68);
  const [mouseY, setMouseY] = useState(-27);
  const cardRef = useRef<HTMLDivElement>(null)
  const transform = useMotionValue('rotateX(0deg)');
  const angle = 15;

  const [shadow, setShadow] = useState('0px 0px 0px rgba(0, 0, 0, 0)');

  const handleMove = (x: number, y: number) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const relativeX = Math.round(x - cardCenterX);
      const relativeY = Math.round(y - cardCenterY);
      setMouseX(relativeX -68);
      setMouseY(relativeY -27);
    }
  };

  const handlePan = (e: any, info: PanInfo) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) return;
    
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      handleMove(
        rect.left + rect.width/2 + info.offset.x * 2,
        rect.top + rect.height/2 + info.offset.y * 2
      );
    }
  };

  const handlePanEnd = () => {
    // setMouseX(-68);
    // setMouseY(-27);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) return;
    
    handleMove(e.clientX, e.clientY);
  };

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width
      const height = rect.height
      const degX = (width/angle)*0.1
      const degY = (height/angle)*0.1
      const rx = -(mouseY / degY)
      const ry = (mouseX / degX)
      
      // Calculate shadow based on rotation with top-left light source
      const shadowOffset = 90;      
      var shadowX = Math.abs(Math.sin(ry * (Math.PI / 180)) * shadowOffset);
      var shadowY = Math.abs(Math.sin(rx * (Math.PI / 180)) * shadowOffset);
      
      // Adjust shadow direction based on rotation direction
      shadowX = ry > 0 ? shadowX : -shadowX;
      shadowY = rx > 0 ? shadowY : -shadowY;

      const newShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`;
      setShadow(newShadow);

      var newTransform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      transform.set(newTransform);
    }
  }, [mouseX, mouseY]);

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
    <main className="min-h-screen flex items-center justify-center">
      <section className="w-full flex items-center justify-center py-2">
        <div ref={cardRef} className="relative">
          <motion.div
            onPan={handlePan}
            onPanEnd={handlePanEnd}
            layout={true}
            transition={trans}
            style={{
              transform,
              boxShadow: shadow
            }}
            className="max-w-md w-full mx-4 px-8 pt-12 text-center paper-texture touch-none select-none"
          >
            <p className="mb-12 text-xl text-gray-800">
              <span className="inline-block terminal-text select-none">
                luke bell
              </span>
            </p>
            <hr></hr>
            <div
              className="flex items-center justify-between mt-12 mb-2 relative z-10"
            >
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.link}
                  target="_blank"
                  className="block group mb-1 px-4 py-2 text-gray-700 font-light hover:bg-gray-200 transition-colors relative overflow-hidden select-none"
                >
                  {section.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

const trans: Transition = {
  duration: 0.8
}

export default HoverCard
