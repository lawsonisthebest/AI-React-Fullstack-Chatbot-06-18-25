"use client";

import { db } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function NewChat() {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email || "", "chats"),
      {
        userId: session?.user?.email || "",
        createdAt: serverTimestamp(),
      }
    );

    router.push(`/chat/${doc.id}`);
  };
  return (
    <div onClick={createNewChat} className="chatRow border border-gray-700">
      <Plus className="h-4 w-4" />
      <p>New Chat</p>
    </div>
  );
}

export default NewChat;
