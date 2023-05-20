import axios from 'axios';

export const getAllBooks = async () => {
  const { data } = await axios.get(
    'https://nodebackend-production-41b1.up.railway.app/api/books'
  );
  return data;
};
