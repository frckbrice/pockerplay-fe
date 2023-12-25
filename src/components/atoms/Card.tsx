type CardProps = {
  image: string;
  onClick?: () => void;
  text: string;
  className: string;
  category: string;
};

export default function Card({
  image,
  onClick,
  text,
  className,
  category,
}: CardProps) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: `url(${category === "images" ? image : ""})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "fill",
      }}
      className={` ${className} border-2 rounded-md border-gray-300 flex justify-center items-center`}
    >
      <h2>{category === "words" ? text : ""}</h2>
    </button>
  );
}
