type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="bg-blue-500 text-white p-4 rounded-md" onClick={onClick}>
      {children}
    </button>
  );
}
