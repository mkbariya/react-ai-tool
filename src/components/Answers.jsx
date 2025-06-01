import React, { useEffect, useState } from "react";
import { checkHeading, replaceHeadingStarts } from "../helper";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";

// Utility to sanitize code block language declarations
const sanitizeCodeBlocks = (markdown) => {
  return markdown.replace(/```(\w+)(\s+[^`\n]*)?\n/g, "```$1\n");
};

const Answers = ({ ans, index, totalResults, type }) => {
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(() => {
    if (checkHeading(ans)) {
      setHeading(true);
      setAnswer(replaceHeadingStarts(ans));
    } else {
      setAnswer(sanitizeCodeBlocks(ans));
    }
  }, []);

  const renderer = {
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          language={match[1]}
          style={dark}
          PreTag="div"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      {index === 0 && totalResults > 1 ? (
        <span className="pt-4 text-xl block dark:text-white text-zinc-950">
          {answer}
        </span>
      ) : heading ? (
        <span className="pt-4 block text-lg dark:text-white text-zinc-950">
          {answer}
        </span>
      ) : (
        <span className={type === "q" ? "pl-1 " : "pl-5"}>
          <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default Answers;
