import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/todoSlice";

export const ErrorsSpan = ({ errors }) =>
  errors && (
    <span className="ml-3 text-sm font-bold text-red-400 tracking-wide">
      {errors?.message || errors || "Ошибка!"}
    </span>
  );

const TodoLogin = ({ setisOpenLogin, isOpenLogin, isAuth, message }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  if (isAuth) setisOpenLogin(!isOpenLogin);
  const loginForm = (data) => {
    dispatch(login(data));
    reset();
  };
  return (
    <div className=" flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
      <div className=" fixed inset-0 bg-gray-800 opacity-25"></div>
      <div className="bg-white px-16 py-14 rounded-md text-center z-50">
        {message && <ErrorsSpan errors={message} />}
        <form onSubmit={handleSubmit(loginForm)} autoComplete="off">
          <input
            {...register("login", {
              required: "Обязательное поле!",
            })}
            className="input"
            placeholder="admin"
          />
          <ErrorsSpan errors={errors?.login} />
          <input
            {...register("pass", {
              required: "Обязательное поле!",
            })}
            type="password"
            className="input"
            placeholder="123"
          />
          <ErrorsSpan errors={errors?.pass} />
          <button
            onClick={() => setisOpenLogin(!isOpenLogin)}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-md text-white"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
export { TodoLogin };
