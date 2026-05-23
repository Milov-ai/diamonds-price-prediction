import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(badgeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <header className="relative py-20 text-center sm:py-28">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-100 via-cyan-50 to-transparent opacity-60 blur-3xl" />
      </div>

      <div className="relative z-10">
        <h1 ref={titleRef} className="mb-4 text-5xl font-extrabold tracking-tight text-text-primary sm:text-6xl lg:text-7xl" style={{ opacity: 0 }}>
          Diamond Price{" "}
          <span className="bg-gradient-to-r from-accent via-accent-light to-accent-secondary bg-clip-text text-transparent">
            Predictor
          </span>
        </h1>
        <p ref={subtitleRef} className="mx-auto max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg" style={{ opacity: 0 }}>
          Predicción inteligente de precios con Machine Learning
          <br />
          <span className="text-text-muted">Metodología CRISP-DM · Regresión Supervisada</span>
        </p>
        <div ref={badgeRef} className="mt-8 inline-flex items-center gap-3 rounded-full border border-border bg-bg-card px-5 py-2.5 text-sm shadow-sm" style={{ opacity: 0 }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="text-text-secondary">Random Forest</span>
          <span className="h-4 w-px bg-border" />
          <span className="font-bold text-accent">R² = 0.9835</span>
        </div>
      </div>
    </header>
  );
}
