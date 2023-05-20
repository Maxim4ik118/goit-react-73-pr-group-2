import React, { useState } from 'react';
import { StyledForm } from './Styled';

export default function BookForm({ onAddBook, title }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    genre: '', // "love" | "novel" | "fantasy"
    favourite: false,
    cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
  });

  const handleChange = event => {
    const value = event.target.value;
    const checked = event.target.checked;
    const name = event.target.name;
    const type = event.target.type;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const hendleSubmit = event => {
    event.preventDefault();

    const bookdata = {
      title: formData.title,
      author: formData.author,
      year: Number(formData.year),
      genre: formData.genre,
      favourite: formData.favourite,
      cover: formData.cover,
    };

    onAddBook(bookdata);
    setFormData({
      title: '',
      author: '',
      year: '',
      genre: '', // "love" | "novel" | "fantasy"
      favourite: false,
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    });
  };

  return (
    <StyledForm onSubmit={hendleSubmit}>
      <h2>{title}</h2>
      <label className="form-label">
        <span className="label-name">Title:</span>
        <input
          type="text"
          value={formData.title}
          name="title"
          required
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        <span className="label-name">Author:</span>
        <input
          type="text"
          value={formData.author}
          name="author"
          required
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        <span className="label-name">Year:</span>
        <input
          type="text"
          value={formData.year}
          name="year"
          required
          onChange={handleChange}
        />
      </label>
      <label className="form-label">
        <p className="label-name">Genre:</p>
        <span className="radio-group">
          <span className="radio-label">Love</span>
          <input
            type="radio"
            checked={formData.genre === 'love'}
            value="love"
            name="genre"
            required
            onChange={handleChange}
          />
        </span>
        <span className="radio-group">
          <span className="radio-label">Novel</span>
          <input
            type="radio"
            checked={formData.genre === 'novel'}
            value="novel"
            name="genre"
            required
            onChange={handleChange}
          />
        </span>
        <span className="radio-group">
          <span className="radio-label">Fantasy</span>
          <input
            type="radio"
            checked={formData.genre === 'fantasy'}
            value="fantasy"
            name="genre"
            required
            onChange={handleChange}
          />
        </span>
      </label>
      <label className="form-label">
        <span className="label-name">Favourite:</span>
        <input
          type="checkbox"
          name="favourite"
          checked={formData.favourite}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className="form-btn">
        Add book
      </button>
    </StyledForm>
  );
}
