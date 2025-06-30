# 7-viewmystartup-team2-BE
# TEAM 2

# 팀원 구성

김태홍
이예원
정남영
정우진

# 프로젝트 소개

VIEW MY STARTUP

# 기술 스택

Frontend: JavaScript, React.js

Backend: JavaScript, Express

Database: PostgreSQL

공통 Tool: Github, Notion, Discord, Render, Netlify 

# 팀원별 구현 기능 상세

김태홍
- 기업 정보 조회 API 엔드포인트 구현
- 특정 기업 투자자 리스트 조회 API 엔드포인트 구현
- 투자 수정 API 엔드포인트 구현
- 투자 삭제 API 엔드포인트 구현
- 수정 및 삭제 시 비밀번호 검증 서비스 로직 작성
- 수정 및 삭제 시 유저 잔액 동기화 서비스 로직 작성

이예원
- 나의 기업 선택 페이지 구현

정남영
- 투자 현황 조회 API 개발
- 투자 Investment Post API 구현

정우진
- 전체기업, 비교현황, 투자현황 (keyword, sort, order 쿼리 ) 기업리스트 불러오기 api 작성
- 로그인 auth api, refresh api 작성
  회원여부, 비밀번호 일치여부, 잔액부족 여부 확인후 로그인시 유저정보 반환
- 내 기업 투자하기 api 작성
  투자금액과 유저 잔액 비교 후 잔액부족시 오류, 비밀번호 비교 후 틀릴 시 오류
  투자성공시 $transaction[유저 자산잔액감소, 투자내역 post]

# 파일 구조
```
.
├── app.js
├── controllers
│   ├── auth
│   ├── company
│   ├── compareCompanySelection
│   ├── investment
│   ├── myCompanySelection
│   └── user
├── middlewares
│   └── authorization.js
├── package-lock.json
├── package.json
├── prisma
│   ├── company-data.js
│   ├── company-data.json
│   ├── companySeed.js
│   ├── migrations
│   ├── schema.prisma
│   ├── seed.js
│   ├── seedData_uuid_cleaned_final.js
│   └── seedData.js
├── README.md
├── repositories
│   ├── auth
│   ├── company
│   ├── compareCompanySelection
│   ├── investment
│   ├── myCompanySelection
│   ├── temp.js
│   └── user
├── routes
│   ├── auth
│   ├── company
│   ├── compareCompanySelection
│   ├── investment
│   ├── myCompanySelection
│   └── user
├── services
│   ├── auth
│   ├── company
│   ├── compareCompanySelection
│   ├── investment
│   ├── myCompanySelection
│   └── user
├── string
└── utils
    └── company.mapper.js
```

# ERD

<img width="675" alt="image" src="https://github.com/user-attachments/assets/0a515990-1eab-4a26-aacd-cdb450a6b615" />


# 구현 홈페이지

https://melodious-yeot-da7d96.netlify.app/

# 프로젝트 회고록

(제작한 발표자료 링크 혹은 첨부파일 첨부)
