import type { ReactNode } from "react";

type JSONContent = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  content?: JSONContent[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
};

function renderMarks(text: string, marks?: JSONContent["marks"]) {
  if (!marks?.length) return text;
  return marks.reduce<ReactNode>((acc, mark) => {
    if (mark.type === "bold") return <strong>{acc}</strong>;
    if (mark.type === "italic") return <em>{acc}</em>;
    if (mark.type === "link") {
      const href = String(mark.attrs?.href ?? "#");
      return (
        <a href={href} className="text-copper underline underline-offset-4">
          {acc}
        </a>
      );
    }
    return acc;
  }, text);
}

function renderNode(node: JSONContent, index: number): ReactNode {
  const children = node.content?.map((child, i) => renderNode(child, i));

  switch (node.type) {
    case "doc":
      return <>{children}</>;
    case "paragraph":
      return (
        <p key={index}>
          {node.content?.map((child, i) =>
            child.type === "text" ? (
              <span key={i}>{renderMarks(child.text ?? "", child.marks)}</span>
            ) : (
              renderNode(child, i)
            ),
          )}
        </p>
      );
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const Tag = (level === 3 ? "h3" : "h2") as "h2" | "h3";
      return <Tag key={index}>{children}</Tag>;
    }
    case "bulletList":
      return <ul key={index}>{children}</ul>;
    case "listItem":
      return <li key={index}>{children}</li>;
    case "blockquote":
      return <blockquote key={index}>{children}</blockquote>;
    case "text":
      return <span key={index}>{renderMarks(node.text ?? "", node.marks)}</span>;
    case "hardBreak":
      return <br key={index} />;
    default:
      return <div key={index}>{children}</div>;
  }
}

export function TipTapRenderer({ content }: { content: string }) {
  let doc: JSONContent;
  try {
    doc = JSON.parse(content);
  } catch {
    return <div className="prose-story" dangerouslySetInnerHTML={{ __html: content }} />;
  }

  return <div className="prose-story">{renderNode(doc, 0)}</div>;
}
