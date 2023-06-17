import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import BookForm from './BookForm/BookForm';
import { Loader } from './Loader/Loader';
import BookList from './BookList/BookList';

import { deleteBookById, getAllBooks } from 'services/api';
import * as filterTypes from '../constants/filterTypes';

import 'react-toastify/dist/ReactToastify.css';
import { StyledButtons } from './App.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBook,
  setBooks,
  setError,
  setFilterType,
  setLoading,
  toggleFavoriteBook,
} from 'redux/bookSlice/bookSlice';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export function App() {
  // const [books, setBooks] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const filterType = useSelector(store => store.books.filterType);

  const books = useSelector(store => store.books.books);
  const error = useSelector(store => store.books.error);
  const loading = useSelector(store => store.books.loading);

  // const [filterType, setFilterType] = useState('all'); //all, favourites

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        dispatch(setLoading(true));
        // setLoading(true);
        dispatch(setError(null));
        // setError(null);
        const response = await getAllBooks();
        dispatch(setBooks(response));
        // setBooks(response);
      } catch (err) {
        dispatch(setError(err.message));
        // setError(err.message);
      } finally {
        dispatch(setLoading(false));
        // setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const onAddBook = book => {
    // const finalBookData = {
    //   id: nanoid(),
    //   ...book,
    // };
    // setBooks([...books, finalBookData]);

    // dispatch({ type: 'books/addBook', payload: book });
    dispatch(addBook(book));

    toast.success(
      `Book with title ${book.title} successfully added!`,
      toastConfig
    );
  };

  const onRemoveBook = async bookId => {
    try {
      dispatch(setLoading(true));
      // setLoading(true);
      dispatch(setError(null));
      // setError(null);
      const deletedBook = await deleteBookById(bookId);

      dispatch(setBooks(books.filter(book => book._id !== deletedBook._id)));
      toast.success(
        `Book with title ${deletedBook.title} successfully removed!`,
        toastConfig
      );
    } catch (err) {
      dispatch(setError(err.message));
      // setError(err.message);
      toast.error(err.message, toastConfig);
    } finally {
      dispatch(setLoading(false));
      // setLoading(false);
    }
  };

  const onToggleFavourite = bookId => {
    dispatch(toggleFavoriteBook(bookId));
  };

  const onSelectType = type => {
    dispatch(setFilterType(type));
  };

  const filteredBookCards = type => {
    switch (type) {
      case filterTypes.all:
        return books;
      case filterTypes.favourites:
        return books.filter(book => book.favourite);
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
            filterType === filterTypes.favourites ? 'active' : ''
          }`}
          onClick={() => onSelectType(filterTypes.favourites)}
        >
          Show favourites
        </button>
        <button
          type="button"
          className={`filterBtn ${
            filterType === filterTypes.all ? 'active' : ''
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
