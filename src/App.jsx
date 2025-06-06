import { useEffect, useRef, useState } from "react";
import { URL } from "./constants";
import Answers from "./components/Answers";
import RecentSearch from "./components/RecentSearch";
import QuestionAnswer from "./components/QuestionAnswer";

function App() {
  const [questions, setQuestions] = useState("");
  const [results, setResults] = useState([]);
  const scrollToAns = useRef();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );

  const [selectHistory, setSelectHistory] = useState("");

  const askQuestions = async () => {
    const trimmedQuestion = questions.trim();
    if (!trimmedQuestion && !selectHistory) return;

    const payloadData = trimmedQuestion || selectHistory;

    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };

    if (trimmedQuestion) {
      let history = JSON.parse(localStorage.getItem("history")) || [];

      const normalizedHistory = history.map((item) =>
        item.trim().toLowerCase()
      );
      const normalizedNewQuestion = trimmedQuestion.trim().toLowerCase();

      const filteredHistory = normalizedHistory.filter(
        (item) => item !== normalizedNewQuestion
      );

      filteredHistory.unshift(normalizedNewQuestion);

      const limitedHistory = filteredHistory.slice(0, 20);

      const displayHistory = limitedHistory.map(
        (item) => item.charAt(0).toUpperCase() + item.slice(1)
      );

      localStorage.setItem("history", JSON.stringify(displayHistory));
      setRecentHistory(displayHistory);
    }

    setLoading(true);
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    let dataString = data.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ").map((item) => item.trim());

    setResults((prevResults) => [
      ...prevResults,
      { type: "q", text: trimmedQuestion || selectHistory },
      { type: "a", text: dataString },
    ]);

    setQuestions("");
    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);

    setLoading(false);
  };

  useEffect(() => {
    if (selectHistory) askQuestions();
  }, [selectHistory]);

  const [darkMode, setDarkMode] = useState("dark");

  useEffect(() => {
    if (darkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen">
      <div className="flex sm:flex-row h-screen sm:text-center ">
        {show ? (
          <div>
            <div className="fixed sm:bottom-5 bottom-56">
              <select
                onChange={(e) => setDarkMode(e.target.value)}
                className=" dark:text-white text-zinc-800 left-5 p-3 z-50"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
            <RecentSearch
              recentHistory={recentHistory}
              setRecentHistory={setRecentHistory}
              setSelectHistory={setSelectHistory}
              setShow={setShow}
            />
          </div>
        ) : (
          <div className="p-4 m-4">
            <button
              className="cursor-pointer bg-zinc-500 dark:bg-zinc-900"
              onClick={() => setShow(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="28px"
                viewBox="0 -960 960 960"
                width="28px"
                fill="#e3e3e3"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </button>
          </div>
        )}

        <div className="flex-1 p-4 md:p-5 w-full">
          <div>
            <h1 className="text-2xl  sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 p-3 sm:text-center ">
              Hello User, Ask me Anything
            </h1>

            {loading && (
              <div role="status" className="my-4 text-center">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>

          <div
            ref={scrollToAns}
            className="h-[60vh] sm:h-[73vh] overflow-y-auto scrollbar-dark dark:bg-zinc-900 bg-amber-100 rounded-lg dark:text-zinc-300 text-zinc-800 p-4"
          >
            <ul>
              {results.map((item, index) => (
                <QuestionAnswer key={index} item={item} index={index} />
              ))}
            </ul>
          </div>

          <div className="dark:bg-zinc-800 bg-red-100 sm:mx-auto sm:w-96 w-56 mr-10 p-1 mt-4 pr-5 rounded-4xl border border-zinc-800 flex h-16 dark:text-white text-zinc-800">
            <input
              type="text"
              placeholder="Ask Me Anything"
              className="sm:w-full sm:h-full p-3 outline-none w-40"
              onChange={(e) => setQuestions(e.target.value)}
              value={questions}
              onKeyDown={(e) => e.key === "Enter" && askQuestions()}
            />
            <button
              className="cursor-pointer sm:px-4 pl-5"
              onClick={askQuestions}
            >
              Ask
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
