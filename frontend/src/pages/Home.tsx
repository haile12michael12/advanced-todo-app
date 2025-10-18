import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Advanced Todo App</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A powerful and intuitive todo management application with advanced features
          </p>
          
          {!isAuthenticated && (
            <div className="flex justify-center space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 px-8 py-3 rounded-md text-lg font-medium transition shadow-md hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          )}

          {isAuthenticated && (
            <Link
              to="/todos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg font-medium transition shadow-md hover:shadow-lg"
            >
              Go to My Todos
            </Link>
          )}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              JWT-based authentication with refresh tokens for maximum security
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced Features
            </h3>
            <p className="text-gray-600">
              Priorities, categories, due dates, and comprehensive todo management
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fast & Modern
            </h3>
            <p className="text-gray-600">
              Built with React, TypeScript, and Vite for lightning-fast performance
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Beautiful UI
            </h3>
            <p className="text-gray-600">
              Clean and intuitive interface for the best user experience
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600">
              Works perfectly on desktop, tablet, and mobile devices
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              RESTful API
            </h3>
            <p className="text-gray-600">
              Powered by a robust PHP backend with MVC architecture
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Stack</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Vite', 'PHP', 'MySQL', 'JWT', 'Tailwind CSS'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
