// import Image from 'next/image';
// import React from 'react';

// const Hero = () => {
//   return (
//     <section className="w-screen lg:h-screen flex flex-col relative overflow-hidden">
//       {/* Top bar */}
//       <div className="flex w-full justify-between items-center p-4">
//         <Image src="/logo.jpg" width={70} height={70} alt="logo" />
//         <button className="px-5 py-2 bg-white rounded-full text-black text-sx">
//           Try Free
//         </button>
//       </div>

//       {/* Center Content */}
//       <div className="flex flex-col items-center w-full relative">
//         {/* Light Glow Behind Heading */}
//         <div className="absolute top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 rounded-full blur-[150px] opacity-50 z-0" />

//         {/* Heading */}
//         <h1 className="relative z-10 text-[20vw] sm:text-[15vw] font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 bg-clip-text text-transparent">
//           FOODIE
//         </h1>

//         {/* Subheading */}
//         <p className="relative z-10 text-2xl text-zinc-300 w-[90%] sm:w-2/3 md:w-1/3 text-center">
//           Because great food deserves more than just a star rating.
//         </p>
//       </div>
//     </section>
//   );
// };

// export default Hero;
"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Hero = () => {
  const glowRef = useRef(null);
  const baseHeadingRef = useRef(null);     // black text layer
  const letterRefs = useRef([]);           // gradient overlay letters
  const paraRef = useRef(null);

  const headingText = "FOODIE";

  useEffect(() => {
    // reset refs in strict mode re-renders
    letterRefs.current = letterRefs.current.slice(0, headingText.length);

    // INITIAL STATES
    gsap.set(glowRef.current, { opacity: 0, scale: 0.85 });
    gsap.set(paraRef.current, { opacity: 0, y: 24 });

    // prepare each letter for gradient clipping
    gsap.set(letterRefs.current, {
      // gradient setup
      backgroundImage: "linear-gradient(90deg,#FACC15,#FB923C,#EA580C)",
      backgroundSize: "300% 100%",
      backgroundPositionX: "-200%", // start far left (hidden)
      backgroundPositionY: "0%",
      // necessary for cross-browser text gradient
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      willChange: "background-position",
      opacity: 1,
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1) Light turns on (glow)
    tl.to(glowRef.current, { opacity: 0.55, scale: 1, duration: 1.1 });

    // 2) Reveal gradient letter-by-letter (left -> right)
    tl.to(
      letterRefs.current,
      {
        backgroundPositionX: "0%",
        duration: 0.6,
        stagger: 0.12,
      },
      "-=0.4"
    );

    // 3) Fade out the black base once gradient is fully visible
    tl.to(baseHeadingRef.current, { opacity: 0, duration: 0.3 }, "-=0.2");

    // 4) Paragraph fade + slide up
    tl.to(paraRef.current, { opacity: 1, y: 0, duration: 0.8 }, "-=0.1");
  }, []);

  return (
    <section className="w-screen h-screen flex flex-col relative overflow-hidden">
      {/* Top bar */}
      <div className="flex w-full justify-between items-center p-4">
        <Image src="/logo.jpg" width={70} height={70} alt="logo" />
        <button className="px-5 py-2 bg-white rounded-full text-black text-sx">
          Try Free
        </button>
      </div>

      {/* Center Content */}
      <div className="flex flex-col mt-15 items-center w-full relative">
        {/* Glow behind heading */}
        <div
          ref={glowRef}
          className="absolute top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-600 rounded-full blur-[150px] opacity-50 z-0"
        />

        {/* Heading container (two layers perfectly overlapped) */}
        <div className="relative z-10 leading-none">
          {/* Base black heading */}
          <h1
            ref={baseHeadingRef}
            className="text-[20vw] sm:text-[15vw] font-bold text-black select-none"
          >
            {headingText}
          </h1>

          {/* Gradient overlay heading (per-letter) */}
          <h1
            aria-hidden
            className="pointer-events-none absolute inset-0 flex font-bold text-[20vw] sm:text-[15vw] leading-none"
          >
            {headingText.split("").map((char, i) => (
              <span
                key={i}
                ref={(el) => (letterRefs.current[i] = el)}
                className="inline-block [-webkit-text-fill-color:transparent] bg-clip-text"
                style={{ lineHeight: 1 }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>

        {/* Subheading */}
        <p
          ref={paraRef}
          className="relative z-10 text-2xl text-zinc-300 w-[90%] sm:w-2/3 md:w-1/3 text-center mt-2"
        >
          Because great food deserves more than just a star rating.
        </p>
      </div>
    </section>
  );
};

export default Hero;
