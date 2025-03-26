import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { reorderItems, setOrderItem, setReorderItems, Task } from "features/TodoList/model/todolistReducer";
import { Button } from "shared/ui/Button/Button";
import { useAppSelector } from "app/common/hooks/useAppSelector";
import { useAppDispatch } from "app/common/hooks/useAppDispatch";

type Props = {
	deleteItem: (key: string, todolist: Task[]) => void;
	classList: string;
	onCheck: (id: string, checked: boolean) => void;
	category: string;
	data: Task[];
};

export const TodoList = ({ deleteItem, classList, onCheck, category, data }: Props) => {
	const [todoList, setTodoList] = useState(data);

	let reorderList = useAppSelector((state) => state.todolist.reorderItem);

	let orderList = useAppSelector((state) => state.todolist.orderItem);

	const dispatch = useAppDispatch();
	useEffect(() => {
		setTodoList(
			data.filter((item) => {
				if (category === "all") {
					return item;
				} else if (category === "completed") {
					return item.checked;
				} else if (category === "active") {
					return !item.checked;
				}
			})
		);
	}, [category, data]);

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

	return (
		<ul className="todo__list">
			{todoList.map((item) => {
				return (
					<li
						className={classNames(classList, item.checked ? "completed" : "")}
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
							<input type="checkbox" className="todo__check" checked={item.checked} onChange={() => onCheck(item.id, item.checked)} />
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
								clickHandler={() => deleteItem(item.id, todoList)}
							/>
						</label>
					</li>
				);
			})}
		</ul>
	);
};
