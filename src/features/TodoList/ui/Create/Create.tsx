import { useAppDispatch } from "app/common/hooks/useAppDispatch";
import { useAppSelector } from "app/common/hooks/useAppSelector";
import React, { useState } from "react";

type Props = {
	createTodo: (e: React.FormEvent<HTMLFormElement>, val: string) => void;
	onCheck: () => void;
	checked: boolean;
};

export const Create = ({ createTodo, onCheck, checked }: Props) => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState("");
	// const val = useAppSelector((state) => {
	// 	const { createItemReducer } = state;

	// 	return createItemReducer.text;
	// });

	function onKeyPress() {
		// dispatch(inputText(""));
		setValue("");
	}

	function onHandler(e: React.ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value);
		// dispatch(inputText(e.target.value));
	}

	return (
		<form
			className="todo__create-form"
			onSubmit={(e) => {
				createTodo(e, value);
				onKeyPress();
			}}
		>
			<label className="todo__create-container">
				<input type="checkbox" className="todo__check" checked={checked} onChange={onCheck} />
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
						onHandler(e);
					}}
				/>
			</label>
		</form>
	);
};
