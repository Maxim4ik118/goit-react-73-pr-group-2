import axios from 'axios';

export const getAllBooks = async () => {
  const { data } = await axios.get(
    'https://nodebackend-production-41b1.up.railway.app/api/books'
  );
  return data;
};
export const deleteBookById = async (id) => {
  const { data } = await axios.delete(
    `https://nodebackend-production-41b1.up.railway.app/api/books/${id}`
  );
  return data;
}
