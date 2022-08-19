import { ITodos } from "./Todo";
import Item from "./TodoListItem";
interface ITodoList {
  todos: ITodos[];
  onRemove: Function;
  onTodoChange: Function;
}

function TodoList({ todos, onRemove, onTodoChange }: ITodoList) {
  return (
    <div>
      <>
        {todos ? (
          todos.map((todo, idx) => (
            <Item
              key={idx}
              task={todo}
              onRemove={onRemove}
              onTodoChange={onTodoChange}
            />
          ))
        ) : (
          <div>할 일을 등록해주세요</div>
        )}
      </>
    </div>
  );
}

export default TodoList;
