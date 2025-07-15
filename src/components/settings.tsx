import React from "react";
import { IconButton } from "./iconButton";
import { TextButton } from "./textButton";
import { Message } from "@/features/messages/messages";
import {
  AivisParam,
  AIVIS_PRESET_A,
  AIVIS_PRESET_B,
  AIVIS_PRESET_C,
  AIVIS_PRESET_D,
} from "@/features/constants/aivisParam";
import { Link } from "./link";

type Props = {
  openAiKey: string;
  systemPrompt: string;
  chatLog: Message[];
  aivisParam: AivisParam;
  onClickClose: () => void;
  onChangeAiKey: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSystemPrompt: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeChatLog: (index: number, text: string) => void;
  onChangeAivisParam: (param: AivisParam) => void;
  onClickOpenVrmFile: () => void;
  onClickResetChatLog: () => void;
  onClickResetSystemPrompt: () => void;
};
export const Settings = ({
  openAiKey,
  chatLog,
  systemPrompt,
  aivisParam,
  onClickClose,
  onChangeSystemPrompt,
  onChangeAiKey,
  onChangeChatLog,
  onChangeAivisParam,
  onClickOpenVrmFile,
  onClickResetChatLog,
  onClickResetSystemPrompt,
}: Props) => {
  return (
    <div className="absolute z-40 w-full h-full bg-white/80 backdrop-blur ">
      <div className="absolute m-24">
        <IconButton
          iconName="24/Close"
          isProcessing={false}
          onClick={onClickClose}
        ></IconButton>
      </div>
      <div className="max-h-full overflow-auto">
        <div className="text-text1 max-w-3xl mx-auto px-24 py-64 ">
          <div className="my-24 typography-32 font-bold">設定</div>
          <div className="my-24">
            <div className="my-16 typography-20 font-bold">OpenAI API キー</div>
            <input
              className="text-ellipsis px-16 py-8 w-col-span-2 bg-surface1 hover:bg-surface1-hover rounded-8"
              type="text"
              placeholder="sk-..."
              value={openAiKey}
              onChange={onChangeAiKey}
            />
            <div>
              APIキーは
              <Link
                url="https://platform.openai.com/account/api-keys"
                label="OpenAIのサイト"
              />
              で取得できます。取得したAPIキーをフォームに入力してください。
            </div>
            <div className="my-16">
              ChatGPT
              APIはブラウザから直接アクセスしています。また、APIキーや会話内容はピクシブのサーバには保存されません。
              <br />
              ※利用しているモデルはChatGPT API (GPT-4o)です。
            </div>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">
              キャラクターモデル
            </div>
            <div className="my-8">
              <TextButton onClick={onClickOpenVrmFile}>VRMを開く</TextButton>
            </div>
          </div>
          <div className="my-40">
            <div className="my-8">
              <div className="my-16 typography-20 font-bold">
                キャラクター設定（システムプロンプト）
              </div>
              <TextButton onClick={onClickResetSystemPrompt}>
                キャラクター設定リセット
              </TextButton>
            </div>

            <textarea
              value={systemPrompt}
              onChange={onChangeSystemPrompt}
              className="px-16 py-8  bg-surface1 hover:bg-surface1-hover h-168 rounded-8 w-full"
            ></textarea>
          </div>
          <div className="my-40">
            <div className="my-16 typography-20 font-bold">声の調整</div>
            <div>
              AivisSpeech Engine (https://aivis-project.github.io/AivisSpeech-Engine/api/) を使用しています。
              <br />
              <span className="text-red-500 font-bold">
                ⚠️ AivisSpeech Engineがローカル環境（http://127.0.0.1:10101）で起動していることを確認してください。
              </span>
              <br />
              詳しくは
              <Link
                url="https://aivis-project.com/"
                label="公式サイト"
              />
              をご覧ください。
            </div>

            <div className="mt-16 font-bold">プリセット</div>
            <div className="my-8 grid grid-cols-2 gap-[8px]">
              <TextButton
                onClick={() => onChangeAivisParam(AIVIS_PRESET_A)}
              >
                標準
              </TextButton>
              <TextButton
                onClick={() => onChangeAivisParam(AIVIS_PRESET_B)}
              >
                通常
              </TextButton>
              <TextButton
                onClick={() => onChangeAivisParam(AIVIS_PRESET_C)}
              >
                元気
              </TextButton>
              <TextButton
                onClick={() => onChangeAivisParam(AIVIS_PRESET_D)}
              >
                落ち着き
              </TextButton>
            </div>
            <div className="my-24">
              <div className="select-none">話者ID : {aivisParam.speaker}</div>
              <input
                type="number"
                min={0}
                max={999999999}
                value={aivisParam.speaker}
                className="mt-8 mb-16 px-16 py-8 w-full bg-surface1 hover:bg-surface1-hover rounded-8"
                onChange={(e) => {
                  onChangeAivisParam({
                    ...aivisParam,
                    speaker: Number(e.target.value)
                  });
                }}
              />
              <div className="select-none">速度 : {aivisParam.speedScale}</div>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.1}
                value={aivisParam.speedScale}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeAivisParam({
                    ...aivisParam,
                    speedScale: Number(e.target.value)
                  });
                }}
              />
              <div className="select-none">音高 : {aivisParam.pitchScale}</div>
              <input
                type="range"
                min={-0.5}
                max={0.5}
                step={0.1}
                value={aivisParam.pitchScale}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeAivisParam({
                    ...aivisParam,
                    pitchScale: Number(e.target.value)
                  });
                }}
              />
              <div className="select-none">抑揚 : {aivisParam.intonationScale}</div>
              <input
                type="range"
                min={0.0}
                max={2.0}
                step={0.1}
                value={aivisParam.intonationScale}
                className="mt-8 mb-16 input-range"
                onChange={(e) => {
                  onChangeAivisParam({
                    ...aivisParam,
                    intonationScale: Number(e.target.value)
                  });
                }}
              />
            </div>
          </div>
          {chatLog.length > 0 && (
            <div className="my-40">
              <div className="my-8 grid-cols-2">
                <div className="my-16 typography-20 font-bold">会話履歴</div>
                <TextButton onClick={onClickResetChatLog}>
                  会話履歴リセット
                </TextButton>
              </div>
              <div className="my-8">
                {chatLog.map((value, index) => {
                  return (
                    <div
                      key={index}
                      className="my-8 grid grid-flow-col  grid-cols-[min-content_1fr] gap-x-fixed"
                    >
                      <div className="w-[64px] py-8">
                        {value.role === "assistant" ? "Character" : "You"}
                      </div>
                      <input
                        key={index}
                        className="bg-surface1 hover:bg-surface1-hover rounded-8 w-full px-16 py-8"
                        type="text"
                        value={value.content}
                        onChange={(event) => {
                          onChangeChatLog(index, event.target.value);
                        }}
                      ></input>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
