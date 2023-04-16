import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllTodos } from "../store/todoSlice";

const useTodos = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos || []);
  useEffect(() => {
    dispatch(getAllTodos());
  }, [dispatch]);
  if(todos)return todos;
};
export { useTodos };
