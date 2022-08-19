interface ITodo {
  todo: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onCreate: React.FormEventHandler<HTMLFormElement>;
}
function CreateTodo({ todo, onChange, onCreate }: ITodo) {
  return (
    <div>
      <form onSubmit={onCreate}>
        <input type="text" value={todo} onChange={onChange} />
        <button>등록</button>
      </form>
    </div>
  );
}

export default CreateTodo;
