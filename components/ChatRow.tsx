import { db } from "@/firebase";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { MessageSquareText, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  id: string;
};

function ChatRow({ id }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages, messagesLoading] = useCollection(
    query(
      collection(
        db,
        "users",
        session?.user?.email || "",
        "chats",
        id,
        "messages"
      ),
      orderBy("createdAt", "asc")
    )
  );

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email || "", "chats", id));
    router.replace("/");
  };

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname, id]);

  // Get the last message text or show loading state
  const getLastMessageText = () => {
    if (messagesLoading) {
      return "Loading...";
    }
    return messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat";
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-center border border-gray-700 ${
        active && "bg-gray-700/50"
      }`}
    >
      <MessageSquareText className="h-5 w-5 flex-shrink-0" />
      <p className="flex-1 hidden md:inline-flex truncate min-w-0">
        {getLastMessageText()}
      </p>
      <Trash2
        onClick={removeChat}
        className="w-5 h-5 text-gray-600 hover:text-red-700 flex-shrink-0"
      />
    </Link>
  );
}

export default ChatRow;
