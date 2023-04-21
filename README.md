# LILAC

## 📅 프로젝트 기간

2023년 04월 10일 월요일 - 2023년 05월 09일 금요일 (총 기간 : 6주)

## 🌟 프로젝트 개요

1. **Summary(프로젝트 소개 및 요약)**

   - 저희 서비스는 친구들과 부른 노래를 모아 앨범을 만들어주는 음원 스트리밍 플랫폼입니다.
   - 음원을 발매하고, 주변 지인들에게 공유할 수 있습니다.
   - 음원 스트리밍 기능을 제공하고, 타임라인에 댓글을 달 수 있습니다.

2. **Problem(기존 시스템의 문제점)**

3. **Solution(newSings 서비스의 해결 방안)**

4. **Performance(시스템 성과 및 기대효과)**

## ✨ 프로젝트 핵심 기능

## 🧑🏻‍💻 팀 구성

- 백엔드
  - 오윤식 - Team Leader
  - 김명준 - Backend Leader
  - 조수정 - CI/CD
- 프론트엔드
  - 김현수 - Frontend Leader
  - 정소영 - Frontend Follower
  - 최윤지 - Design Leader

## 🔨 주요 기술

**Backend - Spring**

- IntelliJ IDE
- Java 11.0.14
- Springboot 2.7.7
- Spring Data JPA 2.7.7
- Spring Security 2.7.7
- Spring Validation 2.7.7
- Spring Web 2.7.7
- QueryDSL 5.0.0

**CI/CD**

- _AWS EC2_
- _AWS S3_
- _AWS CloudFront_
- _Jenkins_
- _NGINX_
- _SSL_

**Frontend**

- _Visual Studio Code IDE_
- _react 18.2.0_
- _redux 4.2.1_
- _typescript 5.0.4_
- _react-redux 8.0.5_
- _redux-persist 6.0.0_
- _styled-components 5.3.8_
- _styled-reset 4.4.5_
- _next: 13.3.0_
- _react-router-dom 6.8.2_
- _react-toastify 9.1.2_
- _react-responsive 9.0.2_

## 📝 요구사항정의서

![요구사항정의서]()

## 💄 디자인 시안

![디자인 시안](./docs/WireFrame.png)

## 🔒 ERD

![요구사항정의서](./docs/라일락-ERD.png)

## 📄 아키텍처 구성도

![아키텍처 설계도](./docs/라일락-아키텍쳐설계도.png)

## 📄 시퀀스다이어그램

![시퀀스다이어그램](./docs/라일락-시퀀스다이어그램.png)

## 📄 컴포넌트 명세서

![컴포넌트 명세서1](./assets/Lilac_컴포넌트명세서.png)

## ⚙️ 프로젝트 파일 구조

**Frontend**

```
├─api
│  ├─utils
│  ├─user.js
│  ├─player.js
│  └─album.js
├─assets
│  └─img
│      ├─common
│      ├─home
│      ├─
│      ├─logo
│      └─
├─components
│  ├─Common
│  │  ├─BasicText
│  │  ├─BasicInput
│  │  ├─BasicImage
│  │  ├─CustomTextButton
│  │  ├─CustomIconButton
│  │  ├─Header
│  │  ├─Template
│  │  ├─NavigationBar
│  │  ├─AlbumCard
│  │  ├─ProfileImg
│  │  ├─MenuBar
│  │  └─CommonModal
│  │     ├─SmallModal
│  │     └─LargeModal
│  ├─User
│  │  ├─LogIn
│  │  └─SignUp
│  ├─Home
│  │  └─BasicSlider
│  ├─Player
│  │  ├─PlayerContainer
│  │  ├─MusicPlayerBar
│  │  ├─MusicPlayerModal
│  │  ├─playerMenuBar
│  │  ├─CommentModal
│  │  ├─CommentList
│  │  ├─CommentInput
│  │  └─MusicControlerContainer
│  └─Container
│     ├─DragAndDrop
│     ├─MyAlbumBox
│     └─OwnAlbumBox
├─utils
|	 ├─Function
|	 ├─WrapperClass
├─hooks
|	 ├─useTabs.js
|	 ├─useInput.js
│  └─useInfiniteScroll.js
├─pages
│  ├─_app
|  |  ├─index.js
│  │  └─style.js
│  ├─_document
|  |  ├─index.js
│  │  └─style.js
│  ├─index
|  |  ├─index.js
│  │  └─style.js
│  ├─form
│  │  ├─index.js
│  │  └─style.js
│  ├─album
│  │  ├─index.js
│  │  ├─style.js
│  │  └─[albumId]
│  │       ├─index.js
│  │       └─style.js
│  ├─personal
│  │  ├─index.js
│  │  └─style.js
│  ├─oauth
│  │  ├─index.js
│  │  └─style.js
│  └─error
│     ├─index.js
│     └─style.js
├─stores
│  ├─user
│  ├─player
│  └─album
└─styles
   └GlobalStyles.js
```

## 🗣 협업 환경

- Jira
  - 프로젝트 스프린트를 정하고 한 주의 계획대로 프로젝트를 진행했습니다.
  - 팀원마다 주간 40의 Story Point를 설정하였습니다.
- Notion
  - 데일리 회의 스크럼, 요구 사항 정의서, API 명세서등을 문서화했습니다.
  - 코딩 컨벤션, 깃 컨벤션 등 팀원간 개발 규칙을 정의했습니다.
- Github
  - 코딩 컨벤션을 준수하며 프로젝트를 진행하였습니다.
  - Pull Request를 요청하고 팀원들과 코드리뷰를 진행하였습니다.
- Figma
  - 웹 페이지의 디자인 와이어프레임, 시안을 제작하였습니다.
  - 서비스 프로토타입을 제작하였습니다.
