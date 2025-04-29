import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../services/api';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await API.get(`blogs/${id}/`);
        setBlog(res.data);
      } catch (err) {
        setError('Failed to load blog details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      await API.delete(`blogs/${id}/`);
      navigate('/');
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert(`This blog by ${blog.author_username} requires you to log in.`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-[150px]">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-gray-600">{blog.content}</p>
        <p className="text-gray-500 mt-2">by {blog.author_username}</p>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
