"use client";
import { InputTextarea } from "primereact/inputtextarea";

export default function TextareaWithLength({
  value,
  onChange,
  maxLength = 200,
}) {
  return (
    <div>
      <InputTextarea
        value={value}
        onChange={onChange}
        rows={5}
        className="text-sm resize-none w-full"
        pt={{
          root: {
            maxLength: maxLength,
          },
        }}
      />
      <div className="text-xs text-right text-slate-500">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
