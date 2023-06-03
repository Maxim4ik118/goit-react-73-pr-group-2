import axios from 'axios';

export const getAllBooks = async () => {
  const { data } = await axios.get(
    'https://nodebackend-production-41b1.up.railway.app/api/books',
  );
  return data;
};
export const deleteBookById = async (id) => {
  const { data } = await axios.delete(
    `https://nodebackend-production-41b1.up.railway.app/api/books/${id}`,
  );
  return data;
};
export const getAllPosts = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts/',
  );
  return data;
};
export const getPostDetails = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  return data;
};
export const getPostComments = async (id) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
  );
  return data;
};
