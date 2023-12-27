"use client";
import HomeNav from "@/components/organisms/HomeNav";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-2 bg-[#f1f1f1]">
      <HomeNav hidden={false} />
      <div className="flex px-24 mobile:max-sm:flex-col mt-20 justify-between items-center mobile:max-sm:px-5">
        <div className="w-[50vw] mobile:max-sm:w-full mobile:max-sm:justify-center mobile:max-sm:items-center flex flex-col gap-2">
          <h2 className="text-[40px] mobile:max-sm:text-[30px] mobile:max-sm:text-center bigScreen:text-[70px] font-bold text-themecolor">
            The Thrill of Guessing Games in Real-Time
          </h2>
          <p className="mobile:max-sm:hidden">
            Embark on a captivating journey of guesswork and strategic thinking
            with Pockerplay, a thrilling online and mobile game that will
            challenge your perception and test your ability to read between the
            lines. Join the vibrant community of Pockerplay enthusiasts and
            engage in exhilarating game sessions with friends, family, or even
            new acquaintances.
          </p>
          <Image
            src={"/pinball.png"}
            alt="pinbull"
            width={300}
            height={300}
            className="hidden mobile:max-sm:block"
          />
          <Link
            className=" bg-lightPupple p-4 w-[150px] mobile:max-sm:w-full text-center font-bold text-white"
            href={"/register"}
          >
            GET STARTED
          </Link>
        </div>
        <div>
          <Image
            src={"/pinball.png"}
            alt="pinbull"
            width={500}
            height={500}
            className="bigScreen:hidden mobile:max-sm:hidden"
          />

          <Image
            src={"/pinball.png"}
            alt="pinbull"
            width={700}
            height={700}
            className="bigScreen:block hidden"
          />
        </div>
      </div>
      <div className="flex px-24 gap-10 justify-between bg-white items-center mobile:max-sm:w-full mobile:max-sm:px-2">
        <div className="mobile:max-sm:hidden">
          <Image
            src={"/runningman.png"}
            alt="pinbull"
            width={500}
            height={500}
            className="bigScreen:hidden mobile:max-sm:hidden"
          />

          <Image
            src={"/runningman.png"}
            alt="pinbull"
            width={700}
            height={700}
            className="bigScreen:block hidden"
          />
        </div>
        <div className="w-[50vw] flex flex-col mobile:max-sm:justify-center mobile:max-sm:items-center mobile:max-sm:gap-0 mobile:max-sm:w-full mobile:max-sm:text-center gap-2 ">
          <h2 className="text-[40px] bigScreen:text-[60px] mobile:max-sm:text-[20px] font-bold text-themecolor">
            A World of Intriguing Images
          </h2>
          <Image
            src={"/runningman.png"}
            alt="pinbull"
            width={300}
            height={300}
            className="hidden mobile:max-sm:block"
          />
          <p className="">
            boasts a vast collection of captivating images, ranging from iconic
            landmarks to everyday objects. Each image holds the potential to
            spark intriguing questions and lead to unexpected twists and turns
            in the guessing process. The sheer variety of images ensures that
            every game session is an entirely new and unpredictable adventure.
          </p>
        </div>
      </div>
    </main>
  );
}
