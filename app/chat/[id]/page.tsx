import Chat from "@/components/Chat";
import ChatInput from "@/components/ChatInput";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

async function ChatPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="flex flex-col h-screen">
      <Chat chatId={id} />
      <ChatInput chatId={id} />
    </div>
  );
}

export default ChatPage;
