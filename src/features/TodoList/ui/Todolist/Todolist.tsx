import React, { useState, useEffect } from "react";
import classNames from "classnames";
import {
	changeTaskStatus,
	clearActiveItems,
	deleteTask,
	reorderItems,
	selectTasks,
	setOrderItem,
	setReorderItems,
	Task,
} from "features/TodoList/model/todolistReducer";
import { Button } from "shared/ui/Button/Button";
import { useAppSelector } from "app/common/hooks/useAppSelector";
import { useAppDispatch } from "app/common/hooks/useAppDispatch";
import { FilterCategory, TodoFilter } from "../TodoFilter/TodoFilter";

type Props = {
	classList: string;
};

export const TodoList = React.memo(({ classList }: Props) => {
	let data = useAppSelector((state) => selectTasks({ todolist: state.todolist }));
	const [category, setCategory] = useState<FilterCategory>("all");
	const [checked, setChecked] = useState(false);

	const dispatch = useAppDispatch();

	const onItemCheck = (id: string, checked: boolean) => {
		dispatch(changeTaskStatus({ id, checked: !checked }));
	};

	let reorderList = useAppSelector((state) => state.todolist.reorderItem);

	function dragStartHandler(item: Task) {
		dispatch(setReorderItems({ reorderItem: item }));
	}

	function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
		e.preventDefault();
	}

	function dropHandler(e: React.DragEvent<HTMLLIElement>, item: Task) {
		e.preventDefault();

		dispatch(setOrderItem({ orderItem: item }));
		dispatch(reorderItems({ orderItem: item, reorderItem: reorderList }));
	}

	function deleteItem(id: string) {
		dispatch(deleteTask({ id }));
	}

	function clearCompletedItems() {
		dispatch(clearActiveItems());
	}

	const todoList = data.filter((item) => {
		if (category === "completed") {
			return item.completed;
		}
		if (category === "active") {
			return !item.completed;
		}
		return item;
	});

	return (
		<div className="todo__content">
			<ul className="todo__list">
				{todoList.map((item) => {
					return (
						<li
							className={classNames(classList, item.completed ? "completed" : "")}
							key={item.id}
							onDragStart={() => {
								dragStartHandler(item);
							}}
							onDragOver={(e) => {
								dragOverHandler(e);
							}}
							onDrop={(e) => {
								dropHandler(e, item);
							}}
							draggable
						>
							<label className="todo__create-container">
								<input
									type="checkbox"
									className="todo__check"
									checked={item.completed}
									onChange={() => onItemCheck(item.id, item.completed)}
								/>
								<div className="todo__false-check">
									<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
										<path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
									</svg>
								</div>
								<div className="todo__text">{item.text}</div>
								<Button
									classList={["todo__delete-btn"]}
									text={
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
											<path
												fill="#494C6B"
												fillRule="evenodd"
												d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
											/>
										</svg>
									}
									clickHandler={() => deleteItem(item.id)}
								/>
							</label>
						</li>
					);
				})}
			</ul>
			<div className="todo__control">
				<div className="todo__numb">{todoList.length} items left</div>
				<TodoFilter category={category} setCategory={setCategory} />
				<div className="todo__clear">
					<Button classList={["todo__clear-btn", "btn"]} text="Clear completed" clickHandler={clearCompletedItems} />
				</div>
			</div>
		</div>
	);
});
