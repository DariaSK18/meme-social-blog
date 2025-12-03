import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { getComments, createComment } from "../api/commentApi";
import { useAuth } from "../context/AuthContext";
import "../styles/commentsPopup.css";

export default function CommentsPopup({
  postId,
  handleClose,
  handleNewComment,
}) {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await getComments(postId);
      if (response.data) {
        setComments(Array.isArray(response.data) ? response.data : []);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setComments([]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !commentText.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      await createComment(postId, commentText.trim());
      setCommentText("");
      await fetchComments();
      if (handleNewComment) {
        handleNewComment();
      }
    } catch (err) {
      console.error("Failed to create comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="comments-backdrop" onClick={handleBackdropClick}>
      <div className="comments-popup">
        <div className="comments-popup-header">
          <h2>Comments</h2>
          <button
            className="comments-popup-close"
            onClick={handleClose}
            aria-label="Close comments"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="comments-popup-content">
          {comments.length === 0 ? (
            <div className="comments-empty">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-user">
                    <FontAwesomeIcon icon={faUser} />
                    <span className="comment-username">
                      {comment.user?.username || "Unknown"}
                    </span>
                  </div>
                  <div className="comment-text">{comment.text}</div>
                  {comment.createdAt && (
                    <div className="comment-date">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {user ? (
            <form className="comments-form" onSubmit={handleSubmit}>
              <textarea
                className="comments-input"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="3"
              />
              <button
                type="submit"
                className="comments-submit-btn"
                disabled={submitting || !commentText.trim()}
              >
                Post Comment
              </button>
            </form>
          ) : (
            <div className="comments-login-prompt">
              Please <Link to="/login">login</Link> to comment
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
