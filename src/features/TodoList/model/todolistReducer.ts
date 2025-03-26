import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";

export type Task = {
	id: string;
	checked: boolean;
	completed: string;
	text: string;
};

type TodoList = {
	tasks: Task[];
	text: string;
	active: boolean;
	className: string;
	id: string;
	order: unknown;
	reorderItem: any;
	orderItem: any;
	deletedItemId: string;
	numbItems: number;
};

const todos: Task[] = [];
const initialState = {
	tasks: todos as Task[],
	text: "",
	active: false,
	className: "",
	id: "",
	order: null,
	reorderItem: null,
	orderItem: null,
	deletedItemId: "",
	numbItems: todos.length,
};

const todolistSlice = createSlice({
	name: "todolist",
	initialState: initialState as TodoList,
	reducers: {
		addTask: (state, action) => {
			const task = {
				id: uniqid(),
				checked: false,
				completed: action.payload.active,
				text: action.payload.text,
			};

			state.tasks.unshift(task);
		},
		changeTaskStatus: (state, action) => {
			const taskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);

			if (taskIndex !== -1) {
				state.tasks[taskIndex].checked = action.payload.checked;
			}
		},
		setReorderItems: (state, action) => {
			state.reorderItem = action.payload.reorderItem;
		},
		setOrderItem: (state, action) => {
			state.orderItem = action.payload.orderItem;
		},
		reorderItems: (state, action) => {
			state.tasks = state.tasks.map((todo) => {
				if (todo.id === action.payload.orderItem.id) {
					return action.payload.reorderItem;
				} else if (todo.id === action.payload.reorderItem.id) {
					return action.payload.orderItem;
				}

				return todo;
			});
		},
	},
	selectors: {
		selectTasks: (state) => state.tasks,
	},
});

export const { addTask, changeTaskStatus, reorderItems, setOrderItem, setReorderItems } = todolistSlice.actions;
export const { selectTasks } = todolistSlice.selectors;

export const todolistPath = todolistSlice.reducerPath;

export default todolistSlice.reducer;

// export const createItemReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case INPUT_TEXT:
// 			return { ...state, text: action.text };
// 		case TOGGLE_CLASS:
// 			if (!action.active) {
// 				return { ...state, className: (state.className = "active"), active: action.active };
// 			} else {
// 				return {
// 					...state,
// 					className: (state.className = ""),
// 					active: action.active,
// 				};
// 			}
// 		case TOGGLE_ITEM_CLASS:
// 			return {
// 				...state,
// 				data: state.data.map((item) => {
// 					if (!action.active && item.id === action.id) {
// 						return { ...item, completed: "active", checked: !action.active };
// 					} else if (action.active && item.id === action.id) {
// 						return { ...item, completed: "", checked: !action.active };
// 					}

// 					return item;
// 				}),
// 				active: !action.active,
// 			};
//
// 		case CLEAR_ACTIVE_ITEMS:
// 			return {
// 				...state,
// 				data: state.data.filter((item) => {
// 					return !item.completed.length;
// 				}),
// 			};
// 		case SET_DELETE_ITEM:
// 			return {
// 				...state,
// 				deletedItemId: action.deletedItemId,
// 			};
// 		case DELETE_ITEM:
// 			return {
// 				...state,
// 				data: action.data.filter((todo) => {
// 					return todo.id !== state.deletedItemId;
// 				}),
// 			};
// 		case SET_NUMB_ITEMS:
// 			return {
// 				...state,
// 				numbItems: action.numbItems !== undefined ? action.numbItems : state.data.length,
// 			};

// 		default:
// 			return state;
// 	}
// };
