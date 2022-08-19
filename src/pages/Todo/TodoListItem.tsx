import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import { ITodos } from "./Todo";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";

interface ITodoItem {
  task: ITodos;
  onRemove: Function;
  onTodoChange: Function;
}

const Container = styled.div``;

const TodoListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.div``;

const CheckBox = styled(Checkbox)``;

const TodoTitle = styled.div`
  font-size: 18px;
`;
const DoneTitle = styled(TodoTitle)`
  text-decoration: line-through;
  color: #c7c7c7;
`;
const EditButton = styled.button`
  border: 0;
  border-radius: 10px;
  width: 35px;
  height: 35px;
  background-color: #4d7fff;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  margin-right: 4px;
  cursor: pointer;
`;
const RemoveButton = styled(EditButton)`
  background-color: #d33;
`;

function Item({ task, onRemove, onTodoChange }: ITodoItem) {
  const { id, todo, isCompleted, userId } = task;
  const [active, setActive] = useState(false);
  const [newTitle, setNewTitle] = useState(todo);
  const [completion, setCompletion] = useState(isCompleted);

  const onComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletion(e.target.checked);
    onTodoChange("checkbox", id, newTitle, e.target.checked);
  };
  const onEdit = () => {
    Swal.fire({
      title: "수정요청",
      text: "입력하신 내용으로 수정하시겠습니까?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "수정",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        setActive(false);
        onTodoChange("text", id, newTitle, completion);
      }
    });
  };
  const askEdit = () => {
    setActive(true);
  };
  const askRemove = (id: number) => {
    onRemove(id);
  };

  return (
    <Container>
      <TodoListWrapper>
        <TodoWrapper>
          <CheckBox
            defaultChecked={completion}
            // checked={completion}
            // sx={{ width: "30px", height: "30px" }}
            onChange={onComplete}
          />
          {active ? (
            <Input
              type="text"
              value={newTitle}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTitle(e.target.value)
              }
            />
          ) : completion ? (
            <DoneTitle>{todo}</DoneTitle>
          ) : (
            <TodoTitle>{todo}</TodoTitle>
          )}
        </TodoWrapper>
        <ButtonWrapper>
          {active ? (
            <>
              <EditButton onClick={onEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </EditButton>
              <RemoveButton onClick={() => setActive(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </RemoveButton>
            </>
          ) : (
            <>
              <EditButton onClick={askEdit}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </EditButton>
              <RemoveButton onClick={() => askRemove(id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </RemoveButton>
            </>
          )}
        </ButtonWrapper>
      </TodoListWrapper>
    </Container>
  );
}

export default Item;
