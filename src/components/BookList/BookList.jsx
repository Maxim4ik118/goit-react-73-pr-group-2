import React from 'react';
import { ReactComponent as IconHeart } from '../heart.svg';
import { StyledBookCard, StyledList } from './styled';

function BookList({ books }) {
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
              <IconHeart
                className={`book-icon ${book.favourite ? 'favourite' : ''}`}
              />
              <button type="button" className="removeBtn">
                &times;
              </button>
            </StyledBookCard>
          );
        })}
    </StyledList>
  );
}

export default BookList;
