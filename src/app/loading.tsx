import RoundLoader from "@/components/atoms/RoundLoader";

export default function Loading() {
  return (
    <main className="flex">
      <div className="flex w-[20vw] mt-[40vh] h-[20vh] justify-center items-center m-auto">
        <RoundLoader />
      </div>
    </main>
  );
}
