import { configureStore } from '@reduxjs/toolkit';
import { booksReducer } from './bookSlice/bookSlice';

export const store = configureStore({
  reducer: { books: booksReducer },
});
