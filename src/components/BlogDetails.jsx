import React, { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Get the blog from localStorage or static data
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const blog = savedBlogs.find((blog) => blog.id === parseInt(id));

    if (blog) {
      setBlog(blog);
      setLikes(blog.likes);
    }
  }, [id]);

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);

    // Update the like count in localStorage
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedBlogs = savedBlogs.map((savedBlog) =>
      savedBlog.id === parseInt(id) ? { ...savedBlog, likes: updatedLikes } : savedBlog
    );
    localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <section className="min-h-screen bg-gray-200 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">{blog.title}</h2>
        {blog.image && <img src={blog.image} alt={blog.title} className="mb-4 w-full h-64 object-cover rounded-lg" />}
        <p className="text-gray-700 mb-4">{blog.content}</p>
        <p className="text-gray-500 text-sm">By {blog.author} on {blog.date}</p>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLike}
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
          >
            <FaThumbsUp size={16} />
            <span>{likes}</span>
          </button>
          <button onClick={() => navigate("/")} className="text-blue-500 hover:text-blue-700">
            Back to Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
