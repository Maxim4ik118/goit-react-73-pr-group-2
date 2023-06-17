import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

import BookForm from "./BookForm/BookForm";
import { Loader } from "./Loader/Loader";
import BookList from "./BookList/BookList";

import * as filterTypes from "../constants/filterTypes";

import "react-toastify/dist/ReactToastify.css";
import { StyledButtons } from "./App.styled";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  deleteBooks,
  fetchBooks,
  setFilterType,
  toggleFavoriteBook,
} from "redux/bookSlice/bookSlice";

export const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export function App() {
  const filterType = useSelector((store) => store.books.filterType);

  const books = useSelector((store) => store.books.books);
  const error = useSelector((store) => store.books.error);
  const loading = useSelector((store) => store.books.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const onAddBook = (book) => {
    dispatch(addBook(book));

    toast.success(
      `Book with title ${book.title} successfully added!`,
      toastConfig
    );
  };

  const onRemoveBook = async (bookId) => {
    dispatch(deleteBooks(bookId));
  };

  const onToggleFavourite = (bookId) => {
    dispatch(toggleFavoriteBook(bookId));
  };

  const onSelectType = (type) => {
    dispatch(setFilterType(type));
  };

  const filteredBookCards = (type) => {
    switch (type) {
      case filterTypes.all:
        return books;
      case filterTypes.favourites:
        return books.filter((book) => book.favourite);
      default:
        return books;
    }
  };

  const filteredCards = filteredBookCards(filterType);

  return (
    <div>
      <BookForm title="BookForm" onAddBook={onAddBook} />
      <StyledButtons>
        <button
          type="button"
          className={`filterBtn ${
            filterType === filterTypes.favourites ? "active" : ""
          }`}
          onClick={() => onSelectType(filterTypes.favourites)}
        >
          Show favourites
        </button>
        <button
          type="button"
          className={`filterBtn ${
            filterType === filterTypes.all ? "active" : ""
          }`}
          onClick={() => onSelectType(filterTypes.all)}
        >
          Show all
        </button>
      </StyledButtons>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <BookList
        onFavouriteBook={onToggleFavourite}
        onDeleteBook={onRemoveBook}
        books={filteredCards}
      />
      <ToastContainer />
    </div>
  );
}
