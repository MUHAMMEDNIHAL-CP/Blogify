import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function CreateBlog() {
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.title || !form.content) {
      alert('Please fill in both the title and content');
      return;
    }

    setLoading(true);
    setError(null);  // Reset previous error state
    
    try {
      await API.post('blogs/', form);
      navigate('/');
    } catch (err) {
      setError('Failed to create blog. Please try again.');
      console.error('Error creating blog:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-2xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Create Blog</h2>

        {/* Display error message if any */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows="8"
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />

        <button
          type="submit"
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition ${loading ? 'bg-blue-300' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Blog'}
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
