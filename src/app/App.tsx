import { addTask, changeTaskStatus, selectTasks, Task } from "features/TodoList/model/todolistReducer";
import { Create } from "features/TodoList/ui/Create/Create";
import { TodoList } from "features/TodoList/ui/Todolist/Todolist";
import React, { useState } from "react";
import { Button } from "shared/ui/Button/Button";
import { useAppDispatch } from "./common/hooks/useAppDispatch";
import { useAppSelector } from "./common/hooks/useAppSelector";
import Header from "./ui/Header/Header";

export const App = () => {
	const dispatch = useAppDispatch();

	let data = useAppSelector((state) => selectTasks({ todolist: state.todolist }));

	// let numbItems = useSelector((state) => {
	// 	const { createItemReducer } = state;

	// 	return createItemReducer.numbItems;
	// });

	const [category, setCategory] = useState("all");
	const [onAllCategory, setOnAllCategory] = useState("active");
	const [onCompletedCategory, setOnCompletedCategory] = useState("");
	const [onActiveCategory, setOnActiveCategory] = useState("all");
	const [checked, setChecked] = useState(false);

	// let active = useSelector((state) => {
	// 	const { createItemReducer } = state;

	// 	return createItemReducer.className;
	// });

	function createTodo(e: React.FormEvent<HTMLFormElement>, val: string) {
		e.preventDefault();

		if (val.length) {
			dispatch(addTask({ active: "active", text: val }));
			setChecked(false);
			// dispatch(setNumbItems());
		}
	}

	function onCheck() {
		setChecked(!checked);
	}

	function onItemCheck(id: string, checked: boolean) {
		dispatch(changeTaskStatus({ id, checked: !checked }));
	}

	function setDataCompleted() {
		setCategory("completed");
		setOnAllCategory("");
		setOnActiveCategory("");
		setOnCompletedCategory("active");
		let counter = 0;

		data.map((item) => {
			if (item.completed === "active") counter++;
		});

		// dispatch(setNumbItems(counter));
	}

	function setDataActive() {
		setCategory("active");
		setOnAllCategory("");
		setOnActiveCategory("active");
		setOnCompletedCategory("");
		let counter = 0;

		data.map((item) => {
			if (!item.completed.length) counter++;
		});

		// dispatch(setNumbItems(counter));
	}

	function setDataAll() {
		setCategory("all");
		setOnAllCategory("active");
		setOnActiveCategory("");
		setOnCompletedCategory("");
		// dispatch(setNumbItems(data.length));
	}

	function deleteItem(key: string, arr: Task[]) {
		// dispatch(setDeletedItem(key));
		// dispatch(deletedItem(arr, key));
		// dispatch(setNumbItems());
	}

	// function clearCompletedItems() {
	// 	dispatch(clearActiveItems(data));
	// 	dispatch(setNumbItems());
	// }
	console.log(data);
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
							<Create createTodo={createTodo} onCheck={onCheck} checked={checked} />
						</div>

						<div className="todo__content">
							<TodoList classList="todo__item" data={data} category={category} onCheck={onItemCheck} deleteItem={deleteItem} />
							<div className="todo__control">
								{/* <div className="todo__numb">{numbItems} items left</div> */}
								<div className="todo__sort">
									<Button classList={["todo__sort-all", "btn", onAllCategory]} text="All" clickHandler={setDataAll} />
									<Button classList={["todo__sort-active", "btn", onActiveCategory]} text="Active" clickHandler={setDataActive} />
									<Button
										classList={["todo__sort-completed", "btn", onCompletedCategory]}
										text="Completed"
										clickHandler={setDataCompleted}
									/>
								</div>
								<div className="todo__clear">
									{/* <Button classList={["todo__clear-btn", "btn"]} text="Clear completed" onClick={clearCompletedItems} /> */}
								</div>
							</div>
						</div>
						<div className="todo__control-false">
							<div className="todo__sort-false">
								<Button classList={["todo__sort-all", "btn", onAllCategory]} text="All" clickHandler={setDataAll} />
								<Button classList={["todo__sort-active", "btn", onActiveCategory]} text="Active" clickHandler={setDataActive} />
								<Button
									classList={["todo__sort-completed", "btn", onCompletedCategory]}
									text="Completed"
									clickHandler={setDataCompleted}
								/>
							</div>
						</div>
					</div>

					<div className="todo__foot">Drag and drop to reorder list</div>
				</div>
			</div>
		</div>
	);
};
