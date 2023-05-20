import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import BookForm from './BookForm/BookForm';
import { Loader } from './Loader/Loader';
import BookList from './BookList/BookList';

import { deleteBookById, getAllBooks } from 'services/api';

import booksJSON from '../books.json';

import 'react-toastify/dist/ReactToastify.css';


const booksArray = booksJSON.books;
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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllBooks();
        setBooks(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  const onAddBook = book => {
    const finalBookData = {
      id: nanoid(),
      ...book,
    };
    setBooks([...books, finalBookData]);
    toast.success(
      `Book with title ${book.title} successfully added!`,
      toastConfig,
    );
  };
  const onRemoveBook = async bookId => {
    try {
      setLoading(true);
      setError(null);
      const deletedBook = await deleteBookById(bookId);
      setBooks(books.filter(book => book._id !== deletedBook._id));
      toast.success(`Book with title ${deletedBook.title} successfully removed!`, toastConfig);
    } catch (err) {
      setError(err.message);
      toast.error(err.message, toastConfig);
    } finally {
      setLoading(false);
    }
  };
  const onToggleFavourite = (bookId) => {
    const updatedBooks = books.map(book => {
      if (bookId === book._id) {
        return {...book, favourite: !book.favourite };
      }
      return book;
    });
    setBooks(updatedBooks);
  }
  console.log(books);
  return (
    <div>
      <BookForm title='BookForm' onAddBook={onAddBook} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <BookList onFavouriteBook={onToggleFavourite} onDeleteBook={onRemoveBook} books={books} />
      <ToastContainer />
    </div>
  );
}
