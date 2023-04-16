import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllTodos } from "../store/todoSlice";
import { TodoItem } from "./TodoItem";

const ThTable = ({ children, nameSort }) => {
  const dispatch = useDispatch();
  const [isOrder, setisOrder] = useState(-1);
  let sort = () => {
    if (nameSort === "complited") {
      dispatch(getAllTodos({ sort: isOrder, name: "complited" }));
    } else if (nameSort === "userName") {
      dispatch(getAllTodos({ sort: isOrder, name: "userName" }));
    }else if (nameSort === "еmail") {
        dispatch(getAllTodos({ sort: isOrder, name: "еmail" }));
      }
    if (isOrder === -1) {
      setisOrder(+1);
    } else if (isOrder === 1) {
      setisOrder(-1);
    }
  };
  return (
    <th className="p-2 border-r cursor-pointer text-sm font-thin text-gray-500">
      <div className="flex items-center justify-center" onClick={sort}>
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </div>
    </th>
  );
};
const TodoList = ({ todos }) => {
  return (
    <table className="table w-full p-2 border">
      <thead>
        <tr className="bg-gray-50 border-b">
          <ThTable nameSort={"complited"}>завершено</ThTable>
          <ThTable nameSort={"userName"}>имя пользователя</ThTable>
          <ThTable nameSort={"еmail"}>еmail</ThTable>
          <ThTable>текст задачи</ThTable>
          <ThTable>статус</ThTable>
          <ThTable>действие</ThTable>
        </tr>
      </thead>
      <tbody>
        {todos.todos.docs &&
          todos.todos.docs.map((todo) => (
            <TodoItem key={todo._id} {...todo} isAuth={todos.isAuth} />
          ))}
      </tbody>
    </table>
  );
};
export { TodoList };
