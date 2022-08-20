import './App.css';
import { CreatePage, ListingPage, ErrorPage, SingleBlogPage } from './Pages/index'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/blog/:blogId" element={<SingleBlogPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
