type CharacterCounterProps = {
  textLength: number;
  maxLength?: number;
};

export default function CharacterCounter({
  textLength,
  maxLength,
}: CharacterCounterProps) {
  return (
    <div className="text-gray-500 dark:text-white">
      <span>{textLength}</span>
      {maxLength && <span>/{maxLength}</span>}
    </div>
  );
}
