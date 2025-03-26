import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "light",
};

type ThemeState = {
	theme: "light" | "dark";
};

const themeSlice = createSlice({
	name: "theme",
	initialState: initialState as ThemeState,
	reducers: {
		toggleTheme: (state) => {
			state.theme = state.theme === "dark" ? "light" : "dark";
		},
	},
	selectors: {
		selectTheme: (state) => state.theme,
	},
});

export const { toggleTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;

export const themePath = themeSlice.reducerPath;

export default themeSlice.reducer;
