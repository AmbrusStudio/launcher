import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import metadataImmutableXSlice from './metadata/metadataImmutableXSlice'
import metadataSlice from './metadata/metadataSlice'

const persistConfig = {
  key: 'RootE4CRanger',
  version: 1,
  storage,
  whitelist: [],
}

const reducers = combineReducers({
  metadata: metadataSlice,
  metadataImmutableX: metadataImmutableXSlice,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  devTools: process.env.NODE_ENV === 'development',
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
