import React from "react";
import { connect } from "react-redux";
import { ThemeButton } from "../../../shared/ui/ThemeButton/ThemeButton";
import { AppDispatch, RootState } from "../../../store/store";
import { toggleTheme } from "../../../store/themeReducer";

type Props = {
	theme?: string;
	onThemeToggle: () => void;
};

export const Header = (props: Props) => {
	const toggleTheme = () => {
		document.body.classList.toggle("dark");
	};

	return (
		<div className="todo__head">
			<div className="todo__title">
				<h1>TODO</h1>
			</div>
			<ThemeButton
				classList={["todo__theme-btn"]}
				text={props.theme}
				onClick={() => {
					props.onThemeToggle();
					toggleTheme();
				}}
			/>
		</div>
	);
};

function mapStateToProps(state: RootState) {
	const { theme } = state.theme;
	return {
		theme: theme,
	};
}

function mapDispatchToProps(dispatch: AppDispatch) {
	return {
		onThemeToggle: () => dispatch(toggleTheme()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
