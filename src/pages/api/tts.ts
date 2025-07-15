import { synthesizeWithAivisSpeech } from "@/features/aivisspeech/aivisspeech";
import { TalkStyle } from "@/features/messages/messages";
import { AivisParam } from "@/features/constants/aivisParam";

import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  audio: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const message = req.body.message;
  const aivisParam: AivisParam = req.body.aivisParam;
  const style: TalkStyle = req.body.style;

  try {
    const voice = await synthesizeWithAivisSpeech(message, aivisParam, style);
    res.status(200).json(voice);
  } catch (error) {
    console.error("TTS API error:", error);
    res.status(500).json({ audio: "" });
  }
}
