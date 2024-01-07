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
import {
  arrObjectToObjectOfObject,
  socket,
  subdivideArr,
} from "@/utils/service/constant";
import { api_call } from "@/utils/service/constant";
import { useParams, useRouter } from "next/navigation";

import { public_call } from "@/utils/service/constant";
import { useAppContext } from "@/app/Context/AppContext";
import Copy from "@/components/Copy";

import Popups from "@/components/atoms/Popups";
import Overlay from "@/components/atoms/Overlay";
import { Socket } from "socket.io-client";
import CardGuess from "@/components/atoms/CardGuess";
import { RiRoundedCorner } from "react-icons/ri";
import RoundLoader from "@/components/atoms/RoundLoader";
import Statistics from "@/components/organisms/Insights/Statistcs";

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
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("guess_player") !== "undefined" &&
      localStorage.getItem("guess_player")
    ) {
      return JSON.parse(localStorage.getItem("guess_player") || "{}");
    } else return null;
  });
  const [round, setRound] = useState<Round>();
  const [conClose, setconClose] = useState<boolean>(false);
  const [constatus, setConStatus] = useState<string>("");
  const [playerChoice, setPlayerChoice] = useState<string>("");
  const [guessGuess, setGuessGuess] = useState<string>("?");
  const [generateStatus, setGenerateStatus] = useState<string>("");
  const [category, setCategory] = useState<string>("words");
  const [numberOfOptions, setNumberOfOptions] = useState<number>(5);
  const [generate, setGenerate] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [messagehint, setMessageHint] = useState<string>("");
  const [gameUrl, setGameUrl] = useState<string>("");
  const [choiceReceived, setChoiceReceived] = useState<boolean>(false);
  const [guessReceived, setGuessReceived] = useState<boolean>(false);
  const [game, setGame] = useState<GameSession>();
  const [role, setRole] = useState<string>((): any => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("status")) {
      return localStorage.getItem("status");
    }
  });
  const [choiceMadeId, setChoiceMadeId] = useState<string>("");
  const { setCurrentGame, currentGame, isguess, setIsGuess } = useAppContext();
  const params = useParams();
  const [IsWinner, setwinner] = useState(false);
  const [isLooser, setIsLooser] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [EndOfRound, setEndOfRound] = useState(false);
  const [roundCounter, setRoundCounter] = useState<number>(0);
  const [whoPlays, setWhoPlays] = useState<string>("");
  const [stats, setStats] = useState<StatType[]>([]);
  // const [home_player_sending, setHome_player_Sending] = useState<string>("");
  const [guess_player_sending, setGuess_player_Sending] = useState<string>("");

  useEffect(() => {
    if (
      !homePlayer?.id ||
      homePlayer === undefined ||
      !Object?.keys(homePlayer).length
    ) {
      setCurrentGame(params.id as string);
      setIsGuess(true);
      return router.push("/verification");
    }

    if (!currentGame) setGameUrl(`${public_call}/dashboard/${params.id}`);

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
    socket.on("connection", () => {
      setConStatus("🟢 link open ");
      setconClose(false);
      console.log("socket connected successfully");
    });

    socket.on("error", (err: Error) => {
      console.log("error", err);
    });
    let setTime: any;
    socket.on("disconnect", () => {
      console.log("close");
      setconClose(true);
      setGenerateStatus("🔴 link close. retrying...");
      setTime = setTimeout(() => socket.connect(), 100);
    });
    return () => clearTimeout(setTime);
  }, [
    homePlayer?.id,
    setCurrentGame,
    setIsGuess,
    params,
    homePlayer,
    router,
    isguess,
    currentGame,
  ]);

  socket.on("round", (data) => {
    if (data) {
      setGenerate(false);
      setRound(data.round);
      if (data.proposals.length) setGenerataedData(data.proposals);
      else {
        setGenerateStatus("No data generated by the server. try again");
      }
    }
  });

  console.log("first: ", stats);

  socket.on("sending", (data) => {
    if (data && data.player_id == guessPlayer?.id) {
      setGuess_player_Sending(data.text);
    }
  });

  socket.on("notify", (data) => {
    if (data) {
      // console.log("notify: ", data);
      if (data.guessPlayer) {
        handleCopy("Guess player connected");
        // console.log("guess player connected: ", data);
        if (data.homePlayer.id === homePlayer.id) {
          console.log("i am the home player");
          localStorage.setItem(
            "guess_player",
            JSON.stringify(data.guessPlayer)
          );
          setGuessPlayer(data.guessPlayer);
          setRole("home_player");
          localStorage.setItem("status", "home_player");
          localStorage.setItem(
            "conStatus",
            data.notify + " guess_player connected"
          );
        } else {
          localStorage.setItem("home_player", JSON.stringify(data.guessPlayer));
          setHomePlayer(data.guessPlayer);
          localStorage.setItem("guess_player", JSON.stringify(data.homePlayer));
          setGuessPlayer(data.homePlayer);
          setRole("guess_player");
          localStorage.setItem("status", "guess_player");
          localStorage.setItem(
            "conStatus",
            data.notify + " home_player connected"
          );
        }
      }
    }
  });
  // console.log(role);
  const handleGenerate = () => {
    setGenerate(true);
    const data = {
      home_player_id: homePlayer.id,
      gamesession_id: params.id,
      category,
      number_of_proposals: numberOfOptions,
      round_number: round && roundCounter === 2 ? round?.round_number + 1 : 1,
      // round_number: 5,
    };

    socket.emit("generate", data);
    if (roundCounter === 2) setRoundCounter(0);
    setGenerateStatus("");
  };

  socket.on("receive_guess", (data) => {
    if (data) {
      console.log("receive_guess: ", data);
      console.log("i am the one outside: ", data.role);
      if (data?.stats?.length) setStats(data.stats);
      if (data?.role === role) {
        setWhoPlays("home_player");
        setRoundCounter(2);
        setTimeout(() => setGuessGuess(playerChoice), 2000);
      } else {
        setTimeout(() => setGuessGuess(data.guess), 2000);
        setWhoPlays("guess_player");
        setGuessReceived(true);
        setGuess_player_Sending("");
      }
      setScore(data?.score);
      setCategory(data?.category);
    }
  });

  socket.on("receive_choice", (data) => {
    if (data) {
      console.log("receive_choice: ", data);

      if (data.role !== role) {
        setPlayerChoice(data.choiceData);
        setChoiceMadeId(data.choice);
        setChoiceReceived(true);
        setWhoPlays("home_player");
        setGuess_player_Sending("");
      } else {
        setRoundCounter(1);
        setWhoPlays("guess_player");
      }
      setRound(data.round);
      setGenerataedData(data.proposals);
      setCategory(data.category);
      setMessageHint(data.message);
    }
  });

  const sendChoiceOrGuess = () => {
    if (!role || !round || !homePlayer || !guessPlayer) {
      console.log(
        `" no round ${round} id or no role ${role} or no home player ${homePlayer} or no guess_player ${guessPlayer}`
      );
      return;
    }

    const choiceData = {
      gamesession_id: params.id,
      round: round,
      message_hint: messagehint,
      player_choice: selectedCard,
      proposals: generatedData,
      role: role,
      player_id: role === "home_player" ? homePlayer?.id : guessPlayer?.id,
      category,
    };

    const guessData = {
      round_id: round?.id,
      choice_id: choiceMadeId ? choiceMadeId : "",
      player_guess: selectedCard,
      player_id: role === "home_player" ? homePlayer?.id : guessPlayer?.id,
      role: role,
      gamesession_id: params.id,
      category,
    };

    if (choiceMadeId || choiceReceived) {
      console.log(guessData);

      socket.emit("send_guess", guessData);
      setChoiceMadeId("");
      // setGuessGuess(playerChoice);
      return setChoiceReceived(false);
    } else {
      console.log(choiceData);
      if (!choiceData.player_choice || !choiceData.proposals) {
        console.log(" no player choice or proposal");
        return;
      } else {
        socket.emit("send_choice", choiceData);

        setGuessGuess("");
        setTimeout(() => {
          setChoiceMadeId("");
          setPlayerChoice("");
        }, 1000);
      }
    }
  };
  socket.on("myDM", (data) => {
    if (data?.length) {
      // console.log("my dm ", data);
      localStorage.setItem("myDM", JSON.stringify(data));
    }
  });

  const handleCopy = (str: string) => {
    toast.success(str, {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 3000,
    });
    setCopied(true);
  };
  socket.on("endGame", (data) => {
    console.log("endGame: ", data);
    if (data) {
      if (data.role === "home_player") {
        setSelectedCard(data.guess);
      } else if (data.role === "guess_player") {
        setGuessGuess(data.guess);
      }
      if (data.gameState === "END") {
        setwinner(true);
      }
      setGame(data.game);
    }
  });

  const result = (str1: string, str2: string) => {
    if (
      (selectedCard !== "?" && guessGuess !== "?") ||
      (selectedCard && guessGuess && guessGuess === selectedCard)
    )
      return selectedCard === guessGuess;
    else if (choiceReceived || !generateStatus) return false;
  };

  const clearspace = () => {
    setSelectedCard("");
    setGuessGuess("");
    setGenerataedData([]);
    setGenerateStatus("");
    router.refresh();
  };

  if (game) return <Statistics data={stats} game={game} />;

  return (
    <main className="flex mobile:max-sm:flex-col-reverse relative  justify-between bg-bgGray mobile:max-sm:h-auto bigScreen:h-[calc(100vh-50px)] h-[calc(100vh-49px)] ">
      {/* ############ GAME AREA ########### */}
      <div className="py-4 px-8 w-full mobile:max-sm:px-2 mobile:max-sm:h-[calc(100vh-180px)] flex flex-col gap-5">
        <div className=" flex justify-between  w-full">
          <div className="flex gap-2 mobile:max-sm:h-[4rem] ">
            <select
              name="Type"
              defaultValue="Words"
              id="category"
              className="border rounded-md mobile:max-sm:w-[5rem] mobile:max-sm:px-0 w-[6rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2 m-2"
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

            <select
              name="Number"
              defaultValue="5"
              id="nomber"
              className="border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2 m-2"
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
          <div className=" mx-auto ">
            {conClose ? (
              <span className="text-xs text-red-700">{generateStatus} </span>
            ) : (
              <span className="text-xs text-green-700">{constatus} </span>
            )}
          </div>
          <div className=" flex items-center">
            {generate && <RoundLoader />}
            <button
              onClick={clearspace}
              className=" border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2 m-2"
            >
              Clear
            </button>
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
            {whoPlays === "home_player" ? (
              <span className=" text-themecolor">
                <span className="wave  text-[30px]">👇🏿</span>
                you play
              </span>
            ) : (
              ""
            )}
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
            {/* <Copy gameUrl={gameUrl} handleCopy={handleCopy} /> */}

            <section
              ref={(node) => {
                if (node) {
                  node.addEventListener("click", () => {
                    node.style.display = "none";
                  });
                }
              }}
              className={`${
                (currentGame || role == "guess_player" || guessPlayer?.id) &&
                "hidden"
              }`}
            >
              <CopyToClipboard text={gameUrl} onCopy={handleCopy}>
                <button
                  onClick={() => handleCopy("Copied!")}
                  className="flex gap-1  items-center p-2  text-green-600"
                >
                  <span className="text-green-600">
                    {gameUrl ? gameUrl : ""}
                  </span>
                </button>
              </CopyToClipboard>
            </section>

            <div className={`${copied ? "block" : "hidden"}`}>
              {result(selectedCard, guessGuess) ? (
                <span>
                  <FcCloseUpMode
                    size={50}
                    className="text-green-800 w-full mx-auto"
                  />
                </span>
              ) : (
                <GrClose size={50} className="text-red-800 w-full mx-auto" />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {whoPlays === "guess_player" ? (
              <span className=" text-themecolor">
                {" "}
                <span className="wave text-[30px]">👇🏿</span> turn to play
              </span>
            ) : (
              ""
            )}
            <CardGuess
              image={guessGuess}
              text={guessGuess}
              className={"w-[80px] h-[80px] "}
              category={category}
            />
            <span>{guessPlayer?.username?.split(" ")[0] ?? "Guess"}</span>
            <span>{guess_player_sending ? guess_player_sending : ""}</span>
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
          {/* {homePlayer ? guessPlayerHint : guessPlayer ? homeplayerHint : null} */}
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

        {/* <button
          className=" border mobile:max-sm:hidden bg-themecolor text-white p-2"
          onClick={() => {
            console.log("build insight page");
          }}
        >
          insights
        </button> */}
      </div>
      {isGameOver && (
        <div
          style={{
            backgroundImage:
              "url(https://png2.cleanpng.com/sh/932b0a95c4c25dc288841e425028b56e/L0KzQYm3U8AzN5p6iZH0aYP2gLBuTgJmbF5qhuhubHBzdX7qjPlxNZJ3jJ9CaX7xebBuTgJmbF53edt3LUXkSYrtVsdmOWM4T9UDLka0SIa5UcQ0OWY3SKI8OUW4QIGAVMYveJ9s/kisspng-red-envelope-clip-art-winning-red-rain-5a99f67e1237c8.6185214315200395500746.png)",
          }}
          className="absolute z-40 h-full w-full mobile:max-sm:w-[80vw] bg-white "
        >
          <div className="flex  flex-col justify-center items-center w-full h-full">
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
      {EndOfRound && (
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
