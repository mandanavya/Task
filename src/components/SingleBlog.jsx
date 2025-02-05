import { useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaShareAlt, FaTrash } from "react-icons/fa";
import staticBlogs from "../data/blogs.json";

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog id from the URL
  const navigate = useNavigate(); // For navigation after deletion or other actions
  const blog = [
    ...staticBlogs,
    ...(JSON.parse(localStorage.getItem("dynamicBlogs")) || []),
  ].find((b) => b.id === parseInt(id)); // Find the blog by id

  if (!blog) {
    return <div>Blog not found.</div>; // Handle case if blog not found
  }

  // Handle the like functionality
  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedBlogs = savedBlogs.map((b) =>
      b.id === blog.id ? updatedBlog : b
    );
    localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs)); // Save updated blogs to localStorage
  };

  // Handle the delete functionality
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
      const updatedBlogs = savedBlogs.filter((b) => b.id !== blog.id);
      localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs)); // Update localStorage
      navigate("/blogs"); // Navigate back to the blogs list after deletion
    }
  };

  // Handle the share functionality
  const handleShare = () => {
    alert("Share functionality not implemented yet."); // You can implement sharing logic here
  };

  return (
    <section className="min-h-screen bg-gray-200 py-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">{blog.title}</h1>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="mb-6 w-full h-80 object-cover rounded-lg"
          />
        )}
        <p className="text-gray-700 mb-4">{blog.content}</p>
        <p className="text-gray-500 text-sm text-center">
          By {blog.author} on {blog.date}
        </p>

        {/* Actions Section with Like, Share, and Delete */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-1 cursor-pointer"
            >
              <FaThumbsUp size={16} />
              <span>{blog.likes}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="text-green-500 hover:text-green-700 flex items-center space-x-1 cursor-pointer"
            >
              <FaShareAlt size={16} />
              <span>Share</span>
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
