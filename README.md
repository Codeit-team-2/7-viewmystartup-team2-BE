# 7-viewmystartup-team2-BE

.env 환경변수파일에
DATABASE_URL="postgresql://postgres:123123@localhost:5432/postgres?schema=public"
이런식으로 본인 postgres pw입력해서 개인db로만들고 작업

node src/app.js
서버 실행 중: http://localhost:3000 .. 이런식으로뜨면

postman맨에서 http://localhost:3000/[users, ...etc] <-입력하고

get,post..확인하면됨
