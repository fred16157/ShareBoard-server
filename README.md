# ShareBoard-server

ShareBoard 서비스의 서버입니다.

## 요구사항

- Node.js 12+
- MongoDB 4.x

## 설치 및 초기 설정

먼저 이 리포지토리를 복제하고 필요한 패키지를 설치해야 합니니다.

```
git clone https://github.com/fred16157/ShareBoard-server
cd ShareBoard-server
npm install // 또는 yarn install
```

설치가 끝나면 config.json를 수정해야 합니다. config.json의 변수들은 다음의 역할을 갖고 있습니다.

- ```port```: 서버가 실행될 포트번호
- ```mongoUrl```: 유저 DB로 사용될 MongoDB의 연결 URL
- ```salt```: 비밀번호 암호화에 사용되는 salt값, 변경되지 않으면 해킹에 취약해짐
- ```maxFileSize```: 파일 전송의 최대 파일 크기(바이트 단위), 초기값은 200MB

config.json을 수정하고 나면 ```npm start```나 ```yarn start```로 실행할 수 있습니다.
