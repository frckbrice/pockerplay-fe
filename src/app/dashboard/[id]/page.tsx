"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "@/components/atoms/Card";
import Scores from "@/components/organisms/Scores";
import { SetStateAction, useEffect, useState } from "react";

// react icons
import { FaCheck } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { FcCloseUpMode } from "react-icons/fc";

import { PiCopySimpleLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { socket } from "@/utils/service/constant";
import { api_call } from "@/utils/service/constant";
import { useParams, useRouter } from "next/navigation";

import { public_call } from "@/utils/service/constant";
import { useAppContext } from "@/app/Context/AppContext";
import Copy from "@/components/organisms/Copy";

import Popups from "@/components/atoms/Popups";
import Overlay from "@/components/atoms/Overlay";

export default function Page() {
  const router = useRouter();
  const [generatedData, setGenerataedData] = useState<Array<string>>([]);
  const [selectedCard, setSelectedCard] = useState<string>("?");
  const [score, setScore] = useState<Score>();
  const [homePlayer, setHomePlayer] = useState<User>(() => {
    if (typeof localStorage !== "undefined") {
      return (
        JSON.parse(localStorage.getItem("home_player")!) || {
          name: "",
          image: "",
          email: "",
        }
      );
    } else return null;
  });
  const [guessPlayer, setGuessPlayer] = useState<User>(() => {
    if (typeof localStorage !== "undefined") {
      if (localStorage.getItem("guess_player") !== "undefined")
        return JSON.parse(localStorage.getItem("guess_player") || "{}");
    } else return null;
  });
  const [round, setRound] = useState<Round>();
  const [homeChoice, setHomeChoice] = useState<string>("");
  const [guessChoice, setGuessChoice] = useState<string>("");
  const [guessGuess, setGuessGuess] = useState<string>("?");
  const [homeGuess, setHomeGuess] = useState<string>("");
  const [category, setCategory] = useState<string>("words");
  const [numberOfOptions, setNumberOfOptions] = useState<number>(5);
  const [homeplayerHint, setHomePlayerHint] = useState<string>("");
  const [guessPlayerHint, setGuessPlayerHint] = useState<string>("");
  const [messagehint, setMessageHint] = useState<string>("");
  const [gameUrl, setGameUrl] = useState<string>("");
  const [choiceReceived, setChoiceReceived] = useState<boolean>(false);
  const [guessReceived, setGuessReceived] = useState<string>("");
  const [game, setGame] = useState<GameSession>();
  const [role, setRole] = useState<string>("");
  const [choiceMadeId, setChoiceMadeId] = useState<string>("");
  const { setCurrentGame } = useAppContext();
  const params = useParams();
  const [IsWinner, setwinner] = useState(false);
  const [isLooser, setIsLooser] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [EndOfRound, setEndOfRound] = useState(false);

  let i: number = 1;
  useEffect(() => {
    if (
      !homePlayer?.id ||
      homePlayer === undefined ||
      !Object?.keys(homePlayer).length
    ) {
      console.log("no home player");
      return router.push("/verification");
    }

    // console.log(guessGuess);
    setGameUrl(`"${public_call}/dashboard/${params.id}"`);

    if (homePlayer) {
      socket.emit("joingame", {
        gamesession_id: params.id,
        playerId: homePlayer?.id,
      });

      socket.emit("myDM", {
        id: homePlayer?.id,
        gamesession_id: params.id,
      });
    }

    localStorage.setItem("currentGameSession", JSON.stringify(params.id));
  }, [homePlayer?.id, params, homePlayer, router]);

  socket.on("round", (data) => {
    if (data) {
      setRound(data.round);
      setGenerataedData(data.proposals);
    } else {
      alert("only 5 round per game session allowed ");
    }
  });

  socket.on("notify", (data) => {
    if (data) {
      // console.log("notify: ", data);
      if (data.guessPlayer) {
        console.log("guess player connected: ", data);
        if (data.homePlayer.id === homePlayer.id) {
          console.log("i am the home player");
          localStorage.setItem(
            "guess_player",
            JSON.stringify(data.guessPlayer)
          );
          setRole("home_player");
          localStorage.setItem("status", "home_player");
        } else {
          localStorage.setItem("home_player", JSON.stringify(data.guessPlayer));
          localStorage.setItem("guess_player", JSON.stringify(data.homePlayer));
          setRole("guess_player");
          localStorage.setItem("status", "guess_player");
        }
      }
    }
  });
  // console.log(role);
  const handleGenerate = () => {
    const data = {
      home_player_id: homePlayer.id,
      gamesession_id: params.id,
      category,
      number_of_proposals: numberOfOptions,
      round_number: round?.round_number ? round?.round_number + 1 : 1,
    };
    if (data.round_number > 5) {
      alert("this is the end of game.");
      data.round_number = 1;
      return;
    }
    socket.emit("generate", data);
  };
  socket.on("receive_guess", (data) => {
    if (data) {
      console.log("receive_guess: ", data);
      if (data.role === "home_player") {
        console.log("home_player guess", data.guess);
        setHomeGuess(data.guess);
      } else if (data.role === "guess_player") {
        console.log("guess_player guess", data.guess);

        setGuessGuess(data.guess);
      }
      setScore(data.score);
      setCategory(data.category);
      console.log("check game state", data?.gameState);
    }
  });
  socket.on("receive_choice", (data) => {
    if (data) {
      console.log("receive_choice: ", data);
      if (data.role === "home_player") {
        setGenerataedData(data.proposals);
        setGuessPlayerHint(data.message);
      } else if (data.role === "guess_player") {
        setGenerataedData(data.proposals);
        setHomePlayerHint(data.message);
      }
      setChoiceMadeId(data.choice);
      setCategory(data.category);
      setChoiceReceived(true);
    }
  });
  const sendChoiceOrGuess = () => {
    const choiceData = {
      gamesession_id: params.id,
      round_id: round?.id,
      message_hint: messagehint,
      player_choice: selectedCard,
      proposals: generatedData,
      role: "guess_player",
      player_id: guessPlayer
        ? guessPlayer.id
        : homePlayer
        ? homePlayer.id
        : undefined,
      category,
    };

    const guessData = {
      round_id: round?.id,
      choice_id: choiceMadeId ? choiceMadeId : "",
      player_guess: selectedCard,
      player_id: guessPlayer
        ? guessPlayer.id
        : homePlayer
        ? homePlayer.id
        : undefined,
      role: "guess_player",
      gamesession_id: params.id,
      category,
    };

    if (!choiceReceived) {
      console.log(choiceData);
      socket.emit("send_choice", choiceData);
    } else {
      console.log(guessData);
      socket.emit("send_guess", guessData);
    }
  };
  socket.on("myDM", (data: string | any[]) => {
    if (data.length) {
      console.log("my dm ", data);
      localStorage.setItem("myDM", JSON.stringify(data));
    }
  });
  const handleCopy = () => {
    toast.success("Copied!", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
  };
  socket.on("endGame", (data) => {
    console.log("endGame: ", data);
    if (data) {
      if (data.role === "home_player") {
        setHomeGuess(data.guess);
      } else if (data.role === "guess_player") {
        setGuessGuess(data.guess);
      }
      if (data.gameState === "END") alert("the game is finish! retry...");
      setGame(data.game);
    }
  });

  const result = (str1: string, str2: string) => {
    if (selectedCard !== "?" && guessGuess !== "?")
      return selectedCard === guessGuess;
  };

  return (
    <main className="flex mobile:max-sm:flex-col-reverse relative  justify-between bg-bgGray mobile:max-sm:h-auto bigScreen:h-[calc(100vh-50px)] h-[calc(100vh-49px)] ">
      {/* ############ GAME AREA ########### */}
      <div className="py-4 px-8 w-full mobile:max-sm:px-2 mobile:max-sm:h-[calc(100vh-180px)] flex flex-col gap-5">
        <div className=" flex justify-between w-full">
          <div className="flex gap-2 mobile:max-sm:h-[4rem] ">
            <select
              name="Type"
              defaultValue="Words"
              id=""
              className="border-themecolor rounded px-2 cursor-pointer outline-none text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0 w-[7rem] duration-300"
              // value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option
                className="hover:bg-themecolor p-2 focus:bg-themecolor hover:text-white"
                value="Words"
              >
                Words
              </option>
              <option value="Images">Images</option>
            </select>

            {/* <select
 name="Type"
 defaultValue="cards"
 id=""
 className="border-themecolor rounded px-2 cursor-pointer outline-none text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0 w-[7rem] duration-300"
 >
 <option value="cards">cards</option>
 <option value="animals">animals</option>
 <option value="food">food</option>
 <option value="cars">cars</option>
 <option value="people">people</option>
 <option value="birds">birds</option>
 </select> */}

            <select
              name="Number"
              defaultValue="5"
              id=""
              className="border-themecolor rounded px-2 cursor-pointer outline-none text-themecolor border w-[4rem] duration-300"
              // value={numberOfOptions}
              onChange={(e) => setNumberOfOptions(+e.target.value)}
            >
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div>
            <button
              // onClick={handleGenerate}
              className=" border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2"
            >
              Clear
            </button>{" "}
            <button
              onClick={handleGenerate}
              className=" border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2"
            >
              🃏 Generate
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col justify-center items-center w-fit">
            <Card
              image={selectedCard}
              text={selectedCard}
              className={"w-[80px] h-[80px]"}
              category={category}
            />
            <span className=" w-fit">
              {homePlayer?.username?.split(" ")[0] ?? "You"}
            </span>
          </div>

          <div className="flex gap-3 items-center justify-center">
            <Copy
              gameUrl={gameUrl}
              handleCopy={handleCopy}
              image={selectedCard}
            />
            {result(selectedCard, guessGuess) ? (
              <span>
                {/* <FaCheck size={50} className="text-green-800 w-full mx-auto" /> */}
                <FcCloseUpMode
                  size={50}
                  className="text-green-800 w-full mx-auto"
                />{" "}
              </span>
            ) : (
              <GrClose size={50} className="text-red-800 w-full mx-auto" />
            )}
          </div>

          <div className="flex flex-col justify-center items-center">
            <Card
              image={guessGuess}
              text={guessGuess}
              className={"w-[80px] h-[80px] "}
              category={category}
            />
            <span>{guessPlayer?.username?.split(" ")[0] ?? "Guess"}</span>
          </div>
        </div>
        {/* ###### Cards section ##### */}
        <div className="w-full flex items-center justify-center gap-2 p-2 flex-wrap h-[40vh] bigScreen:h-[60vh] rounded border border-themecolor">
          {generatedData.map((data, index) => (
            <Card
              key={index}
              image={data}
              text={data}
              onClick={() => setSelectedCard(data)}
              className="w-[100px] h-[100px] bigScreen:w-[250px] bigScreen:h-[250px]"
              category={category}
            />
          ))}
        </div>
        {/* ###### Cards section ##### */}
        <div className=" my-2 py-2 mx-auto">
          {homePlayer ? guessPlayerHint : guessPlayer ? homeplayerHint : null}
        </div>
        <textarea
          className="h-[10vh] outline-none border border-gray-300 p-2 text-xs"
          placeholder="enter a hint message..."
          value={messagehint}
          onChange={(e) => setMessageHint(e.target.value)}
        />
        <button
          className="bg-themecolor text-white p-2 cursor-pointer"
          onClick={sendChoiceOrGuess}
        >
          Play
        </button>
      </div>

      {/* ############ GAME AREA ########### */}

      <div className="bg-white flex flex-col w-[240px] mobile:max-sm:w-full shadow-md h-full px-2 py-4 gap-5">
        <Scores
          homePlayer={homePlayer}
          guessPlayer={guessPlayer}
          score={score}
        />
        <div className="flex border border-themecolor rounded-[5px] p-2 justify-center gap-4 font-extrabold text-themecolor">
          <span>{`${round?.round_number ? round?.round_number : 1}/5`}</span>
          <span>Rounds</span>
        </div>

        <button
          className=" border mobile:max-sm:hidden bg-themecolor text-white p-2"
          onClick={() => {
            console.log("build insight page");
          }}
        >
          insights
        </button>
      </div>
      {isGameOver && (
        <div
          style={{
            backgroundImage:
              "url(https://png2.cleanpng.com/sh/932b0a95c4c25dc288841e425028b56e/L0KzQYm3U8AzN5p6iZH0aYP2gLBuTgJmbF5qhuhubHBzdX7qjPlxNZJ3jJ9CaX7xebBuTgJmbF53edt3LUXkSYrtVsdmOWM4T9UDLka0SIa5UcQ0OWY3SKI8OUW4QIGAVMYveJ9s/kisspng-red-envelope-clip-art-winning-red-rain-5a99f67e1237c8.6185214315200395500746.png)",
          }}
          className="absolute z-40 h-full w-full mobile:max-sm:w-[80vw] bg-white "
        >
          <div className="flex flex flex-col justify-center items-center w-full h-full">
            {IsWinner && (
              <Popups
                title={"CONGRATULATIONS"}
                content={"you won 🌞👏👏👏"}
                actionText={"NEW GAME"}
                onCancel={() => setIsGameOver((prev) => !prev)}
                onAction={function (): void {
                  throw new Error("Function not implemented.");
                }}
                styles={"border rounded"}
                actionBTNStyle={"border text-themecolor"}
              />
            )}

            {!isLooser && (
              <Popups
                title={"GAME OVER"}
                content={"you loose "}
                actionText={"NEW GAME"}
                onCancel={() => setIsGameOver((prev) => !prev)}
                onAction={function (): void {
                  throw new Error("Function not implemented.");
                }}
                styles={"border rounded"}
                actionBTNStyle={"border text-themecolor"}
              />
            )}
          </div>
        </div>
      )}
      {!EndOfRound && (
        <>
          <Overlay onClick={() => setEndOfRound((prev) => !prev)} transparent />
          <Popups
            title={"Round end"}
            content={"you won"}
            actionText={"NEXT ROUND"}
            onCancel={() => setEndOfRound((prev) => !prev)}
            onAction={() => setEndOfRound((prev) => !prev)}
            styles={"bg-themecolor text-white"}
            actionBTNStyle={""}
          />
        </>
      )}
    </main>
  );
}
