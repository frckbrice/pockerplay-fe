import HomeNav from "@/components/organisms/HomeNav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#f1f1f1] justify-between">
      <HomeNav hidden={false} />
      <div className="flex">
        <div>
          <h2>The Thrill of Guessing Games in Real-Time</h2>
          <p>
            Embark on a captivating journey of guesswork and strategic thinking
            with Pockerplay, a thrilling online and mobile game that will
            challenge your perception and test your ability to read between the
            lines. Join the vibrant community of Pockerplay enthusiasts and
            engage in exhilarating game sessions with friends, family, or even
            new acquaintances.
          </p>
          <Link href={"/register"}>GET STARTED</Link>
        </div>
        <div>
          <Image src={"/pinball.png"} alt="pinbull" width={200} height={200} />
        </div>
      </div>
    </main>
  );
}
