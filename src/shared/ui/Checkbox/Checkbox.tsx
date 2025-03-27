import React, { useState } from "react";

const Checkbox = () => {
	const [checked, setChecked] = useState(false);

	const checkboxHandler = () => {
		setChecked(!checked);
	};

	return <input type="checkbox" className="todo__check" checked={checked} onChange={checkboxHandler} />;
};

export default Checkbox;
