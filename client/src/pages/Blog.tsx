import React, { useEffect, useState } from "react";
import api from "../config/api";
import { Blog } from "../types/types";
import SingleBlog from "../components/SingleBlog";
import CreateBlog from "../components/CreateBlog";

const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);

      const blogResponse = await api.get("/blogs");
      const fetchedBlogs = blogResponse.data.blogs;
      console.log(fetchedBlogs);
      setBlogs(fetchedBlogs);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-8 text-gray-300">Loading blogs...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const handleDeleteBlog = async (blogId: number) => {
    try {
      await api.delete(`/blogs/${blogId}`);
      setBlogs(blogs.filter((blog) => blog.id !== blogId));
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete blog");
    }
  };

  return (
    <div className="mt-8 container mx-auto px-4">
      <h1 className="text-6xl font-bold text-info">Blogs</h1>
      <p className="mt-4 text-gray-300">
        Explore all blogs written by our community.
      </p>
      <CreateBlog />

      <div className="mt-8 space-y-6">
        {blogs.map((blog) => {
          return (
            <div key={blog.id} className="border rounded-lg p-4 shadow-sm">
              <SingleBlog
                blog={blog}
                handleDeleteBlog={handleDeleteBlog}
                setError={setError}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsPage;
