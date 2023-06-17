import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  books: [],
  filterType: 'all', //all, favourites
  error: null,
  loading: false,
};

const booksSlice = createSlice({
  // Ім'я слайсу
  name: 'books',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addBook(state, action) {
      const finalBookData = {
        id: nanoid(),
        ...action.payload,
      };

      state.books = [...state.books, finalBookData];

      //  state.books.push(finalBookData) -> (data) => ({...state, books: [...state.books, data]})
    },
    setFilterType(state, action) {
      state.filterType = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setBooks(state, action) {
      state.books = action.payload;
    },
    deleteBook(state, action) {},
    toggleFavoriteBook(state, action) {
      // [{id: 1, favourite: false}, {id: 2, favourite: true}]
      state.books = state.books.map(book => {
        // [{id: 1, favourite: true}, {id: 2, favourite: true}]
        if (action.payload === book._id) {
          return { ...book, favourite: !book.favourite };
        }

        return book;
      });
    },
  },
});

// Генератори екшенів
export const {
  addBook,
  setError,
  setBooks,
  deleteBook,
  setLoading,
  deleteTask,
  toggleCompleted,
  setFilterType,
  toggleFavoriteBook,
} = booksSlice.actions;
// Редюсер слайсу
export const booksReducer = booksSlice.reducer;
