/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={blog.image} alt={blog.title} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
        <p className="text-gray-700">{blog.description.substring(0, 100)}...</p>
        <Link to={`/blogs/${blog.id}`} className="text-blue-500 font-semibold mt-2 block">
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
