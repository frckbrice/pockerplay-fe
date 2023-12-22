type Props = {
  text: string;
  onClick: () => void;
  className: string;
};

export default function ActionBtn({ text, onClick, className }: Props) {
  return (
    <button
      onClick={onClick}
      className={`border ${className} mobile:max-sm:hidden bg-themecolor text-white p-2`}
    >
      {text}
    </button>
  );
}
