import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { cn } from "@/lib/utils";

export interface ReactQuillEditorProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

const ReactQuillEditor = React.forwardRef<ReactQuill, ReactQuillEditorProps>(
  ({ className, value, onChange, placeholder, required, id }, ref) => {
    return (
      <ReactQuill
        ref={ref}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "min-h-[400px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        required={required}
      />
    );
  }
);

ReactQuillEditor.displayName = "ReactQuillEditor";

export { ReactQuillEditor };