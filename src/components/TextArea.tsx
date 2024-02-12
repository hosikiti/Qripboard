import { ChangeEvent, TextareaHTMLAttributes } from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder?: string;
};

export default function TextArea({
  value,
  onChange,
  maxLength,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      className="w-full rounded-lg p-4 dark:bg-slate-700 dark:text-white dark:border-white"
      placeholder={placeholder}
      rows={6}
      value={value}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
}
