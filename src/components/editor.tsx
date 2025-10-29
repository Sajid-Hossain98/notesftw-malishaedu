"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
}

export const Editor = ({ onChange, value, placeholder }: EditorProps) => {
  const ReactQuill = useMemo(
    () =>
      dynamic(() => import("react-quill"), {
        ssr: false,
      }),
    []
  );

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
      [{ color: [] }],
      [{ background: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "align",
    "color",
    "code-block",
    "background",
  ];

  return (
    <div className="overflow-hidden text-black bg-zinc-100 border border-black rounded-[5px]">
      <ReactQuill
        theme="snow"
        formats={quillFormats}
        modules={quillModules}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
