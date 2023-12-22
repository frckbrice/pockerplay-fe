import Avatar from "../atoms/Avatar";
import { RiMenu2Fill } from "react-icons/ri";
type Props = {
  onClick: () => void;
};

export default function TopNav({ onClick }: Props) {
  return (
    <nav className="flex items-center bg-white w-full justify-between border-b px-2 py-1 border-gray-200">
      <div>
        <button
          onClick={onClick}
          className="text-themecolor font-bold hidden mobile:max-sm:block"
        >
          <RiMenu2Fill size={24} />
        </button>
      </div>
      <Avatar profilePicture={""} size={4} />
    </nav>
  );
}
