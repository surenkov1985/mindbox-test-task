import { configureStore } from "@reduxjs/toolkit";
import todolistReducer, { todolistPath } from "features/TodoList/model/todolistReducer";
import themeReducer, { themePath } from "./themeReducer";

export const store = configureStore({
	reducer: {
		[themePath]: themeReducer,
		[todolistPath]: todolistReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
