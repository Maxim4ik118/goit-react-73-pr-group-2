import { getAllPosts, getPostDetails } from '../services/api';
import { Loader } from '../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Reviews } from './Reviews';


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
export const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPostDetails(postId);
        toast.success('Post details was successfully fetched', toastConfig)
        setPost(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);


  return (
    <div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {post !== null &&
        <div>
          <h3>{post.id}</h3>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      }
      <div>
        <Link to={"comments"}>Comments</Link>
      </div>
      <div>
        <Routes>
          <Route path={"comments"} element={<Reviews/>}/>
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
};
