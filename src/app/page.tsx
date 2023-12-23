import HomeNav from "@/components/organisms/HomeNav";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f1f1f1] justify-between">
      <HomeNav hidden={false} />
    </main>
  );
}
