"use client";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SendHorizonal } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const model = "gemini-2.5-flash";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email || "",
        name: session?.user?.name || "",
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name || "User"}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email || "",
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("HigginsAI Is Thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("HigginsAI Successfully Responded!", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-md">
      <form
        onSubmit={sendMessage}
        className="p-7 space-x-5 flex items-center disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <input
          type="text"
          value={prompt}
          disabled={!session}
          className="focus:outline-none bg-transparent flex-1"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />
        <button
          disabled={!prompt || !session}
          type="submit"
          className="cursor-pointer hover:opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendHorizonal className="h-5 w-5" />
        </button>
      </form>
      <div></div>
    </div>
  );
}

export default ChatInput;
