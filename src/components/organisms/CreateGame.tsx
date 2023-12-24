import RoundLoader from "../atoms/RoundLoader";

function CreateGame() {
  return (
    <div className="w-[80vw] h-[80vh] flex justify-center items-center fixed z-40 top-[8%] left-[10%] bg-white shadow-md">
      <div>
        <div className="w-full  flex justify-center items-center">
          <RoundLoader />
        </div>
        <h3>waiting for Game session link</h3>
      </div>
    </div>
  );
}

export default CreateGame;
