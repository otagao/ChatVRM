export type AivisParam = {
  speaker: number;
  speedScale: number;
  pitchScale: number;
  intonationScale: number;
  volumeScale: number;
};

export const DEFAULT_AIVIS_PARAM: AivisParam = {
  speaker: 888753760, // Anneli - ノーマル
  speedScale: 1.0,
  pitchScale: 0.0,
  intonationScale: 1.0,
  volumeScale: 1.0,
} as const;

export const AIVIS_PRESET_A: AivisParam = {
  speaker: 888753760, // Anneli - ノーマル
  speedScale: 1.0,
  pitchScale: 0.0,
  intonationScale: 1.0,
  volumeScale: 1.0,
} as const;

export const AIVIS_PRESET_B: AivisParam = {
  speaker: 888753761, // Anneli - 通常
  speedScale: 1.0,
  pitchScale: 0.0,
  intonationScale: 1.0,
  volumeScale: 1.0,
} as const;

export const AIVIS_PRESET_C: AivisParam = {
  speaker: 888753762, // Anneli - テンション高め
  speedScale: 1.1,
  pitchScale: 0.1,
  intonationScale: 1.2,
  volumeScale: 1.0,
} as const;

export const AIVIS_PRESET_D: AivisParam = {
  speaker: 888753760, // Anneli - ノーマル (slower)
  speedScale: 0.9,
  pitchScale: -0.1,
  intonationScale: 0.8,
  volumeScale: 1.0,
} as const;