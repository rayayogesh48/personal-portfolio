import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose-dark w-full max-w-[700px] text-[15px] sm:text-[16px] leading-[1.7] text-mist">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-[26px] sm:text-[30px] font-[510] tracking-[-0.02em] text-paper mt-8 mb-4 leading-[1.2]">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[20px] sm:text-[22px] font-[510] tracking-[-0.015em] text-paper mt-8 mb-3 pb-2 border-b border-graphite/60 leading-[1.25]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[16px] sm:text-[17px] font-[510] tracking-[-0.01em] text-paper mt-6 mb-2 leading-[1.3]">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mb-4 text-mist leading-[1.7]">{children}</p>,
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;
            const isInternal = href.startsWith("/") || href.startsWith("#");
            if (isInternal) {
              return (
                <Link
                  href={href}
                  className="text-paper underline underline-offset-4 decoration-graphite hover:decoration-mist transition-colors"
                >
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper underline underline-offset-4 decoration-graphite hover:decoration-mist transition-colors"
              >
                {children}
              </a>
            );
          },
          ul: ({ children }) => (
            <ul className="list-disc pl-5 mb-4 space-y-1.5 text-mist">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 mb-4 space-y-1.5 text-mist">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-1 leading-[1.65]">{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-smoke pl-4 my-5 text-fog italic">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-8 border-graphite/60" />,
          table: ({ children }) => (
            <div className="overflow-x-auto my-6 border border-graphite rounded-[6px]">
              <table className="w-full text-left text-[13px] border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[#121315] border-b border-graphite text-paper font-[510]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-graphite/60">{children}</tbody>,
          tr: ({ children }) => <tr className="hover:bg-white/[0.01]">{children}</tr>,
          th: ({ children }) => <th className="p-2.5 font-[510]">{children}</th>,
          td: ({ children }) => <td className="p-2.5 text-mist">{children}</td>,
          code: ({ className, children }) => {
            const isBlock = className && className.includes("language-");
            if (isBlock) {
              return (
                <div className="my-5 rounded-[8px] border border-graphite bg-[#0c0d0e] p-3.5 overflow-x-auto font-mono text-[13px] text-paper">
                  <code>{children}</code>
                </div>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.05] border border-graphite text-paper font-mono text-[12px]">
                {children}
              </code>
            );
          },
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <div className="my-6 rounded-[8px] overflow-hidden border border-graphite bg-carbon">
                <img
                  src={src}
                  alt={alt || "Illustration"}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                {alt && (
                  <p className="text-[11px] font-mono text-ash p-2.5 border-t border-graphite bg-[#0c0d0e]">
                    {alt}
                  </p>
                )}
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
