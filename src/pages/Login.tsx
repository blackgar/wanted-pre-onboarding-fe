import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import Input from "../components/Input";
import Signup from "./Signup";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: center; /* 수평 정렬 */
`;
export const LoginBox = styled.div`
  width: 400px;
  height: 450px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 64px 32px;
  color: #424242;
  position: relative;
  /* display: flex; */
  /* flex-direction: column; */
  /* @media screen and (max-width: 767px) {
    width: 50%;
  } */
`;
export const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;
export const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;
export const Form = styled.form`
  width: 100%;
`;
export const InputWrapper = styled.div``;
export const InputTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  margin-top: 16px;
`;

const SingupWrapper = styled.div`
  text-align: center;
  height: 40px;
  margin-top: 16px;
`;
const SingupSentence = styled.span``;
const Linkto = styled(Link)`
  color: #4d7fff;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  height: 150px;
`;
export const Button = styled.button`
  height: 50px;
  width: 250px;
  border: 0;
  border-radius: 20px;
  background-color: #4d7fff;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  margin-top: 8px;
  cursor: pointer;
`;
export const ImgWrapper = styled.div`
  position: absolute;
  left: 33%;
  bottom: 0;
  display: flex;
  justify-content: center;
`;
export const Img = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/wanted.png`,
})`
  width: 130px;
  height: auto;
`;

function Login() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const onClick = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    fetch(`${process.env.REACT_APP_BASE_URL}auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        localStorage.setItem("accessToken", res.access_token);
        if (res.statusCode === 401) {
          Swal.fire(
            "비밀번호 오류",
            "비밀번호가 맞지 않습니다. 다시 입력해주세요.",
            "error"
          );
        } else if (res.statusCode === 404) {
          Swal.fire({
            title: "없는 사용자",
            text: "가입한 적 없는 이메일입니다. 회원가입하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "가입",
            cancelButtonText: "취소",
          }).then((res) => {
            if (res.isConfirmed) {
              setOpenModal(true);
            }
          });
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // 추가로 validation 적용하기
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /@/;
    if (emailRegex.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };
  return (
    <Container>
      <LoginBox>
        <TitleWrapper>
          <Title>Login</Title>
        </TitleWrapper>
        <FormWrapper>
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <InputTitle>이메일</InputTitle>
              <Input type="text" value={email} onChange={onChangeEmail} />
            </InputWrapper>
            <InputWrapper>
              <InputTitle>비밀번호</InputTitle>
              <Input
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </InputWrapper>
            <ButtonWrapper>
              {isPasswordValid && isEmailValid && <Button>Login</Button>}
              {isEmailValid || (
                <>
                  <SingupWrapper>
                    <SingupSentence>만약 계정이 없으시다면 </SingupSentence>
                    <Linkto to="/" onClick={onClick}>
                      회원가입
                    </Linkto>
                    <SingupSentence> 해주세요</SingupSentence>
                  </SingupWrapper>
                </>
              )}
            </ButtonWrapper>
          </Form>
        </FormWrapper>

        {/* <button>Singup</button> */}
        {openModal && <Signup open={openModal} onClose={closeModal} />}
        <ImgWrapper>
          <Img />
        </ImgWrapper>
      </LoginBox>
    </Container>
  );
}

export default Login;
