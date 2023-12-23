"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "@/components/atoms/Card";
import Scores from "@/components/organisms/Scores";
import { useState } from "react";

// react icons
import { PiCopySimpleLight } from "react-icons/pi";
import { toast } from "react-toastify";

export default function Page() {
  const [generatedData, setGenerataedData] = useState<Array<any>>([]);
  const [selectedCard, setSelectedCard] = useState<CardType>();

  type CardType = {
    image: string;
    text?: string;
  };

  const cardData = [
    {
      image:
        "https://i.pinimg.com/564x/2e/40/02/2e40027b9b156589cfbccbf7b33d3bc7.jpg",
    },
    {
      image:
        "https://i.pinimg.com/564x/af/b3/a9/afb3a98cc64a7401ca0543b4b4a8c8c7.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/30/8e/c4/308ec4e8666d3fb984df3fb7b9409e85.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/90/b1/6d/90b16d1dda066c1704b6015018bc69bb.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/cd/86/d5/cd86d5e4f1717c37a0af36dd8185906e.jpg",
    },
    {
      image:
        "https://i.pinimg.com/736x/db/7b/44/db7b44df5539b01cb2686dd2633ca19a.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/7f/b7/c1/7fb7c1c60196597dce300c79edba70fb.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/e5/74/f5/e574f5581c96b499dd9160796ebb9820.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/81/ce/09/81ce09fc14dc5da8f6cd2feb8c1ae667.jpg",
    },
    {
      image:
        "https://i.pinimg.com/236x/aa/7a/91/aa7a91659c3b96d6db2131fdeed529e4.jpg",
    },
  ];

  const handleGenerate = () => {
    setGenerataedData(cardData);
  };

  const handleCopy = () => {
    toast.success("Copied!", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
  };

  return (
    <main className="flex mobile:max-sm:flex-col-reverse  justify-between bg-bgGray mobile:max-sm:h-auto bigScreen:h-[calc(100vh-50px)] h-[calc(100vh-49px)] ">
      {/* ############ GAME AREA ########### */}
      <div className="py-4 px-8 w-full mobile:max-sm:px-2 mobile:max-sm:h-[calc(100vh-180px)] flex flex-col gap-5">
        <div className=" flex justify-between w-full">
          <div className="flex gap-2 mobile:max-sm:h-[4rem] ">
            <select
              name="Type"
              defaultValue="Words"
              id=""
              className="border-themecolor  rounded px-2 cursor-pointer outline-none  drop-shadow-md text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0   w-[7rem] duration-300"
            >
              <option
                className="hover:bg-themecolor p-2 focus:bg-themecolor hover:text-white"
                value="Words"
              >
                Words
              </option>
              <option value="Images">Images</option>
            </select>

            <select
              name="Type"
              defaultValue="cards"
              id=""
              className="border-themecolor  rounded px-2 cursor-pointer outline-none  drop-shadow-md text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0   w-[7rem] duration-300"
            >
              <option value="cards">cards</option>
              <option value="animals">animals</option>
              <option value="food">food</option>
              <option value="cars">cars</option>
              <option value="people">people</option>
              <option value="birds">birds</option>
            </select>

            <select
              name="Number"
              defaultValue="5"
              id=""
              className="border-themecolor  rounded px-2 cursor-pointer outline-none  drop-shadow-md text-themecolor border  w-[4rem] duration-300"
            >
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <button
            onClick={handleGenerate}
            className=" border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2"
          >
            🃏 Generate
          </button>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-center items-center">
            <Card
              image={selectedCard?.image || ""}
              text={""}
              className={"w-[80px] h-[80px]"}
            />
            <span>YOU</span>
          </div>

          <div className="flex gap-3 items-center justify-center">
            <CopyToClipboard
              text="this is the shit you copied"
              onCopy={handleCopy}
            >
              <button
                // onClick={handleCopy}
                className="flex gap-1  items-center p-2  text-green-600"
              >
                <span className="text-green-600">
                  your link is ready, copy!
                </span>
                <PiCopySimpleLight size={20} />
              </button>
            </CopyToClipboard>
          </div>

          <div className="flex flex-col justify-center items-center">
            <Card image={""} text={""} className={"w-[80px] h-[80px] "} />
            <span>Hills</span>
          </div>
        </div>
        {/* ###### Cards section ##### */}
        <div className="w-full flex items-center justify-center gap-2 p-2 flex-wrap h-[40vh] bigScreen:h-[60vh] rounded border border-themecolor">
          {generatedData.map((data, index) => (
            <Card
              key={index}
              image={data.image}
              text={""}
              onClick={() => setSelectedCard(data)}
              className="w-[100px] h-[100px] bigScreen:w-[250px] bigScreen:h-[250px]"
            />
          ))}
        </div>
        {/* ###### Cards section ##### */}

        <textarea
          className="h-[10vh] outline-none border border-gray-300 p-2 text-xs"
          placeholder="enter a hint message..."
        />
        <button className="bg-themecolor text-white p-2">Play</button>
      </div>

      {/* ############ GAME AREA ########### */}

      <div className="bg-white flex flex-col w-[240px] mobile:max-sm:w-full shadow-md  h-full px-2 py-4 gap-5">
        <Scores />
        <div className="flex border border-themecolor rounded-[5px] p-2 justify-center gap-4 font-extrabold text-themecolor">
          <span>0/5</span>
          <span>Rounds</span>
        </div>

        <button className=" border mobile:max-sm:hidden bg-themecolor text-white p-2">
          insights
        </button>
      </div>
    </main>
  );
}
