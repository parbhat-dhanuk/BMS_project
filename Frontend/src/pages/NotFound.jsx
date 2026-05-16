import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      
      {/* 404 Number */}
      <h1 className="text-7xl font-extrabold text-blue-500">404</h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-500 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg 
                   hover:bg-blue-600 transition duration-200 shadow-md"
      >
        ⬅ Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;