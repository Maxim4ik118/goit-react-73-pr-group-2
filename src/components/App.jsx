import React, { lazy, Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
// import { Home } from '../pages/Home';
// import { SearchPosts } from '../pages/SearchPosts';
// import { PostDetails } from '../pages/PostDetails';

const Home = lazy(() => import('../pages/Home'));
const SearchPosts = lazy(() => import('../pages/SearchPosts'));
const PostDetails = lazy(() => import('../pages/PostDetails'));

export function App() {
  return (
    <div>
      <header>
        <Link to={'/'}>Home</Link>
        <Link to={'/search-post'}>Search</Link>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/search-post'} element={<SearchPosts />} />
            <Route path={'/posts/:postId/*'} element={<PostDetails />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
