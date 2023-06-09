import { useDispatch } from "react-redux";
import { getAllTodos } from "../store/todoSlice";

const NextBtn = ({ dispatch, page }) => (
  <li>
    <button
      onClick={() => dispatch(getAllTodos({ page: page + 1 }))}
      className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3"
    >
      Вперед
    </button>
  </li>
);
const BackBtn = ({ dispatch, page }) => (
  <li>
    <button
      onClick={() => dispatch(getAllTodos({ page: page - 1 }))}
      className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 "
    >
      Назад
    </button>
  </li>
);
const ElItemPage = ({ dispatch, el, page }) => (
  <li>
    <button
      onClick={() => dispatch(getAllTodos({ page: el }))}
      className={
        page === el
          ? "bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700  py-2 px-3 "
          : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0  leading-tight py-2 px-3"
      }
    >
      {el}
    </button>
  </li>
);
const PaginationContainer = ({ children }) => (
  <nav className=" flex justify-center">
    <ul className="flex flex-warp  -space-x-px my-4 rounded-lg">{children}</ul>
  </nav>
);
const TotalPages = ({ children }) => (
  <span className="pl-4">Страниц: {children}</span>
);

const TodoPagination = ({ totalPages, page }) => {
  const dispatch = useDispatch();
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <PaginationContainer>
      <BackBtn dispatch={dispatch} page={page} />
      {pageNumbers.map((el) => (
        <ElItemPage dispatch={dispatch} el={el} page={page} key={el} />
      ))}
      {page < totalPages && <NextBtn dispatch={dispatch} page={page} />}
      <TotalPages>{totalPages}</TotalPages>
    </PaginationContainer>
  );
};
export { TodoPagination };
