import React from "react";

interface Span {
  _key?: string;
  _type: "span";
  text: string;
  marks?: string[];
}

interface Block {
  _key?: string;
  _type: "block";
  children: Span[];
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
  listItem?: "bullet" | "number";
}

interface PortableTextProps {
  value: string | Block[] | any;
  className?: string;
}

export default function PortableText({ value, className = "" }: PortableTextProps) {
  if (!value) return null;

  // If the value is a plain string, render it (usually HTML content from static fallback)
  if (typeof value === "string") {
    // Check if it looks like HTML, otherwise render as plain paragraphs split by newlines
    if (value.trim().startsWith("<") && value.trim().endsWith(">")) {
      return (
        <div
          className={className}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      );
    }

    return (
      <div className={`${className} space-y-4`}>
        {value.split("\n\n").map((para, i) => (
          <p key={i} className="leading-relaxed">
            {para.split("\n").map((line, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
    );
  }

  // If it's an array of PortableText blocks
  if (Array.isArray(value)) {
    return (
      <div className={`${className} space-y-4`}>
        {value.map((block: any, blockIdx) => {
          if (block._type !== "block") {
            // Non-block types (like custom image block, etc.)
            if (block._type === "image" && block.asset?._ref) {
              // Basic image block parsing if needed
              // For now, return a placeholder or simple element
              return (
                <div key={block._key || blockIdx} className="my-6 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center p-4">
                  <span className="text-gray-400 text-xs font-mono">Gambar Konten</span>
                </div>
              );
            }
            return null;
          }

          const children = block.children || [];
          const textContent = children.map((span: any, spanIdx: number) => {
            let renderedText: React.ReactNode = span.text;

            // Apply formatting based on marks
            if (span.marks && span.marks.length > 0) {
              span.marks.forEach((mark: string) => {
                if (mark === "strong") {
                  renderedText = <strong key={mark}>{renderedText}</strong>;
                } else if (mark === "em") {
                  renderedText = <em key={mark}>{renderedText}</em>;
                } else if (mark === "underline") {
                  renderedText = <span key={mark} className="underline">{renderedText}</span>;
                } else if (mark === "code") {
                  renderedText = <code key={mark} className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-sm">{renderedText}</code>;
                }
              });
            }

            return <React.Fragment key={span._key || spanIdx}>{renderedText}</React.Fragment>;
          });

          // Render block style
          const key = block._key || blockIdx;
          const style = block.style || "normal";

          if (block.listItem === "bullet") {
            return (
              <ul key={key} className="list-disc list-inside pl-4 space-y-1">
                <li>{textContent}</li>
              </ul>
            );
          }

          if (block.listItem === "number") {
            return (
              <ol key={key} className="list-decimal list-inside pl-4 space-y-1">
                <li>{textContent}</li>
              </ol>
            );
          }

          switch (style) {
            case "h1":
              return <h1 key={key} className="text-3xl font-extrabold text-gray-900 mt-8 mb-4">{textContent}</h1>;
            case "h2":
              return <h2 key={key} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{textContent}</h2>;
            case "h3":
              return <h3 key={key} className="text-xl font-bold text-gray-900 mt-5 mb-2">{textContent}</h3>;
            case "h4":
              return <h4 key={key} className="text-lg font-bold text-gray-900 mt-4 mb-2">{textContent}</h4>;
            case "blockquote":
              return (
                <blockquote key={key} className="border-l-4 border-amber-500 pl-4 italic text-gray-600 my-4 bg-gray-50 py-2 pr-2 rounded-r-lg">
                  {textContent}
                </blockquote>
              );
            default:
              return <p key={key} className="leading-relaxed text-gray-700">{textContent}</p>;
          }
        })}
      </div>
    );
  }

  return null;
}
