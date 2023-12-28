"use client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Card from "@/components/atoms/Card";
import Scores from "@/components/organisms/Scores";
import { SetStateAction, useEffect, useState } from "react";

// react icons
import { PiCopySimpleLight } from "react-icons/pi";
import { toast } from "react-toastify";
import { socket } from "@/utils/service/constant";
import { api_call } from "@/utils/service/constant";
import { useParams, useRouter } from "next/navigation";

import { public_call } from "@/utils/service/constant";
import { useAppContext } from "@/app/Context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Page() {
  const router = useRouter();
  const [generatedData, setGenerataedData] = useState<Array<string>>([]);
  const [selectedCard, setSelectedCard] = useState<string>("?");
  const [score, setScore] = useState<Score>();
  const [homePlayer, setHomePlayer] = useState<User>(() => {
    if (typeof localStorage !== "undefined") {
      // console.log("checking made in the entering homplayer");

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
      // console.log("checking made in the entering guessplayer");
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
    setGameUrl(`${public_call}/dashboard/${params.id}`);

    if (guessPlayer)
      socket.emit("joingame", {
        gamesession_id: params.id,
        playerId: homePlayer?.id,
      });
    socket.emit("myDM", {
      id: homePlayer?.id,
      gamesession_id: params.id,
    });
    localStorage.setItem("currentGameSession", JSON.stringify(params.id));
  }, [
    homePlayer?.id,
    guessPlayer,
    params,
    homePlayer,
    gameUrl,
    setCurrentGame,
    router,
  ]);

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
        } else if (data.role === "guess_player") {
          localStorage.setItem("home_player", JSON.stringify(data.guessPlayer));
          localStorage.setItem("guess_player", JSON.stringify(data.homePlayer));
        }
      }
    }
  });
  console.log(role);
  socket.on(
    "notify",
    (data: {
      guessPlayer: any;
      homePlayer: { id: string | undefined };
      role: SetStateAction<string>;
    }) => {
      if (data) {
        console.log("notify: ", data);
        if (data.guessPlayer) {
          console.log("guess player connected: ", data);
          if (data.homePlayer.id === homePlayer.id) {
            console.log("i am the home player");
            localStorage.setItem(
              "guess_player",
              JSON.stringify(data.guessPlayer)
            );
            setRole(data.role);
            localStorage.setItem("status", role);
          } else if (data.role === "guess_player") {
            localStorage.setItem(
              "home_player",
              JSON.stringify(data.guessPlayer)
            );
            localStorage.setItem(
              "guess_player",
              JSON.stringify(data.homePlayer)
            );
            setRole(data.role);
            localStorage.setItem("status", data.role);
          }
        }
      }
    }
  );

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
        setHomeGuess(data.guess);
      } else if (data.role === "guess_player") {
        setGuessGuess(data.guess);
      }
      setScore(data.score);
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
    }
    setChoiceReceived(true);
  });
  const sendChoiceOrGuess = () => {
    const choiceData = {
      gamesession_id: params.id,
      round_id: round?.id,
      message_hint: messagehint,
      player_choice: selectedCard,
      proposals: generatedData,
      role: localStorage.getItem("status") || "",
      player_id: guessPlayer
        ? guessPlayer.id
        : homePlayer
        ? homePlayer.id
        : undefined,
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
      role: localStorage.getItem("status") || "",
      gamesession_id: params.id,
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

  // console.log("guessPlayer", guessPlayer);
  // console.log("homePlayer", homePlayer);
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
              className="border-themecolor  rounded px-2 cursor-pointer outline-none   text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0   w-[7rem] duration-300"
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
              className="border-themecolor  rounded px-2 cursor-pointer outline-none   text-themecolor border mobile:max-sm:w-[5rem] mobile:max-sm:px-0   w-[7rem] duration-300"
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
              className="border-themecolor  rounded px-2 cursor-pointer outline-none   text-themecolor border  w-[4rem] duration-300"
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
          <button
            onClick={handleGenerate}
            className=" border rounded-md mobile:max-sm:h-[4rem] border-themecolor hover:bg-themecolor hover:text-white transition-all duration-300 text-themecolor p-2"
          >
            🃏 Generate
          </button>
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
            <CopyToClipboard text={gameUrl} onCopy={handleCopy}>
              <button
                // onClick={handleCopy}
                className="flex gap-1  items-center p-2  text-green-600"
              >
                <span className="text-green-600">
                  {gameUrl ? gameUrl : "link to share"}
                </span>
                <PiCopySimpleLight size={20} />
              </button>
            </CopyToClipboard>
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

      <div className="bg-white flex flex-col w-[240px] mobile:max-sm:w-full shadow-md  h-full px-2 py-4 gap-5">
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
    </main>
  );
}
