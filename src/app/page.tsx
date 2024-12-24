'use client'

import {motion} from 'framer-motion'
import Link from 'next/link'



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


export default function HomePage() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            {/* Hero Section */}
            <section className="w-full flex items-center justify-center py-2">
                <motion.div
                    whileHover={{
                        rotateX: 360,
                        rotateY: 360,
                        scale: 1.1,
                        boxShadow: "-20px 20px 30px rgba(0, 0, 0, 0.21), 0 1px 2px rgba(0, 0, 0, 0.24), inset 0 0 20px rgba(0, 0, 0, 0.05)",
                    }}
                    // whileTap={{
                    //     rotateX: 175,
                    //     rotateY: 185,
                    //     scale: 1.1,
                    //     boxShadow: "-20px 20px 30px rgba(0, 0, 0, 0.21), 0 1px 2px rgba(0, 0, 0, 0.24), inset 0 0 20px rgba(0, 0, 0, 0.05)",
                    // }}
                    transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="max-w-md w-full mx-4 px-8 pt-12 text-center transition-all duration-300 paper-texture"
                    style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'visible'
                    }}
                >
                    <p className="mb-12 text-xl text-gray-800">
              <span className="inline-block terminal-text">
                luke bell
              </span>
                    </p>
                    <hr></hr>
                    <div
                        className="flex items-center justify-between mt-12 mb-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {sections.map((section) => (
                            <Link
                            key={section.name}
                            href={section.link}
                            target="_blank"
                            className="block group mb-1 px-1 py-1 text-gray-700 font-light hover:bg-gray-100 transition-colors relative overflow-hidden"
                        >
                                {section.name}
                        </Link>
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
