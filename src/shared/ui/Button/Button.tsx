import React from "react";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
	text: string | React.ReactNode;
	classList: string[];
	clickHandler: () => void;
};

export const Button = (props: Props) => {
	const { classList, text, clickHandler } = props;

	return (
		<button className={classList.join(" ")} onClick={clickHandler}>
			{text}
		</button>
	);
};
