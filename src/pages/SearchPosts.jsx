import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPostDetails } from "services/api";

export const SearchPosts = () => {
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPostDetails(query);
        // toast.success('Post details was successfully fetched', toastConfig)
        setSearchedPosts([response]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const searchText = event.currentTarget.elements.search.value;
    setSearchParams({ query: searchText });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="input id" name="search" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchedPosts?.length > 0 &&
          searchedPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
