# 인터넷 기초[04] 과제2 - 나만의 인공지능 서비스 백엔드

## 개요
- **서비스 명**: [Mood Closet - 오늘의 옷 추천](https://dlwl224.github.io/mood-closet)
- **설명**: 프론트엔드(https://dlwl224.github.io/mood-closet)에서 전달된 **이름**, **성별**, **오늘 기분**, **현재 날씨** 요청을 받아 Google Gemini API에 전달합니다.  
  AI가 생성한 **오늘의 옷 추천** 결과를 JSON 형태로 반환합니다.

## 기술 스택
- Node.js  
- Vercel Functions (Serverless)  
- Google Gemini API (`@google/genai`)  
- 환경 변수 관리 (`dotenv`)

## 파일 구조
```text
mood-closet-api/             # 백엔드 레포지토리 루트
├── api/
│   └── ootdAI.js            # OOTD 엔드포인트 핸들러
├── .env.example             # GEMINI_API_KEY 예시
├── package.json             # 의존성 및 스크립트 정보
├── package-lock.json        # 자동 생성된 잠금 파일
├── vercel.json              # 리라이트/라우팅 설정
└── README.md                # 이 설명 파일
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
# → http://localhost:3000/api/ootdAI 로 호출 가능
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


© 2025 Mood Closet. All rights reserved.
