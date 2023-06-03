import { getAllPosts, getPostDetails } from '../services/api';
import { Loader } from '../components/Loader/Loader';
import { Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
// import { Reviews } from './Reviews';
import { lazy } from 'react';

const Reviews = lazy(() => import('./Reviews'));

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
export default function PostDetails() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    if (!postId) {
      return;
    }
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPostDetails(postId);
        toast.success('Post details was successfully fetched', toastConfig);
        setPost(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  const location = useLocation();
  console.log(location);

  const backLinkHref = location.state?.from ?? '/';

  return (
    <div>
      <Link to={backLinkHref}>Go back</Link>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {post !== null && (
        <div>
          <h3>{post.id}</h3>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      )}
      <div>
        <Link to={'comments'} state={{ from: location.state?.from }}>
          Comments
        </Link>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'comments'} element={<Reviews />} />
          </Routes>
        </Suspense>
      </div>
      <ToastContainer />
    </div>
  );
}
