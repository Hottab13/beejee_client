import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addTodo, logout, setIsOpenLogin } from "../store/todoSlice";
import { ErrorsSpan } from "./TodoLogin";

export const AlertSuccess = ({ message }) => (
  <div
    className="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700"
    role="alert"
  >
    <svg
      className="w-5 h-5 inline mr-3"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      ></path>
    </svg>
    <div>{message && <span className="font-medium">{message}</span>}</div>
  </div>
);

const InputField = ({ isAuth, message }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const addTask = (data) => {
    dispatch(addTodo(data));
    reset();
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(addTask)}
        autoComplete="off"
        className="flex justify-center py-10 "
      >
        <label>
          <input
            {...register("userName", {
              required: "Обязательное поле!",
              maxLength: {
                value: 50,
                message: "Максимум 100 символов!",
              },
            })}
            className="input"
            placeholder="имя пользователя"
          />
          <ErrorsSpan errors={errors?.userName} />
          <input
            {...register("еmail", {
              required: "Обязательное поле!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Некоректный email",
              },
            })}
            className="input"
            placeholder="еmail"
          />
          <ErrorsSpan errors={errors?.еmail} />
          <input
            {...register("text", {
              required: "Обязательное поле!",
            })}
            className="input"
            placeholder="текст задачи"
          />
          <ErrorsSpan errors={errors?.text} />
          <button className="input-btn" onClick={handleSubmit}>
            сохранить задачу
          </button>
          {isAuth ? (
            <span onClick={() => dispatch(logout())} className="input-btn">
              выйти
            </span>
          ) : (
            <span
              onClick={() => dispatch(setIsOpenLogin())}
              className="input-btn"
            >
              авторизоваться
            </span>
          )}
        </label>
      </form>
      {message && <AlertSuccess message={message} />}
    </>
  );
};
export { InputField };
