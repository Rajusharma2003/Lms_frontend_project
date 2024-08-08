
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    courseData: [],
   
};

export const getAllCourse = createAsyncThunk("/courses/get", async () => {
    try {
        const res =  axiosInstance.get("/courses");
        toast.promise(res, {
            loading: "Loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to load courses"
        });
        return (await res).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        throw error;
    }
});

// export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
//     try {
//         const res = await axiosInstance.delete(`/courses/${id}`);
//         return res
//         // toast.promise(res, {
//         //     loading: "Deleting course...",
//         //     success: "Course deleted successfully",
//         //     error: "Failed to delete course"
//         // });
//         // return (await res).data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message || "An error occurred");
//         throw error;
//     }
// });

export const deleteCourse = createAsyncThunk("/course/delete", async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.delete(`/courses/${id}`);
        toast.promise(Promise.resolve(res), {
            loading: "Deleting course...",
            success: "Course deleted successfully",
            error: "Failed to delete course"
        });
        return id; // Return the deleted course id
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        return rejectWithValue(error?.response?.data?.message || error.message);
    }
});


export const createNewCourse = createAsyncThunk('/course/create', async (data) => {
    try {
        const formData = new FormData();
        formData.append('title', data?.title);
        formData.append('category', data?.category);
        formData.append('description', data?.description);
        formData.append('thumbnail', data?.thumbnail);
        formData.append('createdBy', data?.createdBy);

        const response =  axiosInstance.post('/courses', formData);
        toast.promise(response, {
            loading: "Creating new course...",
            success: "Course created successfully",
            error: "Failed to create course"
        });

        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message || "An error occurred");
        throw error;
    }
});

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData = action.payload;
            })
            .addCase(getAllCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                if(action.payload){
                    // state.courseData = action.payload
                state.courseData = state.courseData.filter(course => course.id !== action);

                }
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createNewCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courseData.push(action.payload);
            })
          
    }
});

export default courseSlice.reducer;
