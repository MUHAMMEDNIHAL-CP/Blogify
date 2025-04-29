import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await API.get('blogs/');
        console.log("API response:", res.data);
        setBlogs(res.data.results || res.data);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-5">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">All Blogs</h1>

      {error && <div className="text-red-500 text-center">{error}</div>}

      {loading ? (
        <div className="text-center">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center text-gray-500">No blogs found.</div>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <Link to={`/blogs/${blog.id}`}>
                <h3 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {blog.title}
                </h3>
              </Link>
              <p className="text-gray-500 mt-2">by {blog.author_username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
