"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Shapes } from "lucide-react";
import type { CraftSummary } from "@/content/types";

export function CraftCollection({
  items,
  preview = false,
}: {
  items: CraftSummary[];
  preview?: boolean;
}) {
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(6);
  const reduced = useReducedMotion();
  const categories = [
    "All",
    ...Array.from(new Set(items.map((item) => item.category))),
  ];
  const filtered = items.filter(
    (item) => category === "All" || item.category === category,
  );
  const visible = filtered.slice(0, preview ? 4 : limit);
  if (!items.length)
    return (
      <div className="craft-empty">
        <div className="craft-empty-icon" aria-hidden="true">
          <Shapes size={30} strokeWidth={1.2} />
        </div>
        <h3>Small details. Thoughtful design.</h3>
        <p>
          A space for interface explorations, components, and ideas.
          <br />
          New pieces will appear here.
        </p>
      </div>
    );
  return (
    <>
      {!preview && (
        <div className="craft-filters" aria-label="Filter craft by category">
          {categories.map((name) => (
            <button
              type="button"
              key={name}
              aria-pressed={category === name}
              onClick={() => {
                setCategory(name);
                setLimit(6);
              }}
            >
              {name}
              <span>
                {name === "All"
                  ? items.length
                  : items.filter((item) => item.category === name).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="craft-grid">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map((item) => (
            <motion.article
              layout={!reduced}
              key={item.slug}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.18 }}
            >
              <Link href={`/craft/${item.slug}`} className="craft-card">
                <img
                  src={item.image.src}
                  alt={item.image.alt}
                  width={600}
                  height={450}
                  loading="lazy"
                />
                <div>
                  <h3>{item.title}</h3>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </div>
                <p className="small muted">
                  {item.category}
                  {item.date && (
                    <>
                      {" "}
                      · <time dateTime={item.date}>{item.date}</time>
                    </>
                  )}
                </p>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      {!preview && visible.length < filtered.length && (
        <button
          type="button"
          className="button secondary load-more"
          onClick={() => setLimit((value) => value + 6)}
        >
          Load More
          <span className="muted">({filtered.length - visible.length})</span>
        </button>
      )}
      {!preview && (
        <p className="sr-only" role="status">
          Showing {visible.length} of {filtered.length} pieces in {category}.
        </p>
      )}
    </>
  );
}
