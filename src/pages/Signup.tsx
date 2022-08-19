import { useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import Swal from "sweetalert2";
import Input from "../components/Input";
import {
  Button,
  ButtonWrapper,
  Form,
  FormWrapper,
  Img,
  ImgWrapper,
  InputTitle,
  InputWrapper,
  LoginBox,
  Title,
  TitleWrapper,
} from "./Login";

interface IModal {
  open: boolean;
  onClose: Function;
}

const SingupBox = styled.div`
  background-color: #ffffff;
  color: #424242;
  width: 100%;
  height: 100%;
  padding: 16px 16px;
  position: relative;
`;
const AlertBox = styled.div`
  margin-bottom: 32px;
  margin-top: 0px;
`;
const Alert = styled.span`
  display: inline-block;
  position: absolute;
  font-size: 14px;
  color: red;
  margin-top: 2px;
`;

const LogoImgWrapper = styled.div`
  position: absolute;
  left: 30%;
  bottom: 0;
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img.attrs({
  src: `${process.env.PUBLIC_URL}/wanted.png`,
})`
  width: 130px;
  height: auto;
`;
function Signup({ open, onClose }: IModal) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      padding: "32px",
      paddingBottom: "0px",
      transform: "translate(-50%, -50%)",
      width: "400px",
      height: "480px",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      color: "#424242",
    },
    overlay: {
      backgroundColor: "#89aaff",
    },
  };

  const closeModal = () => {
    setModalIsOpen(false);
    onClose();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "회원가입",
      text: "회원가입 하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        const data = { email, password };
        fetch(`${process.env.REACT_APP_BASE_URL}auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (res.access_token !== undefined) {
              // if(res.statusCode === )
              Swal.fire(
                "가입성공",
                "회원가입에 성공하셨습니다. 해당 정보로 로그인해주세요.",
                "success"
              );
              closeModal();
            } else if (res.statusCode === 400) {
              Swal.fire(
                "가입실패",
                `${res.message} 다시 회원가입해주세요.`,
                "error"
              );
            } else {
              Swal.fire(
                "가입실패",
                "회원가입에 실패하셨습니다. 다시 회원가입해주세요.",
                "error"
              );
            }
          })
          .catch((error) => {
            Swal.fire(
              "가입실패",
              "회원가입에 실패하셨습니다. 다시 회원가입해주세요.",
              "error"
            );
          });
      }
    });
  };
  // 추가로 validation 적용하기
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (emailRegex.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/;
    if (passwordRegex.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <SingupBox>
        <TitleWrapper>
          <Title>Signup</Title>
        </TitleWrapper>
        <FormWrapper>
          <Form onSubmit={onSubmit}>
            <InputWrapper>
              <InputTitle>이메일</InputTitle>
              <Input type="text" value={email} onChange={onChangeEmail} />
              <AlertBox>
                {email ? (
                  !isEmailValid && <Alert>이메일 양식을 지켜주세요.</Alert>
                ) : (
                  <Alert>이메일을 입력해주세요.</Alert>
                )}
              </AlertBox>
            </InputWrapper>
            <InputWrapper>
              <InputTitle>비밀번호</InputTitle>
              <Input
                type="password"
                value={password}
                onChange={onChangePassword}
              />
              <AlertBox>
                {password ? (
                  !isPasswordValid && (
                    <Alert>
                      비밀번호는 최소 8자, 문자와 숫자 그리고 특수 문자가 최소한
                      하나씩 있어야 합니다.
                    </Alert>
                  )
                ) : (
                  <Alert>비밀번호를 입력해주세요.</Alert>
                )}
              </AlertBox>
            </InputWrapper>
            <ButtonWrapper>
              {isPasswordValid && isEmailValid && <Button>Singup</Button>}
            </ButtonWrapper>
          </Form>
        </FormWrapper>
        <LogoImgWrapper>
          <LogoImg />
        </LogoImgWrapper>
      </SingupBox>
    </ReactModal>
  );
}
ReactModal.setAppElement("#root");
export default Signup;
