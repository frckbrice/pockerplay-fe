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
        backgroundImage: `url(${category === "Images" ? image : ""})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "fill",
      }}
      className={` ${className} border-2 rounded-md border-gray-300 flex justify-center items-center text-black`}
    >
      <h2 className=" w-fit">
        {category === "words" ? text.substring(0, 8) : ""}
      </h2>
    </button>
  );
}
