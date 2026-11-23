"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

/**
 * Hilo de 1px que marca cuánto se leyó. Es uno de los cuatro usos que el
 * sistema le permite a la señal: indicar dónde estás.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.setProperty("--p", String(p));
      setShowBackToTop(window.scrollY >= window.innerHeight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const backToTop = () => {
    document.getElementById("top")?.focus({ preventScroll: true });
    if (lenis) {
      lenis.scrollTo(0, { duration: 0.8 });
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "instant" : "smooth" });
  };

  return (
    <>
      <div ref={ref} className="progress" aria-hidden="true" />
      <button
        type="button"
        className="back-to-top"
        aria-label="Volver arriba"
        title="Volver arriba"
        onClick={backToTop}
        tabIndex={showBackToTop ? undefined : -1}
        data-visible={showBackToTop || undefined}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5m-6 6 6-6 6 6" />
        </svg>
      </button>
    </>
  );
}
