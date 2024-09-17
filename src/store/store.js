import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice"; // Ensure correct path

const store = configureStore({
  reducer: {
    posts: postReducer
  }
});

export default store;
