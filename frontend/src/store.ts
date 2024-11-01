import { configureStore } from '@reduxjs/toolkit'

import { questionReducer } from "./reducers/questionReducer";

const store = configureStore({
    reducer: {
        questionData: questionReducer,
    }
  });

export default store;
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store