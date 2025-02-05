import { useState, useEffect } from "react";
import staticBlogs from "../data/blogs.json";
import { FaPlus, FaTrash, FaThumbsUp, FaShareAlt, FaTimes } from "react-icons/fa";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReadMoreModal, setShowReadMoreModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});

  // State for new blog form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedStaticBlogs = staticBlogs.map((blog) => ({
      ...blog,
      likes: typeof blog.likes === "number" ? blog.likes : 0,
    }));

    setBlogs([...updatedStaticBlogs, ...savedBlogs]);

    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    setComments(savedComments);
  }, []);

  const handleLike = (id) => {
    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) => {
        if (blog.id === id) {
          const updatedBlog = { ...blog, likes: blog.likes + 1 };
          if (blog.id >= 1000) {
            const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
            const updatedDynamicBlogs = savedBlogs.map((savedBlog) =>
              savedBlog.id === id ? updatedBlog : savedBlog
            );
            localStorage.setItem("dynamicBlogs", JSON.stringify(updatedDynamicBlogs));
          }
          if (selectedBlog && selectedBlog.id === id) {
            setSelectedBlog(updatedBlog);
          }
          return updatedBlog;
        }
        return blog;
      });
    });
  };

  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    setShowReadMoreModal(true);
  };

  const handleCloseModal = () => {
    setShowReadMoreModal(false);
    setSelectedBlog(null);
  };

  const handleAddComment = () => {
    if (commentText.trim() === "") return;

    const updatedComments = {
      ...comments,
      [selectedBlog.id]: [
        ...(comments[selectedBlog.id] || []),
        commentText,
      ],
    };

    setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setCommentText("");
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") return;

    const newBlog = {
      id: Date.now(),
      title,
      content,
      image: imageData,
      author: "You",
      date: new Date().toISOString().split("T")[0],
      likes: 0,
    };

    const savedBlogs = JSON.parse(localStorage.getItem("dynamicBlogs")) || [];
    const updatedBlogs = [...savedBlogs, newBlog];
    localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));

    setBlogs([...staticBlogs, ...updatedBlogs]);

    setTitle("");
    setContent("");
    setImageData(null);
    setImagePreview(null);
    setShowAddModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageData(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleShare = () => {
    const text = `${selectedBlog.title}\n\n${selectedBlog.content}\n\nRead more: ${window.location.href}`;
    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(whatsappURL, '_blank');
  };

  // Function to handle blog deletion
  const handleDeleteBlog = (id) => {
    // Remove from state
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog.id !== id);
      localStorage.setItem("dynamicBlogs", JSON.stringify(updatedBlogs));  // Update localStorage
      return updatedBlogs;
    });

    // If the current selected blog is deleted, close the modal
    if (selectedBlog && selectedBlog.id === id) {
      setShowReadMoreModal(false);
      setSelectedBlog(null);
    }
  };

  return (
    <section id="blogs" className="min-h-screen bg-gray-200 py-10 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Blogs</h2>

        {/* Add New Blog Button */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
          >
            Add New Blog
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5 m-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              onClick={() => handleCardClick(blog)} 
              className="bg-white p-5 rounded-lg shadow-md mb-6 relative cursor-pointer"
            >
              <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mb-4 w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-700 mb-4">{blog.content.substring(0, 100)}...</p>
              <p className="text-gray-500 text-sm">Posted on {blog.date}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(blog.id);
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaThumbsUp size={16} />
                    <span>{blog.likes}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(); 
                    }}
                    className="text-green-500 hover:text-green-700 flex items-center space-x-1"
                  >
                    <FaShareAlt size={16} />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBlog(blog.id);  // Call handleDeleteBlog on click
                    }}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Blog Modal */}
        {showAddModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-semibold mb-4">Add New Blog</h3>
              <form onSubmit={handleAddBlog}>
                <input
                  type="text"
                  placeholder="Blog Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <textarea
                  placeholder="Blog Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full mb-4"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mb-4 w-full h-48 object-cover rounded"
                  />
                )}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setTitle("");
                      setContent("");
                      setImageData(null);
                      setImagePreview(null);
                    }}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    Add Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Read More Modal */}
        {showReadMoreModal && selectedBlog && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl mx-4">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-600"
              >
                <FaTimes size={20} />
              </button>
              <h3 className="text-2xl font-semibold mb-4">{selectedBlog.title}</h3>
              {selectedBlog.image && (
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title}
                  className="mb-4 w-full h-64 object-cover rounded-lg"
                />
              )}
              <p className="text-gray-700 mb-4">{selectedBlog.content}</p>
              <p className="text-gray-500 text-sm">By {selectedBlog.author} on {selectedBlog.date}</p>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(selectedBlog.id);
                    }}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaThumbsUp size={16} />
                    <span>{selectedBlog.likes}</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(); 
                    }}
                    className="text-green-500 hover:text-green-700 flex items-center space-x-1"
                  >
                    <FaShareAlt size={16} />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBlog(selectedBlog.id);  // Handle delete in modal
                    }}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Comments</h4>
                <div>
                  {(comments[selectedBlog.id] || []).map((comment, index) => (
                    <div key={index} className="text-gray-600 mb-2">
                      {comment}
                    </div>
                  ))}
                </div>
                <textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <button
                  onClick={handleAddComment}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
