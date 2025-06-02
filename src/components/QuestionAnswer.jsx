import React from "react";
import Answers from "./Answers";

const QuestionAnswer = ({ item, index }) => {
  if (item.type === "q") {
    return (
      <div className="flex justify-end">
        <li
          className="text-right text-sm p-1 border-8 dark:border-zinc-700 dark:bg-zinc-700 bg-red-100 border-red-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit m-5"
          key={`q-${index}`}
        >
          <Answers
            ans={item.text}
            index={index}
            totalResults={1}
            type="q"
          />
        </li>
      </div>
    );
  }

  return (
    <div>
      {item.text.map((ansItem, ansIndex) => (
        <li className="text-left p-1" key={`a-${index}-${ansIndex}`}>
          <Answers
            ans={ansItem}
            index={ansIndex}
            totalResults={item.text.length}
            type="a"
          />
        </li>
      ))}
    </div>
  );
};

export default React.memo(QuestionAnswer);
