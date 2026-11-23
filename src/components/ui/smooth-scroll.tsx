"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import "lenis/dist/lenis.css";
import styles from "./smooth-scroll.module.css";

const lenisOptions = { autoRaf: true, stopInertiaOnNavigate: true };

type ScrollPanelProps = { id?: string; children: ReactNode; overlap?: boolean; tabIndex?: number };

export function ScrollPanel({ id, children, overlap = true, tabIndex }: ScrollPanelProps) {
  return <div id={id} tabIndex={tabIndex} data-panel-overlap={overlap || undefined} className={styles.panel}>{children}</div>;
}

export default function SmoothScroll({ children, ...props }: ComponentPropsWithoutRef<"main">) {
  const main = useRef<HTMLElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setMotionEnabled(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionEnabled || !main.current || typeof ResizeObserver === "undefined") return;

    // A tall section sticks only after its bottom reaches the viewport.
    const panels = main.current.querySelectorAll<HTMLElement>("[data-panel-overlap]:not(:last-child) > *");
    const measure = (panel: HTMLElement) => {
      panel.style.setProperty("--scroll-panel-height", `${panel.getBoundingClientRect().height}px`);
    };
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) measure(entry.target as HTMLElement);
    });

    panels.forEach((panel) => {
      measure(panel);
      observer.observe(panel, { box: "border-box" });
    });
    return () => observer.disconnect();
  }, [motionEnabled]);

  return (
    <>
      {motionEnabled && <ReactLenis root options={lenisOptions} />}
      <main {...props} ref={main} data-smooth-scroll data-scroll-motion={motionEnabled ? "on" : undefined}>
        {children}
      </main>
    </>
  );
}
