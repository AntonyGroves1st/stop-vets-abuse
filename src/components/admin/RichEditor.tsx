"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (json: string) => void;
  placeholder?: string;
};

export function RichEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({
        placeholder: placeholder || "Write the investigation…",
      }),
    ],
    content: (() => {
      try {
        return JSON.parse(value);
      } catch {
        return value || "";
      }
    })(),
    onUpdate: ({ editor: ed }) => {
      onChange(JSON.stringify(ed.getJSON()));
    },
    editorProps: {
      attributes: {
        class: "prose-story focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const current = JSON.stringify(editor.getJSON());
    if (value && value !== current) {
      try {
        editor.commands.setContent(JSON.parse(value));
      } catch {
        /* keep */
      }
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1 border border-fog/60 bg-white px-2 py-2">
        {(
          [
            ["Bold", () => editor.chain().focus().toggleBold().run()],
            ["Italic", () => editor.chain().focus().toggleItalic().run()],
            ["H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run()],
            ["H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run()],
            ["Quote", () => editor.chain().focus().toggleBlockquote().run()],
            ["List", () => editor.chain().focus().toggleBulletList().run()],
          ] as const
        ).map(([label, action]) => (
          <button
            key={label}
            type="button"
            onClick={action}
            className="rounded px-2 py-1 text-xs text-slate hover:bg-bone-dim"
          >
            {label}
          </button>
        ))}
        <button
          type="button"
          className="rounded px-2 py-1 text-xs text-slate hover:bg-bone-dim"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </button>
      </div>
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
