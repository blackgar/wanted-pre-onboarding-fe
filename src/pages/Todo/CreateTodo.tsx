import styled from "styled-components";
import Input from "../../components/Input";
import {
  Button,
  ButtonWrapper,
  Form,
  FormWrapper,
  InputWrapper,
} from "../Login";

interface ITodo {
  todo: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onCreate: React.FormEventHandler<HTMLFormElement>;
}

const Container = styled.div``;

const TodoForm = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TodoButton = styled(Button)`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  font-size: 50px;
  font-weight: normal;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

function CreateTodo({ todo, onChange, onCreate }: ITodo) {
  return (
    <Container>
      <TodoForm onSubmit={onCreate}>
        <InputWrapper style={{ width: "80%", margin: "0px 16px" }}>
          <Input type="text" value={todo} onChange={onChange} />
        </InputWrapper>
        <ButtonWrapper style={{ height: "100px", marginTop: "0" }}>
          <TodoButton>+</TodoButton>
        </ButtonWrapper>
      </TodoForm>
    </Container>
  );
}

export default CreateTodo;
