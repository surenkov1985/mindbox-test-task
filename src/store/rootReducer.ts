import todolistReducer, { todolistPath } from "features/TodoList/model/todolistReducer";
import { combineReducers } from "redux";
import themeReducer, { themePath } from "./themeReducer";

export const rootReducer = combineReducers({
	[themePath]: themeReducer,
	[todolistPath]: todolistReducer,
});
