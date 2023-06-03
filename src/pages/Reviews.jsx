import { getAllPosts, getPostComments } from '../services/api';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader/Loader';

export const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPostComments(postId);
        setReviews(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [postId]);


  return (
    <div>
      {loading && <Loader />}
      {error && <p>{error}</p>}
      <ul>
        {reviews?.length > 0 && reviews.map(review => {
          return (
            <li key={review.id}>
              <h4>{review.email}</h4>
              <p>{review.name}</p>
              <p>{review.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
