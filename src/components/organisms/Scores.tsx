import Avatar from "../atoms/Avatar";

export default function Scores() {
  return (
    <div className="flex flex-col py-2 px-4 rounded-[10px] text-white justify-center items-center bg-themecolor">
      <h3 className="font-bold ">scores</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col items-center justify-center">
          <Avatar profilePicture={""} size={3} />
          <span>Bill</span>
        </div>
        <div>
          <p>0 : 0</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Avatar profilePicture={""} size={3} />
          <span>Hills</span>
        </div>
      </div>
    </div>
  );
}
