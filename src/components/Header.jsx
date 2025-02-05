import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative h-40">
      <div className="absolute inset-0 bg-cover bg-gray-800 text-white py-12 flex items-center justify-center z-10">
        <h1 className="text-4xl font-bold mb-6">Welcome to Blogs Page</h1>
      </div>
      <div className="absolute top-4 right-8 flex space-x-8 z-20">
        <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Home
        </Link>
        <Link to="/blogs" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Blogs
        </Link>
        <Link to="/contact" className="text-xl font-bold text-white hover:text-gray-300 cursor-pointer">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Header;
