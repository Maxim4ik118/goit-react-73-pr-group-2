import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastConfig } from "components/App";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { deleteBookById, getAllBooks } from "services/api";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (_, thunkApi) => {
    try {
      // dispatch({ type: "books/pending" });
      const response = await getAllBooks();
      // dispatch({ type: "books/fullfilled", payload: response });
      return response;
    } catch (err) {
      // dispatch({ type: "books/rejected", payload: err.message });
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteBooks = createAsyncThunk(
  "books/deleteBooks",
  async (bookId, thunkApi) => {
    try {
      const deletedBook = await deleteBookById(bookId);
      toast.success(
        `Book with title ${deletedBook.title} successfully removed!`,
        toastConfig
      );
      return deletedBook;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  books: [],
  filterType: "all", //all, favourites
  error: null,
  loading: false,
};

const booksSlice = createSlice({
  // Ім'я слайсу
  name: "books",
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
    toggleFavoriteBook(state, action) {
      state.books = state.books.map((book) => {
        if (action.payload === book._id) {
          return { ...book, favourite: !book.favourite };
        }

        return book;
      });
    },
  },
  extraReducers: (builder) =>
    builder
      // ------ FETCH BOOKS
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // ------ DELETE BOOKS
      .addCase(deleteBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooks.fulfilled, (state, action) => {
        // books.filter(book => book._id !== deletedBook._id)
        state.loading = false;
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
      })
      .addCase(deleteBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }),
});

// Генератори екшенів
export const {
  addBook,
  setFilterType,
  toggleFavoriteBook,
} = booksSlice.actions;
// Редюсер слайсу
export const booksReducer = booksSlice.reducer;
