import { ChangeEvent } from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextArea({ value, onChange }: TextAreaProps) {
  return (
    <textarea
      className="w-full text-black rounded-lg p-4 dark:bg-slate-700 dark:text-white dark:border-white"
      placeholder="Enter text to share ..."
      rows={6}
      value={value}
      onChange={onChange}
    />
  );
}
