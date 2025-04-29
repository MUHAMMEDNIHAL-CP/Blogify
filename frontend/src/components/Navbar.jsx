import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <nav className="fixed bg-blue-600 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-white font-extrabold text-2xl tracking-wide hover:text-gray-200 transition-colors"
            >
              Blogify
            </Link>
          </div>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className="text-white hover:text-gray-200 text-lg transition-colors"
                >
                  Create Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 text-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-gray-200 text-lg transition-colors"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
