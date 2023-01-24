import { useEffect, useState } from "react";
import json from "../../random_words.json";
import GameInfo from "./GameInfo";
import { BsCheck } from "react-icons/bs";
import Leaderboard from "./Leaderboard";

export default function App() {
  const [option, setOption] = useState("");
  const [word, setWord] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [player, setPlayer] = useState("");
  const [score, setScore] = useState(0);
  const [hidden, setHidden] = useState("");
  const [input, setInput] = useState("");
  const [tryCount, setTryCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [saves, setSaves] = useState([]);
  const [save, setSave] = useState({});
  const [displayLeaderboard, setDisplayLeaderboard] = useState(false);

  // Fetch data in URL
  const fetchSaves = () => {
    fetch("http://localhost:5173/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setSaves(res.saves))
      .catch((err) => console.log(err));
  };

  // When fetching this url, a new document is inserted to DB and the result of this operation is sent
  const createSave = (data) => {
    fetch("http://localhost:5173/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => setSave(res))
      .catch((err) => console.log(err));
  };

  // Fetch data only when existing in DB
  useEffect(() => {
    if (save.status === 200) fetchSaves();
  }, [save]);

  // If end game then a document is created in DB
  useEffect(() => {
    if (isWin)
      createSave({
        pseudo: player !== "" ? player : "Unknown",
        date: new Date()
          .toISOString()
          .split("T")
          .map((v) => (v.includes(".") ? v.substring(0, v.indexOf(".")) : v))
          .join(", "),
        word: word,
        try_count: tryCount,
        correct: correctCount,
        wrong: errorCount,
        is_found: "Yes",
        score: score + correctCount + word.length - errorCount + 5, // bonus win
      });
    if (gameOver)
      createSave({
        pseudo: player !== "" ? player : "Unknown",
        date: new Date()
          .toISOString()
          .split("T")
          .map((v) => (v.includes(".") ? v.substring(0, v.indexOf(".")) : v))
          .join(", "),
        word: word,
        try_count: tryCount,
        correct: correctCount,
        wrong: errorCount,
        is_found: "No",
        score: score + correctCount + word.length - errorCount, // no +5 points when lost
      });
  }, [isWin, gameOver]);

  // If hidden = word then win
  // If error count is equals to 3 then this is a lose
  useEffect(() => {
    if (hidden.localeCompare(word) === 0) setIsWin((prev) => !prev);
    if (errorCount === 5) setGameOver((prev) => !prev);
    console.log(hidden, word);
  }, [hidden, errorCount]);

  // Set state when option is selected
  const handleSelect = (e) => {
    setOption(e.target.value);
  };

  // When option is selected, a reading in a json file is made for retrieving data as list
  // One item is randomly selected in this list
  // Hidden word has the same length than word so we can just replace each character by '-'
  const confirmChoice = () => {
    if (option !== "") {
      const array = json[option];
      const w = array[Math.floor(Math.random() * array.length)];
      setWord(w);
      setHidden([...w].map((_) => "_").join(""));
      setConfirmed(true);
    }
  };

  // When Enter key is pressed we confirm input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setInput(input);
      inputValidation();
    }
  };

  // Set state when input has occured
  const handleTextChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  // Validate input and say whether it's wrong or not
  // If user types an input that was correct previously an alert will be displayed
  const inputValidation = () => {
    if (hidden.includes(input)) {
      alert(`${input} already typed !`);
      return;
    }
    setTryCount((prev) => prev + 1);
    if (word.includes(input)) {
      setHidden((prev) =>
        [...word]
          .map((v) => {
            if (v === input || prev.includes(v)) return v;
            return "_";
          })
          .join("")
      );
      console.log(word, hidden);
      setCorrectCount((prev) => prev + 1);
      setScore((prev) => prev + 1);
    } else {
      setErrorCount((prev) => prev + 1);
      setScore((prev) => prev - 1);
    }
  };

  // When game finishes all states and inputs are reset
  const reset = () => {
    setScore(0);
    setTryCount(0);
    setErrorCount(0);
    setCorrectCount(0);

    if (isWin) setIsWin((prev) => !prev);
    if (gameOver) setGameOver((prev) => !prev);
    setHidden("");
    setConfirmed(false);
  };

  // End game message
  const endMessage = () => {
    const message = isWin ? (
      <p className="uppercase text-center text-white bold text-2xl">
        CONGRATS ! You have found the word : {word}
      </p>
    ) : gameOver ? (
      <p className="uppercase text-center text-white bold text-2xl">
        GAME OVER ! The word was : {word}
      </p>
    ) : null;

    return <>{message}</>;
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col w-fit self-center mx-auto drop-shadow-2xl mt-10 justify-center">
        <h1 className="text-2xl font-bold text-center uppercase px-5  bg-white rounded-lg">
          Hangman
        </h1>
        <button
          className="bg-purple-500 hover:bg-purple-700 rounded-lg py-1 px-2 text-white self-center"
          onClick={() => setDisplayLeaderboard((prev) => !prev)}
        >
          Leaderboard
        </button>
      </div>

      <div className="flex flex-row place-content-center mt-10">
        <div className="w-fit px-2 align-center drop-shadow-2xl">
          <input
            className="w-min rounded-lg text-center mr-5 uppercase"
            placeholder="Type your pseudo"
            maxLength="10"
            type="text"
            onChange={(e) => setPlayer(e.target.value)}
          />
          <select
            disabled={confirmed}
            onChange={handleSelect}
            className="h-full bg-white rounded-lg text-center uppercase focus:outline-none"
          >
            <option className="" value={""}>
              -- Choose a size --
            </option>
            <option className="" value={"short"}>
              Short
            </option>
            <option className="" value={"medium"}>
              Medium
            </option>
            <option className="" value={"long"}>
              Long
            </option>
          </select>
        </div>
        <button
          className="text-center bg-white w-fit px-2 align-center rounded-full drop-shadow-2xl"
          type="submit"
          onClick={confirmChoice}
          disabled={confirmed || isWin || gameOver}
        >
          <BsCheck
            style={{
              fontSize: "20px",
              color: "green",
            }}
          />
        </button>
      </div>

      {hidden !== "" ? (
        <div>
          <div>
            <div className="flex flex-col items-center mt-10">
              <div className="flex flex-row space-x-5">
                <div className="bg-white w-fit h-fit rounded-lg flex flex-row tracking-widest space-x-5 content-center">
                  {[...hidden].map((v) =>
                    v !== "_" ? (
                      <p className="text-5xl uppercase underline underline-offset-8 mb-5 py-2 px-4">
                        {v}
                      </p>
                    ) : (
                      <p className="text-5xl uppercase mb-5 py-2 px-4">{v}</p>
                    )
                  )}
                </div>
                <div className="bg-white self-center w-fit h-fit rounded-lg align-top py-2 px-4">
                  <GameInfo
                    length={hidden.length}
                    tryCount={tryCount}
                    correct={correctCount}
                    wrong={errorCount}
                  />
                </div>
              </div>

              <div className="mt-10">{endMessage()}</div>

              <div className="flex flex-row mt-10 space-x-3">
                <input
                  className="w-min rounded-lg text-center uppercase"
                  placeholder="Type one character"
                  type="text"
                  maxLength="1"
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                  disabled={isWin || gameOver}
                />
                <button
                  className="bg-purple-500 hover:bg-purple-700 rounded-lg py-1 px-2 text-white"
                  onClick={reset}
                >
                  Play again
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {displayLeaderboard ? (
        <Leaderboard rows={saves.sort((a, b) => b.score - a.score)} />
      ) : null}
    </div>
  );
}
