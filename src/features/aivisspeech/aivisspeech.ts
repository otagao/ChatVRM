import { TalkStyle } from "../messages/messages";
import { AivisParam } from "../constants/aivisParam";

export interface AudioQuery {
  accent_phrases: AccentPhrase[];
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
  prePhonemeLength: number;
  postPhonemeLength: number;
  outputSamplingRate: number;
  outputStereo: boolean;
  kana?: string;
}

export interface AccentPhrase {
  moras: Mora[];
  accent: number;
  pause_mora?: Mora;
  is_interrogative?: boolean;
}

export interface Mora {
  text: string;
  consonant?: string;
  consonant_length?: number;
  vowel: string;
  vowel_length: number;
  pitch: number;
}

export interface Speaker {
  name: string;
  speaker_uuid: string;
  styles: Style[];
}

export interface Style {
  name: string;
  id: number;
  type: string;
}

// Convert TalkStyle to appropriate speaker parameter
function mapTalkStyleToSpeakerAdjustment(style: TalkStyle): Partial<AivisParam> {
  switch (style) {
    case "talk":
      return { speedScale: 1.0, pitchScale: 0.0, intonationScale: 1.0 };
    case "happy":
      return { speedScale: 1.1, pitchScale: 0.1, intonationScale: 1.2 };
    case "sad":
      return { speedScale: 0.9, pitchScale: -0.1, intonationScale: 0.8 };
    default:
      return { speedScale: 1.0, pitchScale: 0.0, intonationScale: 1.0 };
  }
}

export async function synthesizeWithAivisSpeech(
  message: string,
  param: AivisParam,
  style: TalkStyle,
  baseUrl: string = "http://127.0.0.1:10101"
): Promise<{ audio: string }> {
  // Apply style adjustments
  const styleAdjustments = mapTalkStyleToSpeakerAdjustment(style);
  const adjustedParam = { ...param, ...styleAdjustments };

  // Step 1: Create audio query
  const audioQueryResponse = await fetch(
    `${baseUrl}/audio_query?text=${encodeURIComponent(message)}&speaker=${adjustedParam.speaker}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!audioQueryResponse.ok) {
    throw new Error(`Audio query failed: ${audioQueryResponse.status}`);
  }

  const audioQuery: AudioQuery = await audioQueryResponse.json();

  // Modify audio query parameters
  audioQuery.speedScale = adjustedParam.speedScale;
  audioQuery.pitchScale = adjustedParam.pitchScale;
  audioQuery.intonationScale = adjustedParam.intonationScale;
  audioQuery.volumeScale = adjustedParam.volumeScale;

  // Step 2: Synthesize audio
  const synthesisResponse = await fetch(
    `${baseUrl}/synthesis?speaker=${adjustedParam.speaker}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(audioQuery),
    }
  );

  if (!synthesisResponse.ok) {
    throw new Error(`Synthesis failed: ${synthesisResponse.status}`);
  }

  // Get audio data as ArrayBuffer
  const audioData = await synthesisResponse.arrayBuffer();
  
  // Convert to base64
  const uint8Array = new Uint8Array(audioData);
  const binaryString = Array.from(uint8Array)
    .map(byte => String.fromCharCode(byte))
    .join('');
  const base64Audio = btoa(binaryString);

  return { audio: base64Audio };
}

export async function getSpeakers(baseUrl: string = "http://127.0.0.1:10101"): Promise<Speaker[]> {
  const response = await fetch(`${baseUrl}/speakers`);
  if (!response.ok) {
    throw new Error(`Failed to get speakers: ${response.status}`);
  }
  return response.json();
}