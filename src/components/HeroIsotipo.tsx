"use client";

import { useEffect, useRef, useState } from "react";
import type { ShaderMount } from "@paper-design/shaders";
import styles from "./hero-isotipo.module.css";

const speed = 0.65;

export default function HeroIsotipo() {
  const surface = useRef<HTMLDivElement>(null);
  const shader = useRef<ShaderMount | null>(null);
  const paused = useRef(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const element = surface.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let revision = 0;

    function dispose() {
      revision++;
      shader.current?.dispose();
      shader.current = null;
    }

    async function syncMotion() {
      dispose();
      setIsAnimated(false);
      if (motion.matches) return;
      const request = revision;

      try {
        const { ShaderMount, liquidMetalFragmentShader } = await import("@paper-design/shaders");
        if (request !== revision) return;

        shader.current = new ShaderMount(
          element!,
          liquidMetalFragmentShader,
          {
            u_colorBack: [0, 0, 0, 0],
            u_colorTint: [1, 1, 1, 0],
            u_repetition: 2.6,
            u_softness: 0.62,
            u_shiftRed: 0,
            u_shiftBlue: 0,
            u_distortion: 0.11,
            u_contour: 0,
            u_angle: 32,
            u_scale: 1.2,
            u_shape: 0,
            u_isImage: false,
          },
          { alpha: true, antialias: false },
          paused.current ? 0 : speed,
          520,
          1,
          180_000,
        );
        setIsAnimated(true);
      } catch {
        // Keep the original mark visible if WebGL is unavailable.
        dispose();
      }
    }

    void syncMotion();
    motion.addEventListener("change", syncMotion);
    return () => {
      motion.removeEventListener("change", syncMotion);
      dispose();
    };
  }, []);

  function toggleAnimation() {
    paused.current = !paused.current;
    shader.current?.setSpeed(paused.current ? 0 : speed);
    setIsPaused(paused.current);
  }

  const controlLabel = isPaused ? "Reanudar animación del isotipo" : "Pausar animación del isotipo";

  return (
    <div className={styles.stage}>
      <div className={styles.mark} aria-hidden="true">
        <div className={styles.metal} ref={surface} />
      </div>
      {isAnimated && (
        <button type="button" className={styles.motionControl} onClick={toggleAnimation} aria-label={controlLabel} title={controlLabel}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            {isPaused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3v14H7zM14 5h3v14h-3z" />}
          </svg>
        </button>
      )}
    </div>
  );
}
