import React from "react";
import { Button } from "shared/ui/Button/Button";

export type FilterCategory = "all" | "active" | "completed";

type Props = {
	category: FilterCategory;
	setCategory: (category: FilterCategory) => void;
};

export const TodoFilter = React.memo((props: Props) => {
	const { category, setCategory } = props;
	return (
		<div className="todo__filter">
			<Button classList={["todo__filter-all", "btn", category === "all" ? "active" : ""]} text="All" clickHandler={() => setCategory("all")} />
			<Button
				classList={["todo__filter-active", "btn", category === "active" ? "active" : ""]}
				text="Active"
				clickHandler={() => setCategory("active")}
			/>
			<Button
				classList={["todo__filter-completed", "btn", category === "completed" ? "active" : ""]}
				text="Completed"
				clickHandler={() => setCategory("completed")}
			/>
		</div>
	);
});
