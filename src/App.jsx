import { useState } from "react";
import { useTodos } from "./hook/useTodos";

import { InputField } from "./components/InputField";
import { TodoList } from "./components/TodoList";
import { TodoPagination } from "./components/TodoPagination";
import { TodoLogin } from "./components/TodoLogin";

const App = () => {
  const [isOpenLogin, setisOpenLogin] = useState(false);
  const todos = useTodos();
  return (
    <>
      {isOpenLogin && (
        <TodoLogin
          setisOpenLogin={setisOpenLogin}
          isOpenLogin={setisOpenLogin}
          isAuth={todos.isAuth}
          message={todos.message}
        />
      )}
      {todos && (
        <>
          <InputField
            setisOpenLogin={setisOpenLogin}
            isOpenLogin={isOpenLogin}
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
