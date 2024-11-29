import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

export interface ReactQuillEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ReactQuillEditor = React.forwardRef<ReactQuill, ReactQuillEditorProps>(
  ({ className, value, onChange, placeholder }, ref) => {
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["blockquote", "code-block"],
        [{ script: "sub" }, { script: "super" }],
        ["clean"],
        [{ table: {} }]
      ],
    };

    const formats = [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "align",
      "list",
      "bullet",
      "link",
      "image",
      "blockquote",
      "code-block",
      "script",
      "table",
      "tableHeader",
      "tableRow",
      "tableCell"
    ];

    return (
      <div className="editor-wrapper">
        <style>
          {`
            .editor-wrapper .ql-editor {
              min-height: 400px;
              font-size: 16px;
              line-height: 1.6;
            }
            
            .editor-wrapper .ql-editor h3 {
              color: #7E69AB;
              font-size: 1.5rem;
              margin: 1.5rem 0 1rem;
            }
            
            .editor-wrapper .ql-editor a {
              color: #9b87f5;
              text-decoration: none;
            }
            
            .editor-wrapper .ql-editor a:hover {
              text-decoration: underline;
            }
            
            .editor-wrapper .ql-editor blockquote {
              border-left: 4px solid #9b87f5;
              padding-left: 1rem;
              margin: 1rem 0;
              color: #666;
            }
            
            .editor-wrapper .ql-editor img {
              max-width: 100%;
              height: auto;
              margin: 1rem 0;
            }
            
            .editor-wrapper .ql-editor table {
              width: 100%;
              border-collapse: collapse;
              margin: 1rem 0;
            }
            
            .editor-wrapper .ql-editor td,
            .editor-wrapper .ql-editor th {
              border: 1px solid #ddd;
              padding: 8px;
            }
            
            .editor-wrapper .ql-editor th {
              background-color: #f5f5f5;
            }
            
            .editor-wrapper .ql-snow.ql-toolbar {
              border-radius: 0.5rem 0.5rem 0 0;
              border-color: #E2E8F0;
            }
            
            .editor-wrapper .ql-container.ql-snow {
              border-radius: 0 0 0.5rem 0.5rem;
              border-color: #E2E8F0;
            }
          `}
        </style>
        <ReactQuill
          ref={ref}
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className={cn(
            "min-h-[400px] w-full rounded-md bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          theme="snow"
        />
      </div>
    );
  }
);

ReactQuillEditor.displayName = "ReactQuillEditor";

export { ReactQuillEditor };