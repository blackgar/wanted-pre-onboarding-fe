# 원티드 프리온보딩 프론트엔드 - 선발 과제
이 Repository는 원티드 프리온보딩 프론트엔드 과정 선발 과제 제출을 위해 만들어졌습니다.

## Skill
- React
- typescript
- Styled-components
- react-router-dom
- mui/material
- react-modal
- sweetalert2

## 기능
### 1. 로그인
#### 1)로그인 성공
- 전체적으로 푸른색과 하얀색으로 깔끔하고 편안한 느낌을 주는 UI로 구성
- 최대한 사용자가 쉽게 이용할 수 있도록 화면에 정보 및 UI 구현
- 이메일과 비밀번호를 모두 입력했을 때 Login 창이 보여지도록 구현
- 아무 입력값이 없을때는 회원가입을 유도하는 문구 표시
- 입력을 시작하면 회원가입을 한 사용자라 판단하고 회원가입 문구 제거
- 등록되어 있는 이메일과 비밀번호로 양식을 지켜서 로그인하게 되면 정상적으로 로그인 되어 todolist 페이지로 바로 이동하게 구현
![로그인성공](https://user-images.githubusercontent.com/79856086/185569624-ef14b7a8-e704-4f17-95f7-9b2b4786e70c.gif)

#### 2)로그인(비밀번호 오류, statusCode 401)
- 반환해주는 statusCode를 바탕으로 401을 반환할 경우 비밀번호가 틀렸으므로 비밀번호를 확인하라는 경고 문구를 보여주도록 구현
![로그인(비밀번호 오류)](https://user-images.githubusercontent.com/79856086/185569880-96e59478-703d-4e7a-b0d7-664b1b75c061.gif)

#### 3)로그인(없는 사용자, statusCode 404)
- 반환해주는 statusCode를 바탕으로 404를 반환할 경우 현재 등록되어있지 않은 사용자 이므로 없는 사용자라는 경고를 반환하고 다시 회원가입을 유도
![로그인(없는 사용자)](https://user-images.githubusercontent.com/79856086/185569732-7f39f154-a5a2-48b1-9bbf-4f5f25ff96da.gif)



### 2. 회원가입
#### 1)회원가입 성공
- 로그인 페이지에서 회원가입을 누를경우 Modal로 창을 열어 사전에 Login 창에서 작업한 내용을 해치지 않고 바로 회원가입을 할 수 있도록 구현(react-modal 활용)
- 회원가입의 경우 정규식을 활용해서 이메일과 비밀번호의 유효성을 검증하는데 유효성을 만족하지 못할 때는 양식을 지켜달라는 경고 문구를 Input창 바로 아래에 보여줌으로써 사용자가 바로바로 양식을 맞춰 가입을 진행할 수 있도록 구현
- 양식을 맞춰 모든 입력값을 입력했을 때 회원가입 버튼이 활성화되도록 구현, 경고문구 제거
![회원가입](https://user-images.githubusercontent.com/79856086/185570619-fe21d049-72d7-4277-a7f2-65e9ebc4e32e.gif)

#### 2)회원가입(이미 존재하는 사용자, statusCode 400)
- 로그인과 마찬가지로 statusCode를 바탕으로 400을 반환할 경우 이미 존재하는 사용자가 있다는 것을 사용자에게 알려주고 다른 이메일로 회원가입을 하거나 기존 이메일로 로그인하도록 구현
![회원가입(이미 존재하는 사용자)](https://user-images.githubusercontent.com/79856086/185570749-c5800177-b968-4303-98ed-449a94e393f4.gif)



### 3. TodoList
#### 1)Todo 등록
- Todolist의 경우 상단 박스에 할 일을 입력하고 + 버튼을 누르거나 enter을 누를 경우 Todo가 등록되게 구현
![Todo 등록](https://user-images.githubusercontent.com/79856086/185571145-10fdd912-ee20-496b-84d4-dd1af40db473.gif)

#### 2)Todo 수정
- Todolist의 우측 수정 버튼을 통해 생기는 박스에서 바로바로 변경되는 값을 확인하면서 수정할 수 있도록 구현
- 수정완료 시 진짜 수정할 것인지에 대한 알림을 통해 확인기능 구현
- 수정을 하지 않을 때는 취소할 수 있는 취소 버튼 구현
![Todo 수정](https://user-images.githubusercontent.com/79856086/185571203-ba7ac16b-65da-465b-b9db-e3b1dd5b21b2.gif)

#### 3)Todo 삭제
- Todolist 우측 삭제 버튼을 통해 Todo 삭제 기능 구현
- 삭제 시 진짜 삭제할 것인지에 대한 알림을 통한 확인기능 구현
- 삭제 하지 않을 떄는 취소버튼을 통해 삭제하지 않을 수 있는 기능 구현
![Todo 삭제](https://user-images.githubusercontent.com/79856086/185571457-2ac9bce6-897b-43d0-b9b1-1ec6c80d1d19.gif)

#### 4)Todo 완료
- Todolist 좌측 체크박스를 통해 Todo 완료 여부 표시 기능 구현
- 체크할 경우 완료된 상태로 변경되었다는 알림 표시 및 Todo 중간선 구현
![Todo 완료](https://user-images.githubusercontent.com/79856086/185571652-38a28b1c-d401-4ab5-9cdb-aa5515390677.gif)



## 실행 방법
```
npm i 
npm start
```





