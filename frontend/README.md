# NewSings

## 📅 프로젝트 기간

2023년 04월 10일 월요일 - 2023년 05월 09일 금요일 (총 기간 : 6주)

## 🌟 프로젝트 개요

1. **Summary(프로젝트 소개 및 요약)**

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
- Spring Cloud 2.2.1
- Swagger2 3.0.0
- jjwt 0.11.5
- caffeine 2.9.3
- bucket4j 4.10.0
- gson 2.10.1

**CI/CD**

- AWS EC2
- AWS S3
- AWS CloudFront
- Jenkins
- NGINX
- SSL

**Frontend**

- Visual Studio Code IDE
- react 18.2.0
- r*edux 4.2.1*
- _react-redux_ 8.0.5
- _redux-persist 6.0.0_
- p*rop-types 15.8.1*
- _styled-components 5.3.8_
- _styled-reset 4.4.5_
- _react-router-dom 6.8.2_
- _react-toastify 9.1.2_
- _react-responsive 9.0.2_
- _react-qrcode-logo 2.9.0_
- _emoji-picker-react 4.4.7_
- _@uiw/react-md-editor 3.20.5_
- _html-to-image 1.11.11_
- _react-spinners 0.13.8_

## 📝 요구사항정의서

![요구사항정의서](./assets/donjo-srs.png)

## 💄 디자인 시안

![요구사항정의서](./assets/donjo-design.png)

## 🔒 ERD

![요구사항정의서](./assets/donjo-erd.png)

## 📄 아키텍처 구성도

![아키텍처 구성도](./assets/donjo-architecture.png)

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
