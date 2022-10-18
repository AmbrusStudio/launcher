import { configureStore } from '@reduxjs/toolkit'

import metadataSlice from './metadata/metadataSlice'

export const store = configureStore({
  devTools: true,
  reducer: {
    metadataSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
