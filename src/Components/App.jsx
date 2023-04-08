import { useContext, useEffect, useState } from "react";
import json from "../wordsList.json";
import { GameInfo } from "./GameInfo";
import { BsCheck } from "react-icons/bs";
import { Leaderboard } from "./Leaderboard";
import { SaveContext } from "./context/SaveContext";

export default function App() {
  const [stats, setStats] = useState({
    tries: 0,
    correct: 0,
    wrong: 0,
    score: 0,
    total: 0,
  });

  const [end, setEnd] = useState({
    win: false,
    lose: false,
  });

  const [options, setOptions] = useState({
    playerName: "Unknown",
    word_to_guess: "",
    hidden_word: "",
    difficulty: "",
  });

  const [confirmed, setConfirmed] = useState(false);
  const [input, setInput] = useState("");
  const [displayLeaderboard, setDisplayLeaderboard] = useState(false);

  const { saves, saveGame, clearSaves } = useContext(SaveContext);

  // Save locally in browser when game has ended
  useEffect(() => {
    if (end.win || end.lose) {
      saveGame({
        pseudo: options.playerName,
        date: new Date()
          .toISOString()
          .split("T")
          .map((v) => (v.includes(".") ? v.substring(0, v.indexOf(".")) : v))
          .join(", "),
        word: options.word_to_guess,
        try_count: stats.tries,
        correct: stats.correct,
        wrong: stats.wrong,
        is_found: end.win ? "Yes" : "No",
        total_score: stats.total,
      });
    }
  }, [end]);

  useEffect(() => {
    // If hidden word = word to guess then we win
    if (options.hidden_word.localeCompare(options.word_to_guess) === 0) {
      setEnd((prev) => ({ ...prev, win: true }));
    }
    // Too many errors will cause player to lose
    if (stats.wrong === 5) {
      setEnd((prev) => ({ ...prev, lose: true }));
    }
  }, [options, stats]);

  const confirmChoice = () => {
    if (Object.keys(json).includes(options.difficulty)) {
      // Select randomly one word in JSON file
      // and have its copy transformed to _ characters
      const list = json[options.difficulty];
      const random_word = list[Math.floor(Math.random() * list.length)];
      // Turn string into array and turn each value into '_'
      // and then join blank character to each value by using join()
      setOptions((prev) => ({
        ...prev,
        word_to_guess: random_word,
        hidden_word: [...random_word].map((_) => "_").join(""),
      }));
      setConfirmed(true);
    }
  };

  // When Enter key is pressed we confirm input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setInput(input);
      inputValidation();
      setInput("");
    }
  };

  const inputValidation = () => {
    // Already typed before
    if (options.hidden_word.includes(input)) {
      alert(`${input} already typed !`);
      return;
    }
    // Increasing tries field after if condition in order to be fair
    setStats((prev) => ({ ...prev, tries: stats.tries + 1 }));
    // Update hidden word field by replacing one or many same characters by input
    // if input character is in the word to guess
    if (options.word_to_guess.includes(input)) {
      setOptions((prev) => ({
        ...prev,
        hidden_word: [...options.word_to_guess]
          .map((char) => {
            if (char === input || options.hidden_word.includes(v)) return v;
            return "_";
          })
          .join(""),
      }));
      // Debug
      console.log(options);
      // Update stats
      setStats((prev) => ({
        ...prev,
        correct: stats.correct + 1,
        score: stats.score + 1,
      }));
    } else {
      setStats((prev) => ({
        ...prev,
        correct: stats.wrong + 1,
        score: stats.score - 1,
      }));
    }
  };

  // When game finishes all states and inputs are reset
  const reset = () => {
    setStats({
      tries: 0,
      correct: 0,
      wrong: 0,
      score: 0,
      total: 0,
    });

    setEnd({
      win: false,
      lose: false,
    });

    setOptions({
      playerName: "Unknown",
      word_to_guess: "",
      hidden_word: "",
      difficulty: "",
    });

    setConfirmed(false);
  };

  // End game message
  const endMessage = () => {
    if (end.win) {
      return (
        <>
          <p className="uppercase text-center text-white bold text-2xl">
            CONGRATS ! You have found the word : {options.word_to_guess}
          </p>
        </>
      );
    }

    if (end.lose) {
      return (
        <>
          <p className="uppercase text-center text-white bold text-2xl">
            GAME OVER ! The word was : {options.word_to_guess}
          </p>
        </>
      );
    }

    return null;
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
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, playerName: e.target.value }))
            }
          />
          <select
            value={options.difficulty}
            disabled={confirmed}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, difficulty: e.target.value }))
            }
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
          disabled={confirmed || end.win || end.lose}
        >
          <BsCheck
            style={{
              fontSize: "20px",
              color: "green",
            }}
          />
        </button>
      </div>

      {options.hidden_word !== "" ? (
        <div>
          <div>
            <div className="flex flex-col items-center mt-10">
              <div className="flex flex-row space-x-5">
                <div className="bg-white w-fit h-fit rounded-lg flex flex-row tracking-widest space-x-5 content-center">
                  {[...options.hidden_word].map((v) =>
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
                    length={options.hidden_word.length}
                    tryCount={stats.tries}
                    correct={stats.correct}
                    wrong={stats.wrong}
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
                  onChange={(e) => setInput(e.target.value.toLowerCase())}
                  onKeyDown={handleKeyDown}
                  value={input}
                  disabled={end.win || end.lose}
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
