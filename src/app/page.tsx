'use client'

import { motion, useSpring, useMotionTemplate, PanInfo, Transition } from "framer-motion";
import {useEffect, useRef, useState} from "react";
import Link from 'next/link';
import Clock from 'react-clock';
import { clearInterval } from "timers";
import 'react-clock/dist/Clock.css';

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

const images = [
  {src: "img/1.png", alt: "1"},
  {src: "img/2.png", alt: "2"},
  {src: "img/3.png", alt: "3"},
  {src: "img/4.png", alt: "4"},
  {src: "img/5.png", alt: "5"},
  {src: "img/6.png", alt: "6"},
  {src: "img/7.png", alt: "7"},
  {src: "img/8.png", alt: "8"},
  {src: "img/9.png", alt: "9"},
  {src: "img/10.png", alt: "10"},
  {src: "img/11.png", alt: "11"},
  {src: "img/12.png", alt: "12"},
  {src: "img/13.png", alt: "13"},
  {src: "img/14.png", alt: "14"},
  {src: "img/15.png", alt: "15"},
  {src: "img/16.png", alt: "16"},
  {src: "img/17.png", alt: "17"},
  {src: "img/18.png", alt: "18"},
  {src: "img/19.png", alt: "19"},
  {src: "img/20.png", alt: "20"},
  {src: "img/21.png", alt: "21"},
  {src: "img/22.png", alt: "22"},
  {src: "img/23.png", alt: "23"},
  {src: "img/24.png", alt: "24"},
]

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
  const [time, setTime] = useState(new Date());
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

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <motion.main 
      className="min-h-screen flex flex-col items-center justify-center"
      onPan={handlePan}
      onPanEnd={handlePanEnd}
    >      
      <img src="rotate.png" alt="Top Left" className="top-left" />
      <Clock value={time} size="120px" locale="hu-HU" minuteMarksLength="0" hourMarksLength="15" hourMarksWidth="4" hourHandWidth="5" minuteHandWidth="3" secondHandLength="80" className="bottom-left" />
      <img src="down.png" alt="Bottom Right" className="bottom-right" />

      <section className="w-full min-h-screen flex items-center justify-center py-2">
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
      <section className="w-full min-h-screen flex items-center justify-center py-2">
      <div className="grid-container">
        {images.map((image) => (
          <img key={image.alt} src={image.src} alt={image.alt} loading="lazy"/>
        ))}        
      </div>
      </section>

    </motion.main>
  )
}

const trans: Transition = {
  duration: 0.8
}

export default HoverCard
