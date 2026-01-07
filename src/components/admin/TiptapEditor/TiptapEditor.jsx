"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useEffect, useCallback } from "react";
import { MdFormatBold, MdFormatItalic, MdList } from "react-icons/md";
import styles from "../LeaderModal/LeaderModal.module.scss";

export default function TiptapEditor({ value, onChange }) {
  const [_, setUpdateTick] = useState(0);

  const prepareContent = useCallback((val) => {
    if (!val || val.trim() === "" || val === "<p></p>") {
      return "<p></p>";
    }
    return val;
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: prepareContent(value),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "tiptap-content",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: () => setUpdateTick((t) => t + 1),
    onTransaction: () => setUpdateTick((t) => t + 1),
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const timer = setTimeout(() => {
        if (editor.isEmpty) {
          editor.commands.setContent("<p></p>", false);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [editor]);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(prepareContent(value), false);
    }
  }, [value, editor, prepareContent]);

  if (!editor) return null;

  const handleToolbarAction = (e, action) => {
    e.preventDefault();
    action();
  };

  return (
    <div className={styles.tiptapContainer}>
      <div className={styles.tiptapToolbar}>
        <button
          type="button"
          onMouseDown={(e) =>
            handleToolbarAction(e, () =>
              editor.chain().focus().toggleBold().run()
            )
          }
          className={editor.isActive("bold") ? styles.active : ""}
        >
          <MdFormatBold size={20} />
        </button>
        <button
          type="button"
          onMouseDown={(e) =>
            handleToolbarAction(e, () =>
              editor.chain().focus().toggleItalic().run()
            )
          }
          className={editor.isActive("italic") ? styles.active : ""}
        >
          <MdFormatItalic size={20} />
        </button>
        <button
          type="button"
          onMouseDown={(e) =>
            handleToolbarAction(e, () =>
              editor.chain().focus().toggleBulletList().run()
            )
          }
          className={editor.isActive("bulletList") ? styles.active : ""}
        >
          <MdList size={20} />
        </button>
      </div>
      <EditorContent editor={editor} className={styles.tiptapEditor} />
    </div>
  );
}
