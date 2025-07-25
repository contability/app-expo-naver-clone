## 홈 스크린/쇼핑 스크린

1. 스크린 네비게이션 구현
2. 탭 네비게이션 구현

- react-navigation
- expo-router

3. 아이콘 라이브러리 사용

- react-native-vector-icons
- @expo/vector-icons

4. web view에 웹 사이트 로드
5. 브라우저 기능 구현
6. 라우팅 프로그레스 바 구현
7. pull to refresh 구현

- React Native의 ScrollView와 RefreshControl 컴포넌트 이용

- ScrollView: 스크롤이 가능한 영역 제공
  - https://reactnative.dev/docs/scrollview

- RefreshControl: ScrollView의 새로고침 상태 표시
  - https://reactnative.dev/docs/refreshcontrol

8. 웹 사이트 리퀘스트 핸들링

- onShouldStartLoadWithRequest

9. 공유 기능 구현

- Web Share API가 있지만, 지원하지 않는 브라우저가 있음
- 하이브리드 앱에 장점! 네이티브 기능을 사용할 수 있는 것
- React Native Share API를 통해 네이티브 공유 기능을 호출 가능

- https://developer.mozilla.org/en-US/docs/Web/APl/Navigator/share
- https://reactnative.dev/docs/share

## 브라우저 스크린

1. 웹 사이트 현재 주소 보여주기

- onNavigationStateChange
  - 현재 주소, 뒤로 가기/앞으로 가기 가능 상태 접근

2. 웹 사이트 로딩 바 구현

- onLoadProgress, onLoadEnd

3. 브라우저 네비게이션 기능 구현 (앞으로, 뒤로, 새로고침)

- Webview 인스턴스 접근
- 웹뷰 새로고침 화면 수정: renderLoading

4. iOS, Android 네이티브 공유 기능 구현

- share API

## 로그인 스크린

1. 로그인 후 웹뷰 새로 고침 기능 구현

- Context를 이용한 전역적인 상태 관리

2. 쿠키 읽기 및 쓰기

- @react-native-cookies/cookies
- document.cookie

## 웹앱 최적화

1. 핀치 줌/아웃 비활성화
2. 링크 롱 프레스 프리뷰 비활성화
3. 안드로이드 백버튼과 웹뷰 연결
4. 텍스트 롱 프레스 액션 비활성화

## 앱 설정

1. 앱 이름 변경

- CLI - Info.plist, strings.xml
- EXPO - app.json 수정

2. 앱 아이콘 변경

- CLI - AppIcon 이미지 셋 변경, ic_launcher.png 변경
- assets/icon.png 파일 수정
