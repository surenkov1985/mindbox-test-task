import { createSlice } from "@reduxjs/toolkit";
import uniqid from "uniqid";

export type Task = {
	id: string;
	completed: boolean;
	text: string;
};

type TodoList = {
	tasks: Task[];
	active: boolean;
	id: string;
	order: unknown;
	reorderItem: any;
	orderItem: any;
	numbItems: number;
};

const todos: Task[] = [];
const initialState = {
	tasks: todos as Task[],
	active: false,
	id: "",
	order: null,
	reorderItem: null,
	orderItem: null,
	numbItems: todos.length,
};

const todolistSlice = createSlice({
	name: "todolist",
	initialState: initialState as TodoList,
	reducers: {
		addTask: (state, action) => {
			const task = {
				id: uniqid(),
				completed: action.payload.checked,
				text: action.payload.text,
			};

			state.tasks.unshift(task);
		},
		changeTaskStatus: (state, action) => {
			const taskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);

			if (taskIndex !== -1) {
				state.tasks[taskIndex].completed = action.payload.checked;
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
		clearActiveItems: (state) => {
			state.tasks = state.tasks.filter((item) => {
				return !item.completed;
			});
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
		},
	},
	selectors: {
		selectTasks: (state) => state.tasks,
	},
});

export const { addTask, changeTaskStatus, reorderItems, setOrderItem, setReorderItems, clearActiveItems, deleteTask } = todolistSlice.actions;
export const { selectTasks } = todolistSlice.selectors;

export const todolistPath = todolistSlice.reducerPath;

export default todolistSlice.reducer;
