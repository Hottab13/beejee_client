import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { editText, removeTodo, toggleTodoComplited } from "../store/todoSlice";

const TdTable = ({ children, complited }) => (
  <td className={complited ? "p-2 bg-green-400 border-r" : "p- border-r"}>
    {children}
  </td>
);
const FormText = ({ text, setisText, isText, _id }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text,
    },
  });
  const hendleText = (text) => {
    const data = {
      _id,
      text: text.text,
    };
    dispatch(editText(data));
    setisText(!isText);
  };
  return (
    <form onSubmit={handleSubmit(hendleText)}>
      <input
        {...register("text", {
          maxLength: {
            value: 50,
            message: "Максимум 100 символов!",
          },
        })}
        className="input"
      />
      <input type="submit" className="hidden" />
    </form>
  );
};

const TodoItem = ({
  complited,
  editedAdmin,
  userName,
  еmail,
  text,
  _id,
  isAuth,
}) => {
  const dispatch = useDispatch();
  const [isText, setisText] = useState(false);
  return (
    <tr className="bg-gray-100 text-center border-b text-sm text-gray-600">
      <TdTable complited={complited}>
        {isAuth && (
          <input
            type="checkbox"
            checked={complited}
            onChange={() => dispatch(toggleTodoComplited({ _id }))}
          />
        )}
      </TdTable>
      <TdTable complited={complited}>{userName}</TdTable>
      <TdTable complited={complited}>{еmail}</TdTable>
      <TdTable complited={complited}>
        {isText ? (
          <FormText
            text={text}
            _id={_id}
            setisText={setisText}
            isText={isText}
          />
        ) : (
          text
        )}
      </TdTable>
      <TdTable complited={complited}>
        {complited && "выполнено"}
        {" /"}
        {editedAdmin && "отредактировано администратором"}
      </TdTable>
      {isAuth && (
        <TdTable>
          {!isText && (
            <button
              onClick={() => setisText(!isText)}
              className="bg-blue-500 p-2 text-white hover:shadow-lg text-xs font-thin"
            >
              Редактировать текст
            </button>
          )}

          <button
            onClick={() => dispatch(removeTodo({ _id }))}
            className="bg-red-500 ml-5 p-2 text-white hover:shadow-lg text-xs font-thin"
          >
            Удалить
          </button>
        </TdTable>
      )}
    </tr>
  );
};
export { TodoItem };
