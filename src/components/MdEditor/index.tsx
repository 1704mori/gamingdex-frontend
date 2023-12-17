import React, { useState, useRef, useEffect } from "react";
import { marked } from "marked";
import TextArea from "../TextArea";
import { Bold, Italic, Underline } from "lucide-react";
import DOMPurify from "dompurify";

type Props = {
  preview?: boolean;
  output?: (value: string) => void;
};

export default function MdEditor({ preview = true, output }: Props) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // if (!text || !text.trim()) return;
    // @ts-ignore
    output?.(DOMPurify.sanitize(marked(text)));
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const renderMarkdown = () => {
    if (!text)
      return {
        __html: DOMPurify.sanitize("<p>Your review will appear here.</p>"),
      };

    return { __html: DOMPurify.sanitize(marked(text) as string) };
  };

  const insertMarkdownSyntax = (before: string, after: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    const beforeText = text.substring(0, start);
    const afterText = text.substring(end);

    const newText = beforeText + before + selectedText + after + afterText;
    setText(newText);

    const cursorPosition = selectedText
      ? start + before.length + selectedText.length
      : start + before.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPosition, cursorPosition);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-accent border border-accent2">
        <button
          className="hover:bg-accent2 px-1.5 py-2 rounded-lg transition-colors"
          onClick={() => insertMarkdownSyntax("**", "**")}
        >
          <Bold size="18" />
        </button>
        <button
          className="hover:bg-accent2 px-1.5 py-2 rounded-lg transition-colors"
          onClick={() => insertMarkdownSyntax("*", "*")}
        >
          <Italic size="18" />
        </button>
        <button
          className="hover:bg-accent2 px-1.5 py-2 rounded-lg transition-colors"
          onClick={() => insertMarkdownSyntax("<u>", "</u>")}
        >
          <Underline size="18" />
        </button>
      </div>
      <TextArea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        style={{ width: "100%", height: "200px" }}
      />
      {preview && (
        <div
          className="bg-accent px-2 py-2 rounded-lg break-words whitespace-break-spaces opacity-70"
          dangerouslySetInnerHTML={renderMarkdown()}
        />
      )}
    </div>
  );
}
