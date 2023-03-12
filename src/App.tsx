import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";


const LOGOS = [
  "https://svgl.vercel.app/library/html5.svg",
  "https://svgl.vercel.app/library/css.svg",
  "https://svgl.vercel.app/library/javascript.svg",
  "https://svgl.vercel.app/library/react.svg",
  "https://svgl.vercel.app/library/vitejs.svg",
  "https://svgl.vercel.app/library/git.svg",
  "https://svgl.vercel.app/library/tailwindcss.svg",
  "https://svgl.vercel.app/library/typescript.svg",
  "https://svgl.vercel.app/library/vscode.svg",
  "https://svgl.vercel.app/library/github.svg",
]
  .flatMap((logo) => [`1|${logo}`, `2|${logo}`])
  .sort(() => Math.random() - 0.5);

function App() {
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [winner, setWinner] = useState(false);

  function updateBoard(e) {
    if (isSelected.length < 2) {
      setIsSelected(isSelected.concat(e));
    }
  }
  useEffect(() => {
    if (isSelected.length === 2) {
      if (isSelected[0].split("|")[1] === isSelected[1].split("|")[1]) {
        setGuessed((guessed) => guessed.concat(isSelected));
      }
      setTimeout(() => setIsSelected([]), 500);
    }
  }, [isSelected]);
  useEffect(() => {
    if (guessed.length === LOGOS.length) {
      setWinner(true);
      confetti();
    }
  });

  function Winner() {
    return (
      <button
        className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring active:text-white rounded-full "
        onClick={() => location.reload()}
      >
        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-white transition-transform group-hover:translate-y-0 group-hover:translate-x-0 rounded-full"></span>

        <span className="relative block border border-current bg-slate-900 text-white px-8 py-3 rounded-full ">
          Reset Game
        </span>
      </button>
    );
  }

  return (
    <div className="App flex justify-center flex-wrap items-center h-[100vh] w-[95%] mx-auto py-5">
      <div className="w-[100%] flex justify-center  items-center">
        <h1 className="font-extrabold text-white text-4xl ">MEMORY GAME</h1>
      </div>

      <div className="grid grid-cols-5 grid-rows-4 sm:w-[85%] md:w-[600px] md:h-[80%] w-[100%] h-[60%] ">
        {LOGOS.map((e, i) => {
          const [, url] = e.split("|");
          return (
            <article
              className=" w-[65px] h-[70px] sm:w-[100px] sm:h-[100px] text-center flex justify-center items-center  rounded-lg border border-gray-100 p-4 shadow-sm transition hover:shadow-lg hover:border-[#646cff] dark:border-gray-800 dark:shadow-gray-700/25 cursor-pointer 
              "
              key={i}
              onClick={() => updateBoard(e)}
              style={{ pointerEvents: isSelected.includes(e) ? "none" : "all" }}
            >
              {isSelected.includes(e) || guessed.includes(e) ? (
                <img src={url} alt="" />
              ) : (
                <img
                  src="https://icongr.am/octicons/question.svg?size=128&color=ffffff"
                  alt=""
                  className="w-[100%]"
                />
              )}
            </article>
          );
        })}
      </div>
      <div className="w-[100%] flex justify-center  items-center">
        {winner ? <Winner /> : ""}
      </div>
    </div>
  );
}

export default App;
