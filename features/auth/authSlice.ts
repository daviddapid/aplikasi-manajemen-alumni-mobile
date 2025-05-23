import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	user?: {
		username: string;
	};
	token?: string;
}

const initialState: AuthState = {
	user: undefined,
	token: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
	},
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
