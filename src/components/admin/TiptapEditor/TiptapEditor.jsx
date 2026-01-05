"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect } from "react";
import { MdFormatBold, MdFormatItalic, MdList } from "react-icons/md";
import styles from "../LeaderModal/LeaderModal.module.scss";

export default function TiptapEditor({ value, onChange }) {
  const [_, setUpdateTick] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: () => {
      setUpdateTick((tick) => tick + 1);
    },
    onTransaction: () => {
      setUpdateTick((tick) => tick + 1);
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className={styles.tiptapContainer}>
      <div className={styles.tiptapToolbar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? styles.active : ""}
        >
          <MdFormatBold size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? styles.active : ""}
        >
          <MdFormatItalic size={20} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? styles.active : ""}
        >
          <MdList size={20} />
        </button>
      </div>
      <EditorContent editor={editor} className={styles.tiptapEditor} />
    </div>
  );
}
