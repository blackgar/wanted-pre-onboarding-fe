import { useState } from "react";
import styled from "styled-components";
import { ITodos } from "./Todo";

interface ITodoItem {
  task: ITodos;
  onRemove: Function;
  onTodoChange: Function;
}

function Item({ task, onRemove, onTodoChange }: ITodoItem) {
  const { id, todo, isCompleted, userId } = task;
  const [active, setActive] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [completion, setCompletion] = useState(isCompleted);
  return (
    <Container>
      <TodoListWrapper>
        <h4>{todo}</h4>
        {active ? (
          <div>
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewTitle(e.target.value)
              }
            />
            <button
              onClick={() => {
                onTodoChange(id, newTitle, completion);
                setActive(false);
              }}
            >
              수정완료
            </button>
          </div>
        ) : (
          <button onClick={() => setActive(true)}>수정</button>
        )}
        <button onClick={() => setCompletion(!isCompleted)}>완료</button>
        <button onClick={() => onRemove(id)}>삭제</button>
      </TodoListWrapper>
    </Container>
  );
}

const Container = styled.div``;

const TodoListWrapper = styled.div`
  display: flex;
`;

export default Item;
