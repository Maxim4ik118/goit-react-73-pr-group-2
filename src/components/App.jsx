import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';

import BookForm from './BookForm/BookForm';

import booksJSON from '../books.json';
import { ReactComponent as IconHeart } from './heart.svg';

import 'react-toastify/dist/ReactToastify.css';

const booksArray = booksJSON.books;

export class App extends Component {
  state = {
    books: booksArray, // [{1},{2},{3},{4}]
  };

  onAddBook = book => {
    const finalBookData = {
      id: nanoid(),
      ...book
    }

    this.setState(prevState => {
      return { books: [...prevState.books, finalBookData] };
    }); // складніший, але універсальний
    // this.setState({ books: [...this.state.books, book] });  простіший, але не універсальний

    toast.success(`Book with title ${book.title} successfully added!`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  render() {
    console.log(this.state.books);
    return (
      <div>
        <BookForm title="BookForm" onAddBook={this.onAddBook} />
        <div>
          {Array.isArray(this.state.books) &&
            this.state.books.length > 0 &&
            this.state.books.map(book => {
              return (
                <div key={book.id}>
                  <h3>{book.title}</h3>
                  <p>
                    <b>Author: </b>
                    {book.author}
                  </p>
                  <p>
                    <b>Year: </b>
                    {book.year}
                  </p>
                  <p>
                    <b>Genre: </b>
                    {book.genre}
                  </p>
                  <IconHeart
                    className={`book-icon ${book.favourite ? 'favourite' : ''}`}
                  />
                </div>
              );
            })}
        </div>
        <ToastContainer />
      </div>
    );
  }
}
