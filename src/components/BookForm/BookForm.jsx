import React, { Component } from 'react';
import { StyledForm } from './Styled';

export default class BookForm extends Component {
  state = {
    title: '',
    author: '',
    year: '',
    genre: '', // "love" | "novel" | "fantasy"
    favourite: false,
    cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
  };

  handleChange = event => {
    // const { value, checked, name, type } = event.target;
    const value = event.target.value;
    const checked = event.target.checked;
    const name = event.target.name;
    const type = event.target.type;

    if (type === 'checkbox') {
      this.setState({ [name]: checked });
      return;
    }

    this.setState({ [name]: value });
  };

  hendleSubmit = event => {
    event.preventDefault();

    const bookdata = {
      title: this.state.title,
      author: this.state.author,
      year: Number(this.state.year),
      genre: this.state.genre,
      favourite: this.state.favourite,
      cover: this.state.cover,
    };

    this.props.onAddBook(bookdata);
    this.setState({
      title: '',
      author: '',
      year: '',
      genre: '', // "love" | "novel" | "fantasy"
      favourite: false,
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    });
  };

  render() {
    return (
      <StyledForm onSubmit={this.hendleSubmit}>
        <h2>{this.props.title}</h2>
        <label className="form-label">
          <span className="label-name">Title:</span>
          <input
            type="text"
            value={this.state.title}
            name="title"
            required
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label">
          <span className="label-name">Author:</span>
          <input
            type="text"
            value={this.state.author}
            name="author"
            required
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label">
          <span className="label-name">Year:</span>
          <input
            type="text"
            value={this.state.year}
            name="year"
            required
            onChange={this.handleChange}
          />
        </label>
        <label className="form-label">
          <p className="label-name">Genre:</p>
          <span className="radio-group">
            <span className="radio-label">Love</span>
            <input
              type="radio"
              checked={this.state.genre === 'love'}
              value="love"
              name="genre"
              required
              onChange={this.handleChange}
            />
          </span>
          <span className="radio-group">
            <span className="radio-label">Novel</span>
            <input
              type="radio"
              checked={this.state.genre === 'novel'}
              value="novel"
              name="genre"
              required
              onChange={this.handleChange}
            />
          </span>
          <span className="radio-group">
            <span className="radio-label">Fantasy</span>
            <input
              type="radio"
              checked={this.state.genre === 'fantasy'}
              value="fantasy"
              name="genre"
              required
              onChange={this.handleChange}
            />
          </span>
        </label>
        <label className="form-label">
          <span className="label-name">Favourite:</span>
          <input
            type="checkbox"
            name="favourite"
            checked={this.state.favourite}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className="form-btn">
          Add book
        </button>
      </StyledForm>
    );
  }
}
