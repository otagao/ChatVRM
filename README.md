# ChatVRM with AivisSpeech Engine

このプロジェクトは、元々pixivによって開発されたChatVRMを基に、音声合成エンジンをKoemotionからAivisSpeech Engineに移行し、ChatGPTモデルをGPT-4oにアップグレードしたフォークです。
修正に際しては大部分でClaude Codeを利用しています。

**主な変更点：**
- 音声合成: Koeiromap API → AivisSpeech Engine（ローカル実行）
- ChatGPTモデル: GPT-3.5-turbo → GPT-4o
- APIキー不要の音声合成（AivisSpeech Engineを使用）

ChatVRMはブラウザで簡単に3Dキャラクターと会話ができるデモアプリケーションです。

VRMファイルをインポートしてキャラクターに合わせた声の調整や、感情表現を含んだ返答文の生成などを行うことができます。

ChatVRMの各機能は主に以下の技術を使用しています。

- **ユーザーの音声の認識**
    - [Web Speech API(SpeechRecognition)](https://developer.mozilla.org/ja/docs/Web/API/SpeechRecognition)
- **返答文の生成**
    - [OpenAI ChatGPT API (GPT-4o)](https://platform.openai.com/docs/api-reference/chat)
- **読み上げ音声の生成**
    - [AivisSpeech Engine](https://aivis-project.com/)
- **3Dキャラクターの表示**
    - [@pixiv/three-vrm](https://github.com/pixiv/three-vrm)

## 前提条件

このアプリケーションを実行するには以下の準備が必要です：

1. **AivisSpeech Engine** - ローカル環境で実行する音声合成エンジン
   - [AivisSpeech Engine](https://aivis-project.com/)をダウンロードしてインストール
   - `http://127.0.0.1:10101` でサーバーを起動

2. **OpenAI API キー** - ChatGPT (GPT-4o) を使用するためのAPIキー
   - [OpenAI Platform](https://platform.openai.com/)でアカウントを作成
   - APIキーを発行

## 実行手順

### 1. AivisSpeech Engineの起動
まず、AivisSpeech Engineをローカル環境で起動してください。
[AivisSpeech](https://aivis-project.com/)に同梱されており、AivisSpeechを起動すると音声合成エンジンも自動で起動するようになっています。

### 2. アプリケーションの起動
ローカル環境で実行する場合は、このリポジトリをクローンするかダウンロードしてください。
```bash
git clone https://github.com/otagao/ChatVRM.git
```

必要なパッケージをインストールしてください。
```bash
npm install
```

開発用のWebサーバーを起動します。
```bash
npm run dev
```

ブラウザで以下のURLにアクセスしてください。
[http://localhost:3000](http://localhost:3000) 

### 3. 初期設定
1. OpenAI APIキーを入力
2. AivisSpeech Engineが正常に起動していることを確認
3. 設定を完了して開始

---

## 使用API・技術

### OpenAI ChatGPT API (GPT-4o)
このアプリケーションではGPT-4oを使用して高品質な会話応答を生成します。

APIの詳細については以下をご確認ください：
- [OpenAI API リファレンス](https://platform.openai.com/docs/api-reference/chat)
- [OpenAI API データ使用ポリシー](https://openai.com/policies/api-data-usage-policies)

### AivisSpeech Engine
音声合成にはAivisSpeech Engineを使用しています。これにより、APIキー不要でローカル環境での音声合成が可能です。

詳細については以下をご確認ください：
- [AivisSpeech Engine 公式サイト](https://aivis-project.com/)
- [AivisSpeech Engine API ドキュメント](https://aivis-project.github.io/AivisSpeech-Engine/api/)

## 音声設定

アプリケーションの設定画面では以下の音声パラメータを調整できます：
- **話者ID**: 使用する音声の種類
- **速度**: 音声の再生速度
- **音高**: 音声の高さ
- **抑揚**: 音声の抑揚の強さ

プリセットとして「標準」「通常」「元気」「落ち着き」が用意されています。

## 元プロジェクトについて

このプロジェクトは[pixiv/ChatVRM](https://github.com/pixiv/ChatVRM)のフォークです。元のプロジェクトは2024年7月18日にアーカイブされました。

元プロジェクトの開発者に感謝いたします。
