import { Upload, X, FileText, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
  label: string;
  description: string;
  accept?: string;
  error?: string;
}

export function FileDropzone({
  files,
  onChange,
  maxFiles = 10,
  maxSizeMB = 10,
  label,
  description,
  accept = ".pdf,.png,.jpg,.jpeg,.doc,.docx",
  error,
}: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = Array.from(incoming).slice(0, maxFiles - files.length);
    const valid = newFiles.filter((f) => f.size <= maxSizeMB * 1024 * 1024);
    onChange([...files, ...valid].slice(0, maxFiles));
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors ${
          isDragging
            ? "border-indigo bg-indigo-subtle"
            : "border-border bg-canvas-soft hover:border-indigo/40 hover:bg-indigo-subtle/50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-indigo-subtle text-indigo">
          <Upload className="h-5 w-5" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">
          Drop files here, or{" "}
          <span className="text-indigo underline-offset-2 hover:underline">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF, image or document · up to {maxSizeMB} MB each · max {maxFiles} files
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border border-border bg-canvas-soft px-3 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                {file.type.startsWith("image/") ? (
                  <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                )}
                <span className="truncate text-sm text-foreground">{file.name}</span>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
                  {(file.size / 1024).toFixed(0)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {description && <p className="text-xs text-muted-foreground">{description}</p>}
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
