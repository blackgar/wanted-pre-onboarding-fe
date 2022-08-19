import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { LoginBox, Title, TitleWrapper } from "../Login";
import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

export interface ITodos {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
const TodoBox = styled(LoginBox)`
  width: 500px;
  height: 700px;
`;

function Todo() {
  const token = localStorage.getItem("accessToken");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  const getTodos = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setTodoList(res));
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const createTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
      .then((res) => res.json())
      .then(() => {
        getTodos();
        setTodo("");
      });
  };

  const updateTodo = (
    type: string,
    taskId: number,
    content: string,
    completion: boolean
  ) => {
    if (type === "checkbox" && completion) {
      fetch(`${process.env.REACT_APP_BASE_URL}todos/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ todo: content, isCompleted: completion }),
      })
        .then((res) => res.json())
        .then((res) => {
          getTodos();
          Swal.fire("수정완료", "완료처리하였습니다.", "success");
        });
    } else if (type === "text") {
      fetch(`${process.env.REACT_APP_BASE_URL}todos/${taskId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ todo: content, isCompleted: completion }),
      })
        .then((res) => res.json())
        .then((res) => {
          getTodos();
          Swal.fire("수정완료", "할 일을 수정했습니다.", "success");
        });
    }
  };

  const onRemove = (taskId: number) => {
    Swal.fire({
      title: "삭제요청",
      text: "할 일을 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        fetch(`${process.env.REACT_APP_BASE_URL}todos/${taskId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(() => {
          getTodos();
          Swal.fire("삭제완료", "할 일을 삭제했습니다.", "warning");
        });
      }
    });
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <Container>
      <TitleWrapper>
        <Title>TodoList</Title>
      </TitleWrapper>
      <TodoBox>
        <CreateTodo todo={todo} onChange={onChange} onCreate={createTodo} />
        <TodoList
          todos={todoList!}
          onRemove={onRemove}
          onTodoChange={updateTodo}
        />
      </TodoBox>
    </Container>
  );
}

export default Todo;
