import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (payload, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/get-todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не удалось получить события!");
    }
    return await response.json();
  }
);
export const login = createAsyncThunk(
  "todo/login",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не удалось авторизоваться!");
    }
    return await response.json();
  }
);
export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/add-todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не удалось добавить задачу!");
    }
    const result = await response.json();
    return result;
  }
);
export const removeTodo = createAsyncThunk(
  "todo/removeTodo",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/remove-todo`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(id),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не удалось создать задачу!");
    }
    return id;
  }
);
export const toggleTodoComplited = createAsyncThunk(
  "todo/toggleTodoComplited",
  async (id, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/togge-todo-complited`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(id),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не удалось завершитть задачу!");
    }
    return id;
  }
);
export const editText = createAsyncThunk(
  "todo/editText",
  async (data, { rejectWithValue }) => {
    const response = await fetch(`${API_URL}/edit-text`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if (response.statusText !== "OK") {
      return rejectWithValue("Не изменить текст задачи!");
    }
    return await response.json();
  }
);

const initialState = {
  todos: [],
  status: "",
  isAuth: false,
  message: null,
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos = action.payload.todos;
      })
      .addCase(toggleTodoComplited.fulfilled, (state, action) => {
        state.status = "resolved";
        const toggleTodo = state.todos.docs.find(
          (todo) => todo._id === action.payload._id
        );
        toggleTodo.complited = !toggleTodo.complited;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "resolved";
        if (action.payload) {
          state.isAuth = true;
        } else {
          state.message = "неправильные реквизиты доступа";
        }
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos.docs.push({
          _id: action.payload._id,
          userName: action.payload.userName,
          еmail: action.payload.еmail,
          text: action.payload.text,
          complited: action.payload.complited,
          editedAdmin: action.payload.editedAdmin,
        });
        state.message = "Задача успешно добавлена!";
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.status = "resolved";
        state.todos = state.todos.docs.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(editText.fulfilled, (state, action) => {
        state.status = "resolved";
        const editAdminTodo = state.todos.docs.find(
          (todo) => todo._id === action.payload._id
        );
        editAdminTodo.text = action.payload.text;
        editAdminTodo.complited = action.payload.complited;
        editAdminTodo.editedAdmin = action.payload.editedAdmin;
      })
      .addMatcher(isRejected, (state) => {
        state.status = "rejected";
      })
      .addMatcher(isPending, (state) => {
        state.message = null;
        state.status = "loading";
      });
  },
});

export const { logout } = todoSlice.actions;

export default todoSlice.reducer;
