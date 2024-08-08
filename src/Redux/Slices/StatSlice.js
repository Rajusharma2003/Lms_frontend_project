import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {
    allUserCount : 0,
    subscribeCount : 0
}


export const getStatsData = createAsyncThunk( 'stats/get' , async () => {


    try {
        const response = await axiosInstance.get('/admin/stats/users')
        return response.data

    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
   
})




const StatsSlice = createSlice( {
    name : 'stats',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(getStatsData.fulfilled, (state, action) => {
            // set inside the state `allUserCount` and `subscribeCount`
            state.allUserCount = action?.payload?.allUsersCount;
            state.subscribeCount = action?.payload?.subscribedUsersCount

            toast.success(action.payload.message || 'Data fetched successfully');
        })
    } 
})


export default StatsSlice.reducer