import { useAppDispatch } from "app/common/hooks/useAppDispatch";
import { addTask } from "features/TodoList/model/todolistReducer";
import React, { FormEvent, useCallback, useState } from "react";
import Checkbox from "shared/ui/Checkbox/Checkbox";

export const CreateTaskForm = React.memo(() => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState("");
	const [checked, setChecked] = useState(false);

	const onKeyPress = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setValue("");
		setChecked(false);
		if (value.trim()) {
			dispatch(addTask({ checked, text: value }));
		}
	};

	const checkboxHandler = () => {
		setChecked(!checked);
	};

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<form
			className="todo__create-form"
			onSubmit={(e) => {
				onKeyPress(e);
			}}
		>
			<label className="todo__create-container">
				<input type="checkbox" className="todo__check" checked={checked} onChange={checkboxHandler} />
				<div className="todo__false-check">
					<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
						<path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6" />
					</svg>
				</div>
				<input
					type="text"
					className="todo__input"
					placeholder="Create a new todo..."
					value={value}
					onChange={(e) => {
						inputHandler(e);
					}}
				/>
			</label>
		</form>
	);
});
