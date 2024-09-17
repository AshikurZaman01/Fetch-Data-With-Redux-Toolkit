import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Asynchronous thunk to fetch posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
});

// Creating the slice
const postSlice = createSlice({
    name: 'posts',
    initialState: {
        isLoading: false,
        posts: [],
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
                state.error = null;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.posts = [];
                state.error = action.error.message;
            });
    }
});

// Export the reducer
export default postSlice.reducer;
