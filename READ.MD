# 인터넷 기초\[04] 과제2 - 나만의 인공지능 서비스 백엔드

## 개요

* **서비스 명**: 덕성 오늘의 운세 백엔드 API
* **설명**: 프론트엔드(`Mood Closet` 혹은 `duksung-fortune`)가 보낸 요청(이름·생년월일 또는 이름·성별·기분·날씨 등)을 받아, Google Gemini API에 전달하고

  * LLM이 생성한 운세(또는 오늘의 옷 추천) 응답을 반환합니다.

## 기술 스택

* Node.js
* Serverless 함수(Vercel Functions)
* Google Gemini API(`@google/genai`)
* `dotenv`를 이용한 환경 변수 관리

## 파일 구조

```
└── mood-closet-api/ or duksung-fortune-api/
    ├── api/
    │   └── ootdAI.js        # 엔드포인트 핸들러
    ├── .env.example         # 환경 변수 예시 (GEMINI_API_KEY)
    ├── package.json         # 의존성 및 스크립트
    ├── vercel.json          # 라우팅 설정
    └── README.md            # 이 파일
```

## 환경 변수 설정

1. 프로젝트 루트에 `.env` 파일 생성
2. 아래 내용을 추가

   ```
   GEMINI_API_KEY=발급받은_Gemini_API_키를_여기에_붙여넣기
   ```

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
vercel dev
# → http://localhost:3000/api/ootdAI (또는 /duksungAI) 로 호출 가능
```

## 배포

```bash
# Production 배포
vercel --prod
# → CLI에 표시된 Production URL을 사용
```

## API 사용 예시

### 요청

```
POST /api/ootdAI HTTP/1.1
Content-Type: application/json

{
  "name": "홍길동",
  "gender": "남성",
  "mood": "설렘",
  "weather": "맑음"
}
```

### 응답

```json
{
  "outfit": "홍길동님, 설레는 기분과 맑은 날씨에 어울리는 데이트룩을 추천해 드립니다..."
}
```

## GitHub 리포지토리

* [https://github.com/your-github-username/mood-closet-api](https://github.com/your-github-username/mood-closet-api)

© 2025 덕성 AI 서비스 팀
