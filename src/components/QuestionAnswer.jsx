import React from "react";
import Answers from "./Answers";
const QuestionAnswer = ({ item, index }) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            className="text-right p-1 border-8 dark:border-zinc-700 dark:bg-zinc-700 bg-red-100 border-red-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit m-5 "
            key={index + Math.random()}
          >
            <Answers
              ans={item.text}
              index={index}
              totalResults={1}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li className="text-left p-1 " key={index + Math.random()}>
              <Answers
                ans={ansItem}
                index={ansIndex}
                totalResults={item.text.length}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionAnswer;
