import axios from 'axios';

export const getAllBooks = async () => {
  const { data } = await axios.get(
    'https://thawing-ravine-72740.herokuapp.com/api/books'
  );
  return data;
};
export const deleteBookById = async id => {
  const { data } = await axios.delete(
    `https://thawing-ravine-72740.herokuapp.com/api/books/${id}`
  );
  return data;
};
