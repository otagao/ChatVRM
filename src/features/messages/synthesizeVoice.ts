import { synthesizeWithAivisSpeech } from "../aivisspeech/aivisspeech";
import { TalkStyle } from "../messages/messages";
import { AivisParam } from "../constants/aivisParam";

export async function synthesizeVoice(
  message: string,
  aivisParam: AivisParam,
  style: TalkStyle
) {
  const aivisRes = await synthesizeWithAivisSpeech(message, aivisParam, style);
  return { audio: aivisRes.audio };
}

export async function synthesizeVoiceApi(
  message: string,
  aivisParam: AivisParam,
  style: TalkStyle
) {
  const body = {
    message: message,
    aivisParam: aivisParam,
    style: style,
  };

  const res = await fetch("/api/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as any;

  return { audio: data.audio };
}
