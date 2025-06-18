import React from "react";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

type Props = {
  message: DocumentData;
};

// Function to format AI text with markdown-like syntax
function formatAIText(text: string) {
  if (!text) return null;

  // Split text into lines for processing
  const lines = text.split("\n");

  return lines.map((line, index) => {
    // Handle headers (lines starting with #)
    if (line.startsWith("# ")) {
      return (
        <h1 key={index} className="text-2xl font-bold text-white mb-4 mt-2">
          {line.substring(2)}
        </h1>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2 key={index} className="text-xl font-semibold text-white mb-3 mt-2">
          {line.substring(3)}
        </h2>
      );
    }
    if (line.startsWith("### ")) {
      return (
        <h3 key={index} className="text-lg font-medium text-white mb-2 mt-2">
          {line.substring(4)}
        </h3>
      );
    }

    // Handle code blocks (lines starting with ```)
    if (line.startsWith("```")) {
      return (
        <div
          key={index}
          className="bg-gray-800 rounded-lg p-4 my-3 font-mono text-sm"
        >
          <code className="text-green-400">{line.substring(3)}</code>
        </div>
      );
    }

    // Handle inline code (text wrapped in `)
    if (line.includes("`")) {
      const parts = line.split("`");
      return (
        <p key={index} className="mb-2 leading-relaxed">
          {parts.map((part, partIndex) =>
            partIndex % 2 === 0 ? (
              <span key={partIndex}>{formatInlineText(part)}</span>
            ) : (
              <code
                key={partIndex}
                className="bg-gray-700 px-1 py-0.5 rounded text-green-400 font-mono text-sm"
              >
                {part}
              </code>
            )
          )}
        </p>
      );
    }

    // Handle bullet points
    if (line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <li key={index} className="ml-4 mb-1 leading-relaxed">
          {formatInlineText(line.substring(2))}
        </li>
      );
    }

    // Handle numbered lists
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={index} className="ml-4 mb-1 leading-relaxed">
          {formatInlineText(line.replace(/^\d+\.\s/, ""))}
        </li>
      );
    }

    // Handle empty lines
    if (line.trim() === "") {
      return <div key={index} className="h-2"></div>;
    }

    // Regular paragraph text
    return (
      <p key={index} className="mb-2 leading-relaxed">
        {formatInlineText(line)}
      </p>
    );
  });
}

// Function to format inline text (bold, italic, etc.)
function formatInlineText(text: string) {
  // Handle bold text (**text**)
  text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Handle italic text (*text*)
  text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Handle links [text](url)
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  return <span dangerouslySetInnerHTML={{ __html: text }} />;
}

function Message({ message }: Props) {
  const isAI = message.user.name == "Gemini";

  return (
    <div className={`py-5 text-white ${isAI && "bg-[#434654]"}`}>
      <div className="flex space-x-5 px-10 max-w-4xl mx-auto">
        {message.user.name != "Gemini" && (
          <Image
            src={message.user.avatar}
            alt={`${message.user.name}'s avatar`}
            width={32}
            height={32}
            className="h-8 w-8 rounded-md"
          />
        )}
        {message.user.name == "Gemini" && (
          <div className="h-8 w-8 aspect-square rounded-md bg-gray-500 flex justify-center items-center">
            <p className="text-xs font-semibold">AI</p>
          </div>
        )}
        <div className="flex-1 pt-1">
          {isAI ? (
            <div className="prose prose-invert max-w-none">
              {formatAIText(message.text)}
            </div>
          ) : (
            <p className="text-sm">{message.text}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
