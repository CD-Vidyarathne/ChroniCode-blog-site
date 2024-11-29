import React, { useState } from "react";
import api from "../config/api";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post("/blogs", { title, content });
      console.log(response.data);
      // Redirect to the blogs page or update the state
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to create blog");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-3xl font-semibold text-accent">Create New Blog</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block">Title</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Content</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
