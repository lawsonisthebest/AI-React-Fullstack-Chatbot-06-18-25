import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  awnser: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = req.body;
  if (!prompt) {
    res.status(400).json({ awnser: "Please provide a prompt!" });
    return;
  }
  if (!chatId) {
    res.status(400).json({ awnser: "Please provide a valid chat ID!" });
    return;
  }

  const response = await query(prompt, model);

  const message: Message = {
    text: response || "I Cannot help you with that, please try again!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "Gemini",
      name: "Gemini",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  res.status(200).json({ awnser: message.text });
}
