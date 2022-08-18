import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/category/categorySlice'
import selectedCatReducer from './features/category/selectedCatSlice'
import authReducer from './features/auth/authSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, categoryReducer)
const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    category: persistedReducer,
    selectedCat: selectedCatReducer,
    auth: persistedAuthReducer,
  },
  middleware: [thunk]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)