import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Loader } from '../components/Loader/Loader'

import { getAllPosts } from 'services/api';

import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

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

export function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllPosts();
        setPosts(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <ul>
        { posts?.length > 0 && posts.map(post => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>
              <h4>{post.title}</h4>
              <p>{post.body.slice(0,50)}...</p>
              </Link>
            </li>
          )
        })}
      </ul>
      <ToastContainer />
    </div>
  );
}
