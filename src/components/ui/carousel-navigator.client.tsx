"use client";

import { motion } from "motion/react";
import { FigmaIcon } from "./figma-icon";
import styles from "./carousel-navigator.module.css";

type Props = {
  title: string;
  total: number;
  selected: number;
  controlsId: string;
  reducedMotion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
  overlay: boolean;
};

export function CarouselNavigator({
  title,
  total,
  selected,
  controlsId,
  reducedMotion,
  onPrevious,
  onNext,
  onSelect,
  overlay,
}: Props) {
  if (total < 2) return null;

  return (
    <div className={`${styles.navigator} ${overlay ? "" : styles.inline}`} role="group" aria-label={`${title} image controls`}>
      <button
        type="button"
        className={styles.arrow}
        aria-label={`Previous image for ${title}`}
        aria-controls={controlsId}
        onClick={onPrevious}
      >
        <FigmaIcon name="previous" />
      </button>
      <div className={styles.indicators}>
        {Array.from({ length: total }, (_, index) => (
          <button
            key={index}
            type="button"
            className={styles.indicator}
            aria-label={`Show image ${index + 1} of ${total} for ${title}`}
            aria-pressed={index === selected}
            aria-controls={controlsId}
            onClick={() => onSelect(index)}
          >
            <motion.span
              className={styles.dot}
              animate={{ width: index === selected ? 18 : 5, opacity: index === selected ? 1 : 0.38 }}
              transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
            />
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.arrow}
        aria-label={`Next image for ${title}`}
        aria-controls={controlsId}
        onClick={onNext}
      >
        <FigmaIcon name="next" />
      </button>
    </div>
  );
}
