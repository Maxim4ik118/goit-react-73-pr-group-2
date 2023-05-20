import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import BookForm from './BookForm/BookForm';

import booksJSON from '../books.json';

import 'react-toastify/dist/ReactToastify.css';
import BookList from './BookList/BookList';
import { getAllBooks } from 'services/api';

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
      toastConfig
    );
  };

  console.log(books);
  return (
    <div>
      <BookForm title="BookForm" onAddBook={onAddBook} />
      <BookList books={books} />
      <ToastContainer />
    </div>
  );
}
