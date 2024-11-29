import React, { useState } from "react";
import { Blog } from "../types/types";
import Button from "./Button";
import api from "../config/api";
import { useAuth } from "../context/AuthContext";

interface SingleBlogProps {
  blog: Blog;
  handleDeleteBlog: (blogId: number) => void;
  setError: any;
}

const SingleBlog: React.FC<SingleBlogProps> = ({
  blog,
  handleDeleteBlog,
  setError,
}) => {
  const { role, id } = useAuth();
  const [comments, setComments] = useState(blog.comments);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const fetchBlog = async () => {
    setLoading(true);
    try {
      setError(null);

      const blogResponse = await api.get(`/blogs/${blog.id}`);
      const fetchedBlog = blogResponse.data.blog;
      console.log(fetchedBlog.comments);
      setComments(fetchedBlog.comments);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (blogId: number) => {
    try {
      await api.post(`/blogs/${blogId}/comments`, { content: newComment });
      setNewComment("");
      fetchBlog();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (blogId: number, commentId: number) => {
    try {
      await api.delete(`/blogs/${blogId}/comments/${commentId}`);
      fetchBlog();
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete comment");
    }
  };

  console.log(id);
  console.log(blog);

  return (
    <div className="mb-4">
      {!loading ? (
        <>
          <h2 className="text-3xl font-semibold text-accent">{blog.title}</h2>
          <p className="text-md text-secondary">{`Author: ${blog.author.username}`}</p>
          <p className="text-gray-500 text-sm">{`Posted on: ${new Date(blog.timestamp).toLocaleString()}`}</p>
          <p className="mt-2 text-xl">{blog.content}</p>
          {(role === "admin" ||
            role === "moderator" ||
            id === blog.author.id) && (
            <Button
              className="bg-red-900 text-white mt-4"
              onClick={() => handleDeleteBlog(blog.id)}
            >
              Delete Blog
            </Button>
          )}
          {comments.length ? (
            comments?.map((comment) => (
              <div key={comment.id} className="border-t pt-2 mt-4">
                <p className="text-md">{comment.content}</p>
                <p className="text-gray-500 text-sm">{`${comment.author.username}, ${new Date(comment.timestamp).toLocaleString()}`}</p>
                {(role === "admin" ||
                  role === "moderator" ||
                  id === comment.author.id) && (
                  <Button
                    className="btn-error mt-4"
                    onClick={() => handleDeleteComment(blog.id, comment.id)}
                  >
                    Delete Comment
                  </Button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet.</p>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Add a comment..."
          />
          <Button onClick={() => handleAddComment(blog.id)}>Add Comment</Button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleBlog;
