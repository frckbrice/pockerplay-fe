"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "@/components/atoms/Card";
import Scores from "@/components/organisms/Scores";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { api_call } from "@/utils/service/constant";

// react icons
import { PiCopySimpleLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [generatedData, setGenerataedData] = useState<Array<any>>([]);
  const [selectedCard, setSelectedCard] = useState<CardType>();
  const [score, setScore] = useState<Score>();
  const [homePlayer, setHomePlayer] = useState<User>();
  const [guessPlayer, setGuessPlayer] = useState<User>();
  const [round, setRound] = useState<Round>();
  const [homeChoice, setHomeChoice] = useState<string>("");
  const [guessChoice, setGuessChoice] = useState<string>("");
  const [catergory, setCategory] = useState<string>("");
  const [hintMessage, setHintMessage] = useState<string>("");
  const [gameUrl, setGameUrl] = useState<string>("");

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

  const createNewGame = () => {};

  return (
    <main>
      {" "}
      <button onClick={createNewGame}>new game</button>{" "}
    </main>
  );
}
