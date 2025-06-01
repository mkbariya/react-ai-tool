import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { checkHeading, replaceHeadingStarts } from "../helper";

const sanitizeCodeBlocks = (markdown) => {
  return markdown.replace(/```(\w+)(\s+[^`\n]*)?\n/g, "```$1\n");
};

const Answers = ({ ans, index, totalResults, type }) => {
  const isHeading = checkHeading(ans);
  const formattedAns = isHeading ? replaceHeadingStarts(ans) : sanitizeCodeBlocks(ans);

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
          {formattedAns}
        </span>
      ) : isHeading ? (
        <span className="pt-4 block text-lg dark:text-white text-zinc-950">
          {formattedAns}
        </span>
      ) : (
        <span className={type === "q" ? "pl-1" : "pl-5"}>
          <ReactMarkdown components={renderer}>{formattedAns}</ReactMarkdown>
        </span>
      )}
    </>
  );
};

export default React.memo(Answers);
