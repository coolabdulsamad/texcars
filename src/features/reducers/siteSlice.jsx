import { createSlice } from "@reduxjs/toolkit";

const siteSlice = createSlice({
    name: "site",
    initialState: JSON.parse(localStorage.getItem("texcars_user")) || {
        isLoggedIn: null,
        email: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            localStorage.setItem("texcars_user", JSON.stringify(state));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            localStorage.removeItem("texcars_user");
        }
    }
})

export const { login, logout } = siteSlice.actions;
export default siteSlice.reducer;