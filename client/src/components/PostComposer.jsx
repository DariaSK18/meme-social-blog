import React, { useState, useRef } from "react";
import "../styles/PostComposer.css";


export default function PostComposer({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fileInput = useRef();

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() && !content.trim() && !file) {
      return alert("Please add text or an image.");
    }

    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tag", tag);

    if (onSubmit) onSubmit(formData);

    // Reset
    setTitle("");
    setContent("");
    setTag("");
    setFile(null);
    setPreview(null);

    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Post</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter post title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            placeholder="Write something..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <textarea
            value={tag}
            placeholder="Tags"
            onChange={(e) => setTag(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            ref={fileInput}
            accept="image/*"
            onChange={handleFile}
          />
        </div>

        {preview && (
          <div className="image-preview-wrapper">
            <img src={preview} alt="preview" className="image-preview" />
          </div>
        )}

        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
