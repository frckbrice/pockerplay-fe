import Image from "next/image";
import Link from "next/link";

type Props = {
  hidden: boolean;
};

const HomeNav = ({ hidden }: Props) => {
  return (
    <div className="flex justify-between items-center mobile:max-sm:px-5 px-24 py-3 bg-white">
      <Image
        src={"/POCKERPLAY-LOGO copy.png"}
        alt=""
        width={200}
        height={100}
      />
      <Link
        href={"/register"}
        className={`border ${
          hidden ? "invisible" : "visible"
        } border-themecolor px-8 py-2`}
      >
        <span className="text-themecolor font-bold">SignUp</span>
      </Link>
    </div>
  );
};

export default HomeNav;
