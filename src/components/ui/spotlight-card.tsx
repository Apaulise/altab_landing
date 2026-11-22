"use client";

import type { ComponentPropsWithoutRef, CSSProperties, PointerEvent } from "react";
import styles from "./spotlight-card.module.css";

type GlowCardProps = Omit<ComponentPropsWithoutRef<"div">, "onPointerMove" | "onPointerLeave" | "onPointerCancel"> & {
  as?: "div" | "article";
  glowColor?: "gold" | "silver";
  size?: "sm" | "md" | "lg";
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  customSize?: boolean;
};

const sizes = {
  sm: { width: "12rem", height: "16rem" },
  md: { width: "16rem", height: "20rem" },
  lg: { width: "20rem", height: "24rem" },
};

function moveSpotlight(event: PointerEvent<HTMLElement>) {
  if (event.pointerType === "touch") return;

  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  card.setAttribute("data-spotlight-active", "");
}

function clearSpotlight(event: PointerEvent<HTMLElement>) {
  event.currentTarget.removeAttribute("data-spotlight-active");
}

export function GlowCard({
  as: Card = "div",
  children,
  className,
  glowColor = "gold",
  size = "md",
  width,
  height,
  customSize = false,
  style,
  ...props
}: GlowCardProps) {
  const dimensions = customSize ? undefined : sizes[size];

  return (
    <Card
      {...props}
      className={[styles.card, className].filter(Boolean).join(" ")}
      data-spotlight={glowColor}
      style={{ width: width ?? dimensions?.width, height: height ?? dimensions?.height, ...style }}
      onPointerMove={moveSpotlight}
      onPointerLeave={clearSpotlight}
      onPointerCancel={clearSpotlight}
    >
      {children}
    </Card>
  );
}
