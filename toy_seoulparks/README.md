# 설힐공-서울의 힐링공원

## 개요

- react, redux, 서울시 공원정보api 활용 개인토이프로젝트
- 서울시에서 관리하는 공식사이트 "서울의 공원" 이 있지만, 프론트학습 활용을 위해 서울시api를 활용해서 만든 프로젝트
- PC웹, 모바일웹 모두 가능 (어수룩한 반응형..)
- react + redux + ts + js
- redux도 최대한 보일러플레이트한 코드들을 쓰지 않도록 하고 -template --redux를 활용
- react-router-dom 현최신 v6버전. 때문에 이전버전들로 만들어진 소스들과 차이 있음
- redux store를 활용한 상태저장 관리. 크롬익스텐션에서 실제 확인가능
- 서울시api, 네이버api, 카카오api 활용.
- list 및 상세View - 서울시api
- 상세View내 지도, 파노라마 - 네이버api
- 상세View내 주변 음식점,카페 지도 - 카카오api
- http://hwan2272.dothome.co.kr/

## 사용한 라이브러리 및 폰트

```
react
react-redux
axios
react-router-dom
react-xml-parser
typescript

S-coreDream 폰트 (눈누사이트 무료폰트)
```

## 라이브러리 설치

```
npm install
```

## 동작 스크립트 (npm install 후 실행)

```
npm run start
```

## 주요 폴더 및 리소스 구조 설명

```
 src
  ├──app
  │   ├── hooks.ts
  │   └── store.ts - redux를 사용하기 위한 스토어 정의
  │
  ├──fetures - 사이트 내에서 쓰이는 페이지들
  │   ├── parks
  │   │     ├── ParkApi.jsx - 공원정보 API 정의
  │   │     ├── ParkAroundPlaceItem.jsx - 공원 주변 정보 Item 컴포넌트
  │   │     ├── ParkAroundPlaces.jsx - 공원 주변 정보 항목 컴포넌트
  │   │     ├── ParkCondition.jsx - 공원 리스트의 구단위 selectbox와 변경 액션(검색) 정의 컴포넌트
  │   │     ├── ParkDetail.jsx - 공원 상세정보 컴포넌트
  │   │     ├── ParkItem.jsx - 공원 항목 컴포넌트
  │   │     ├── ParkMain.jsx - 메인화면 공원 리스트 컴포넌트
  │   │     ├── ParkMap.js - Naver Map API Init 동작 정의
  │   │     └── ParkUtil.js - Api response를 Parsing하는 등의 내용 정의
  │   └── sample - (설명 생략)
  │
  ├──search
  │   └── searchSlice.ts - 검색 동작이 일어났을 시 redux에 의해 검색값을 유지하도록 하기 위한 정의
```
