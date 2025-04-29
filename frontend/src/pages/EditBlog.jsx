import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../services/api';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await API.get(`blogs/${id}/`);
        setForm({ title: res.data.title, content: res.data.content });
      } catch (error) {
        console.error('Error fetching blog:', error.response?.data || error.message);
      }
    }
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update the blog
      const res = await API.put(`blogs/${id}/`, form);
      console.log('Blog updated successfully:', res.data);
      navigate(`/blogs/${id}`);  // Redirect to the blog detail page after updating
    } catch (error) {
      console.error('Error updating blog:', error.response?.data || error.message);
      alert('Failed to update the blog. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Edit Blog</h2>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Blog Title"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Blog Content"
          rows="8"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
