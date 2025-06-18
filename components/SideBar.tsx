"use client";

import React from "react";
import NewChat from "./NewChat";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import Image from "next/image";

function SideBar() {
  const { data: session, status } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email || "", "chats"),
        orderBy("createdAt", "asc")
      )
  );

  if (status === "loading") {
    return (
      <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
          <div>
            <NewChat />
            <div></div>
            <div className="flex flex-col space-y-2 mt-2">
              <div className="chatRow justify-center border border-gray-700 opacity-50">
                <div className="h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
                <div className="flex-1 hidden md:block h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div></div>
          <div className="flex flex-col space-y-2 mt-2">
            {loading
              ? // Show skeleton loading for chats
                Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="chatRow justify-center border border-gray-700 opacity-50"
                  >
                    <div className="h-5 w-5 bg-gray-600 rounded animate-pulse"></div>
                    <div className="flex-1 hidden md:block h-4 bg-gray-600 rounded animate-pulse"></div>
                    <div className="w-5 h-5 bg-gray-600 rounded animate-pulse"></div>
                  </div>
                ))
              : chats?.docs.map((chat) => (
                  <ChatRow key={chat.id} id={chat.id} />
                ))}
          </div>
        </div>
      </div>
      {session?.user?.image && (
        <Image
          className="h-10 w-10 rounded-full cursor-pointer hover:opacity-50 transition-all duration-200 absolute left-0 bottom-0 m-3"
          src={session.user.image}
          alt={session.user?.name || "Profile picture"}
          width={40}
          height={40}
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}

export default SideBar;
