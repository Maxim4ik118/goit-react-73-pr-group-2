import React from 'react';
import { ReactComponent as IconHeart } from '../heart.svg';
import { StyledBookCard, StyledList } from './styled';

function BookList({ books, onDeleteBook, onFavouriteBook }) {
  return (
    <StyledList>
      {Array.isArray(books) &&
        books.length > 0 &&
        books.map(book => {
          return (
            <StyledBookCard key={book._id}>
              <h3>
                <b>Title: </b>
                {book.title}
              </h3>
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
              <button className='favoriteButton' type='button' onClick={() => onFavouriteBook(book._id)}>
                <IconHeart
                  className={`book-icon ${book.favourite ? 'favourite' : ''}`}
                />
              </button>
              <button type='button' className='removeBtn' onClick={() => onDeleteBook(book._id)}>
                &times;
              </button>
            </StyledBookCard>
          );
        })}
    </StyledList>
  );
}

export default BookList;
