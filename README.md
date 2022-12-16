# 트위터 클론 앱 만들기 (노마드코더 학습)
- React와 Firebase를 통해 트위터 앱을 클론하면서 학습했다. 

## 데모사이트

## 구현한 내용
- 인증
- 게시물 게시 및 삭제
- 파일 업로드 및 삭제
- 프로필 수정

## 폴더 상세설명

## 사용한 도구 및 라이브러리
- react, firebase
- react-router-dom@6.3.0

## 강의를 통해 배운 것
### onAuthStateChanged 개념:
- 처음에 로그인이 되었더라도 파이어베이스는 사용자가 로그인이 되었는지 아닌지를 확인할 시간이 없다. 로그인이 되었더라도 바로 로그아웃이 되어버린다. 
- currentUser는 변화가 없다. 그 이유는 파이어베이스가 로그인한 초기화되고 모든 걸 로드 할때까지 기다리지 않기 때문이다. 
- 즉, 지금 현재 로그인한 유저의 정보를 알아내기 위해서 사용하는 것이다.

## 학습하면서 어려웠던 점
### github 로그인 시 발생한 오류
- firebase github으로 가입을 시도하고자 할때, 다음과 같은 오류가 발생했다.

```bash
assert.ts:136 Uncaught (in promise) FirebaseError: Firebase: Error (auth/account-exists-with-different-credential).
```
### 문제해결 방법
- 이메일 주소당 계정을 1개를 사용설정을 해서 나타난 에러였다. 즉 깃헙아이디과 구글의 아이디가 같아서 발생한 문제였다. 
- firebase의 설정으로 가 사용자 계정 연결에 ID 공급업체별로 여러 계정 만들기 로 저장한다. 

