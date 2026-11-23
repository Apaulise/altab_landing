"use client";

import { useEffect, useRef } from "react";
import HeroIsotipo from "./HeroIsotipo";

const SRC = "/video/showreel.mp4";
const POSTER = "/video/showreel-poster.jpg";
const PREVIEW_SECONDS = 4;

export default function HeroShowreel() {
  const inline = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const full = useRef<HTMLVideoElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const previewVisible = useRef(false);

  function playPreview() {
    const video = inline.current;
    if (!video || !previewVisible.current || video.currentTime >= PREVIEW_SECONDS || dialog.current?.open) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {});
  }

  useEffect(() => {
    const video = inline.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreview = () => {
      if (motion.matches) inline.current?.pause();
      else playPreview();
    };
    const observer = new IntersectionObserver(([entry]) => {
      previewVisible.current = entry.isIntersecting;
      if (previewVisible.current) syncPreview();
      else video.pause();
    }, { threshold: 0.5 });
    observer.observe(video);
    motion.addEventListener("change", syncPreview);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncPreview);
    };
  }, []);

  function openFull() {
    const modal = dialog.current;
    if (!modal || modal.open) return;
    inline.current?.pause();
    modal.showModal();

    const video = full.current;
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => {});
  }

  function closeFull() {
    full.current?.pause();
    trigger.current?.focus({ preventScroll: true });
    playPreview();
  }

  return (
    <div className="hero-showcase">
      <HeroIsotipo />
      <button
        ref={trigger}
        type="button"
        className="showreel"
        onClick={openFull}
        aria-label="Ver el showreel de ALTAB con sonido (15 segundos)"
        aria-haspopup="dialog"
        data-cta="showreel_open"
      >
        <span className="showreel-play">
          <span className="showreel-play-icon" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
          <span className="mono showreel-play-label">Ver showreel · 0:15</span>
        </span>
        <video
          ref={inline}
          className="showreel-video"
          src={SRC}
          poster={POSTER}
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          tabIndex={-1}
          onTimeUpdate={({ currentTarget }) => {
            if (currentTarget.currentTime >= PREVIEW_SECONDS) currentTarget.pause();
          }}
        />
      </button>

      <dialog
        ref={dialog}
        className="showreel-dialog"
        aria-label="Showreel de ALTAB"
        onClose={closeFull}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="showreel-dialog-inner">
          <button type="button" className="showreel-close mono" onClick={() => dialog.current?.close()} aria-label="Cerrar showreel" autoFocus>
            Cerrar ×
          </button>
          <video ref={full} src={SRC} poster={POSTER} controls playsInline preload="none" aria-label="Video de presentación de ALTAB" />
        </div>
      </dialog>
    </div>
  );
}
