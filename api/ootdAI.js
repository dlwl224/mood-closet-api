// api/ootdAI.js

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  // CORS 에러 해결을 위한 헤더 설정
  const allowedOrigin="https://dlwl224.github.io"
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 직접 수정할 부분 (1)
  // 기획한 서비스에 맞게 프론트에서 전송하는 값으로 수정하세요.
  const { name, gender, mood, weather } = req.body;
  if (!name || !gender || !mood || !weather) {
    return res
      .status(400)
      .json({ error: "name, gender, mood, weather 모두 필요합니다." });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    // 직접 수정할 부분 (2)
    // 기획한 서비스에 맞게 LLM에 물어볼 질문(prompt)으로 바꿔주세요.
    const prompt = `
이름: ${name}
성별: ${gender}
기분: ${mood}
날씨: ${weather}

상의·하의·신발·아우터 위주로 오늘의 데일리룩을 추천해 주세요.
추천 스타일 키워드는 해시태그 형태로 제시하고,
마지막에는 한 문장의 감성 코멘트로 마무리해주세요.
    `;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        // 직접 수정할 부분 (3)
        // 기획한 서비스에 맞게 LLM의 동작 방식을 정의하세요.
        systemInstruction:
          "당신은 20년 경력의 패션 코디 전문가입니다. 사용자의 이름,성별, 기분, 날씨를 참고하여 현실적이면서도 감성적인 오늘의 데일리룩을 상의·하의·신발·아우터 위주로 추천해주세요. 스타일 키워드는 해시태그 형태로 제시하고, 마지막에 한 문장의 감성 코멘트로 마무리하세요.",
      },
    });

    return res.status(200).json({ outfit: result.text });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Gemini API 호출 실패" });
  }
}
