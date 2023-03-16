import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import livroReducer  from "../module/Livro/LivroSlice"


export const store = configureStore({
  reducer: {
    livro: livroReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
