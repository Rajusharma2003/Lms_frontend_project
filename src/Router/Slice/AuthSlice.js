import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import asyncInstance from "../../Helper/axiosInstance.js";

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    role: localStorage.getItem('role') || " ",
    data: JSON.parse(localStorage.getItem('data')) || {}
};

export const createAccount = createAsyncThunk("/auth/signUp", async (data, { rejectWithValue }) => {
    try {
        const res = asyncInstance.post("user/register", data);
        // console.log(data);
        toast.promise(res, {
            loading: "Wait! Creating your account...",
            success: (data) => data?.data?.message,
            error: "Failed to create account"
        });

        const response = await res;
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        toast.error(errorMessage , "slice");
        return rejectWithValue(errorMessage , "slice");
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(createAccount.pending, (state) => {
            //     // handle pending state if needed
            // })
            .addCase(createAccount.fulfilled, (state, action) => {
                // handle successful account creation
                state.isLoggedIn = true;
                state.data = action.payload;
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('data', JSON.stringify(action.payload));
            })
            .addCase(createAccount.rejected, (state) => {
                // handle failed account creation
                state.isLoggedIn = false;
            });
    }
});

export default authSlice.reducer;
