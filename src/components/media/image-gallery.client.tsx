"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { CarouselNavigator } from "@/components/ui/carousel-navigator.client";
import { clampImageIndex, wrapImageIndex } from "./carousel-index";
import styles from "./image-gallery.module.css";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function ProjectGallery({
  images,
  title,
  variant = "default",
}: {
  images: ProjectImage[];
  title: string;
  variant?: "default" | "figma";
}) {
  const [selected, setSelected] = useState(0);
  const [width, setWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const animation = useRef<ReturnType<typeof animate> | null>(null);
  const x = useMotionValue(0);
  const reducedMotion = Boolean(useReducedMotion());
  const controlsId = useId();
  const safeSelected = clampImageIndex(selected, images.length);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selected >= images.length) setSelected(clampImageIndex(selected, images.length));
  }, [images.length, selected]);

  const animateTo = useCallback((index: number) => {
    animation.current?.stop();
    animation.current = animate(
      x,
      -index * width,
      reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 },
    );
  }, [reducedMotion, width, x]);

  useEffect(() => {
    animateTo(safeSelected);
    return () => animation.current?.stop();
  }, [animateTo, safeSelected]);

  function move(delta: number) {
    setSelected((current) => wrapImageIndex(clampImageIndex(current, images.length) + delta, images.length));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (images.length < 2) return;
    if (event.key === "ArrowLeft") move(-1);
    else if (event.key === "ArrowRight") move(1);
    else if (event.key === "Home") setSelected(0);
    else if (event.key === "End") setSelected(images.length - 1);
    else return;
    event.preventDefault();
  }

  if (!images.length) return null;

  return (
    <div
      className={`project-gallery ${styles.gallery} ${variant === "figma" ? styles.figma : ""}`}
      role="region"
      aria-roledescription={images.length > 1 ? "carousel" : undefined}
      aria-label={`${title} images`}
      tabIndex={images.length > 1 ? 0 : undefined}
      onKeyDown={onKeyDown}
      data-figma-node={variant === "figma" ? "1352:6702" : undefined}
    >
      <div ref={viewportRef} id={controlsId} className={styles.viewport}>
        <motion.div
          className={styles.track}
          style={{ x, touchAction: "pan-y pinch-zoom" }}
          drag={images.length > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          onDragStart={() => animation.current?.stop()}
          onDragEnd={(_, info) => {
            const distance = Math.abs(info.offset.x);
            const velocity = Math.abs(info.velocity.x);
            if (distance > Math.max(35, width * 0.12) || velocity > 450) move(info.offset.x < 0 ? 1 : -1);
            else animateTo(safeSelected);
          }}
        >
          {images.map((image, index) => (
            <div
              key={image.src}
              className={`gallery-slide ${styles.slide}`}
              aria-hidden={index !== safeSelected}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
      {variant === "figma" && <div className={styles.gradient} aria-hidden="true" />}
      <CarouselNavigator
        title={title}
        total={images.length}
        selected={safeSelected}
        controlsId={controlsId}
        reducedMotion={reducedMotion}
        onPrevious={() => move(-1)}
        onNext={() => move(1)}
        onSelect={setSelected}
        overlay={variant === "figma"}
      />
      {images.length > 1 && (
        <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          Image {safeSelected + 1} of {images.length}
        </span>
      )}
    </div>
  );
}
