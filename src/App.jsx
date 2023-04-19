import { useTodos } from "./hook/useTodos";

import { InputField } from "./components/InputField";
import { TodoList } from "./components/TodoList";
import { TodoPagination } from "./components/TodoPagination";
import { TodoLogin } from "./components/TodoLogin";

const App = () => {
  const todos = useTodos();
  return (
    <>
      {todos.isOpenLogin && (
        <TodoLogin
          message={todos.message}
        />
      )}
      {todos && (
        <>
          <InputField
            isAuth={todos.isAuth}
            message={todos.message}
          />
          <TodoList todos={todos} />
          <TodoPagination {...todos.todos} />
        </>
      )}
    </>
  );
};

export default App;
