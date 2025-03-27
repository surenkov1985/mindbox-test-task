import { CreateTaskForm } from "features/TodoList/ui/CreateTaskForm/CreateTaskForm";
import { TodoList } from "features/TodoList/ui/Todolist/Todolist";
import React from "react";
import Header from "./ui/Header/Header";

export const App = () => {
	return (
		<div className="container">
			<div className="background">
				<div className="background__img"></div>
			</div>
			<div className="container__todo todo">
				<div className="todo__block">
					<Header />
					<div className="todo__main">
						<div className="todo__create">
							<CreateTaskForm />
						</div>
						<TodoList classList="todo__item" />
					</div>
					<div className="todo__foot">Drag and drop to reorder list</div>
				</div>
			</div>
		</div>
	);
};
