import React from "react";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectHistory,
  setShow

}) => {
  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all recent history?")) {
      localStorage.removeItem("history");
      setRecentHistory([]);
    }
  };

  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    history = history.filter((item) => item !== selectedItem);
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <>
      <div className="w-40 sm:w-70 dark:bg-zinc-800  bg-red-100 h-full pt-5">
        <div className="flex justify-between p-4">
          <div className="mr-2">
            <h1 className="sm:text-xl text-lg dark:text-white mb-4 flex justify-center  text-zinc-800">
              <span>Recent Search</span>
              <button className="cursor-pointer ml-2 h-6 bg-zinc-600" onClick={clearHistory}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
               
                  viewBox="0 -960 960 960"
                 
                  fill="#e3e3e3"
                  className="sm:w-25 sm:h-25 w-5 "
                >
                  <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                </svg>
              </button>
            </h1>
          </div>
          <div>
            <button className="cursor-pointer bg-zinc-500" onClick={()=>setShow(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-dark sm:h-[75vh] h-[65vh]">
          <ul className="text-left ">
            {recentHistory &&
              recentHistory.map((item, index) => (
                <div className="flex justify-between pr-2 py-1">
                  <li
                    key={index}
                    onClick={() => setSelectHistory(item)}
                    className="p-1 pl-5 w-full truncate dark:text-zinc-400  text-zinc-700  cursor-pointer dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-red-200 hover:text-zinc-800"
                  >
                    {item}
                  </li>
                  <button
                    className="cursor-pointer hover:bg-zinc-900 bg-zinc-700"
                    onClick={() => clearSelectedHistory(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="20px"
                      viewBox="0 -960 960 960"
                      width="20px"
                      fill="#e3e3e3"
                    >
                      <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                    </svg>
                  </button>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecentSearch;
