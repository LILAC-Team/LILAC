# LILAC

## 📅 프로젝트 기간

2023년 04월 10일 월요일 - 2023년 05월 18일 목요일 (총 기간 : 6주)

## 🌟 프로젝트 개요

  - 저희 서비스는 친구들과 부른 노래를 모아 앨범을 만들어주는 음원 스트리밍 플랫폼입니다.
  - 음원을 발매하고, 주변 지인들에게 공유할 수 있습니다.
  - 음원 스트리밍 기능을 제공하고, 타임라인마다 댓글을 달 수 있습니다.


## ✨ 프로젝트 핵심 기능

  - 유저 앨범 등록 및 공유
  - 음원 타임라인 별 댓글 제공
  - 백그라운드 스트리밍

## 👩🏻‍💻 팀 구성


|  오윤식  |  김명준  |  김현수  |  정소영  |   조수정   |  최윤지  |
| :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
| <a href="http://github.com/YoonsikOh5"><img src="https://avatars.githubusercontent.com/u/109320448?v=4" width="100"></a> | <a href="http://github.com/grolarkim"><img src="https://avatars.githubusercontent.com/u/91328539?v=4" width="100"></a> | <a href="http://github.com/hyunssu"><img src="https://avatars.githubusercontent.com/u/83157338?v=4" width="100"></a> | <a href="http://github.com/moxnox63"><img src="https://avatars.githubusercontent.com/u/82074636?v=4" width="100"></a> | <a href="http://github.com/suz-dev"><img src="https://avatars.githubusercontent.com/u/91257772?v=4" width="100"></a> | <a href="http://github.com/yunjichoi9151"><img src="https://avatars.githubusercontent.com/u/97906125?v=4" width="100"></a> |
| BE / Team Leader | BE / Back-end Leader | FE / Front-end Leader | FE / Front-end  | BE / Infra  | FE / Design Leader |



## 🔨 주요 기술

**Backend - Spring**

- *IntelliJ IDE*
- *Java 11.0.14*
- *Springboot 2.7.7*
- *Spring Data JPA 2.7.7*
- *Spring Security 2.7.7*
- *Spring Validation 2.7.7*
- *Spring Web 2.7.7*
- *QueryDSL 5.0.0*

**Infra**

- *AWS EC2*
- *AWS S3*
- *AWS CloudFront*
- *AWS Media Converter*
- *Jenkins 2.405*
- *Docker 23.0.6*
- *Docker-compose 23.0.6*
- *NGINX 1.18.0 (Ubuntu)*
- *SSL*

**Frontend**

- *Visual Studio Code IDE*
- *react 18.2.0*
- *redux 4.2.1*
- *typescript 5.0.4*
- *react-redux 8.0.5*
- *redux-persist 6.0.0*
- *styled-components 5.3.8*
- *styled-reset 4.4.5*
- *next: 13.3.0*
- *react-router-dom 6.8.2*
- *react-toastify 9.1.2*
- *react-responsive 9.0.2*



## 📝 요구사항정의서

![요구사항정의서](https://github.com/suz-dev/fit_with_me/assets/91257772/5865935d-4e74-485b-8ade-ceb13fd96c46)


## 💄 디자인 시안

![디자인 시안](https://user-images.githubusercontent.com/97906125/233523381-75505f25-d20c-4779-982f-49e12a0731b4.png)

## 🔒 ERD

![요구사항정의서](https://user-images.githubusercontent.com/97906125/233522751-a51bd93b-2518-4325-b029-2408f2b5b46e.png)

## 📄 아키텍처 구성도

![아키텍처 설계도](https://github.com/suz-dev/fit_with_me/assets/91257772/09bf6a52-4046-4722-9130-2873a635a739)

## 📄 시퀀스다이어그램

![시퀀스다이어그램](https://user-images.githubusercontent.com/97906125/233522989-47ec085d-3f7f-4fc5-b706-41ea05092b28.png)

## 📄 컴포넌트 명세서

![컴포넌트 명세서1](https://github.com/suz-dev/fit_with_me/assets/91257772/476e0be7-335e-4c1e-9bce-cbb055b5acff)

## ⚙️ 프로젝트 파일 구조

**Back-end**
```
└─src
  ├─main
  │  ├─java
  │  │  └─com
  │  │      └─lilacmusic
  │  │          └─backend
  │  │              ├─albums
  │  │              │  ├─controller
  │  │              │  ├─dto
  │  │              │  │  ├─request
  │  │              │  │  └─response
  │  │              │  ├─exceptions
  │  │              │  ├─model
  │  │              │  │  ├─entitiy
  │  │              │  │  ├─mapping
  │  │              │  │  └─repository
  │  │              │  └─service
  │  │              ├─global
  │  │              │  ├─common
  │  │              │  ├─config
  │  │              │  ├─error
  │  │              │  │  └─common
  │  │              │  ├─redis
  │  │              │  ├─security
  │  │              │  │  ├─annotation
  │  │              │  │  ├─config
  │  │              │  │  ├─jwt
  │  │              │  │  └─oauth2
  │  │              │  └─validation
  │  │              ├─member
  │  │              │  ├─controller
  │  │              │  ├─entity
  │  │              │  ├─exception
  │  │              │  ├─repository
  │  │              │  ├─request
  │  │              │  ├─response
  │  │              │  └─service
  │  │              ├─musics
  │  │              │  ├─controller
  │  │              │  ├─dto
  │  │              │  │  ├─request
  │  │              │  │  └─response
  │  │              │  ├─exceptions
  │  │              │  ├─model
  │  │              │  │  ├─entity
  │  │              │  │  ├─mapping
  │  │              │  │  └─repository
  │  │              │  └─service
  │  │              └─playlists
  │  │                  ├─controller
  │  │                  ├─dto
  │  │                  │  ├─request
  │  │                  │  └─response
  │  │                  ├─model
  │  │                  │  ├─entitiy
  │  │                  │  └─repository
  │  │                  └─service
  │  └─resources
  └─test
      └─java
          └─com
              └─lilacmusic
                  └─backend
                      ├─albums
                      │  ├─controller
                      │  ├─model
                      │  │  └─repository
                      │  └─service
                      ├─global
                      │  └─validation
                      ├─members
                      ├─musics
                      │  ├─controller
                      │  └─service
                      └─playlists
                          ├─controller
                          └─service
```


**Front-end**

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

