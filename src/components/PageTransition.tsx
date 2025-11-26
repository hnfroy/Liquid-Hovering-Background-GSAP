import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = { children: React.ReactNode };

export default function PageTransition({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.set(el, {
      autoAlpha: 0,
      scale: 1.35,            // lebih dekat ke layar
      y: 55,                  // lebih tinggi
      rotateX: 22,            // lebih nyosor
      transformPerspective: 1600, // kedalaman lebih besar
      filter: "blur(22px)",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // ENTER ANIMATION (lebih hidup)
    tl.to(el, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      duration: 1.1,
    });

    return () => {
      const leave = gsap.timeline();

      leave.to(el, {
        autoAlpha: 0,
        scale: 0.78,
        y: -35,
        rotateX: -18,
        filter: "blur(16px)",
        duration: 0.55,
        ease: "power2.inOut",
      });
    };
  }, [children]);

  return (
    <div
      ref={wrapperRef}
      className="page-wrapper w-full h-full"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
}
