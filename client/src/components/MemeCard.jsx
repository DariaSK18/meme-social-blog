import React, { useState } from "react";
import { apiFetch } from "../axiosapi";
import { useSession } from "../context/SessionContext";
import "../styles/MemeCard.css";


// Import MOCK functions
import { mockToggleLike, mockAddComment } from "../mock/mockPostActions";


export default function MemeCard({ meme }) {
  const { token, user } = useSession();

  const postId = meme._id || meme.id || "temp-post-id";
  const imageUrl = meme.image_url || meme.image || meme.url || "";

  const [likes, setLikes] = useState(meme.likes || []);
  const [comments, setComments] = useState(meme.comments || []);
  const [text, setText] = useState("");

  const createdAt = meme.createdAt
    ? new Date(meme.createdAt).toLocaleString()
    : "Just now";

  const liked =
    user &&
    likes.some(
      (like) => like?.userId && like.userId === user?._id
    );


  // Like  

      const toggleLike = async () => {
          // Not logged in → Mock mode only
          if (!token) {
            const updatedLikes = mockToggleLike({ likes, user });
            setLikes(updatedLikes);
            return;
          }

          // TODO: REAL API CALL HERE
          // const res = await apiFetch(`/posts/${postId}/like`, "POST", null, token);
          // setLikes(res.likes);
      };


  // Post comment 
      const postComment = async () => {
          if (!text.trim()) return;

          // Mock mode
          if (!token) {
            const updatedComments = mockAddComment({ comments, user, text });
            setComments(updatedComments);
            setText("");
            return;
          }

          // TODO: REAL API CALL HERE
          // const res = await apiFetch(`/posts/${postId}/comment`, "POST", { text }, token);
          // setComments(res.comments);
          // setText("");
      };

  return (
    <article className="meme-card">
      <div className="meme-header">
        
        <strong>{meme.username || "User"}</strong>
        <span className="date">{createdAt}</span>
      </div>

      {imageUrl && (
        <div className="meme-image">
          <img src={imageUrl} alt="Post" />
        </div>
      )}

{/* !!! can be changed to maybe laugh or be sad- since it's meme social*/}
      <div className="meme-actions">
        <button onClick={toggleLike}>
          {liked ? "♥" : "♡"} {likes.length}
        </button>
      </div>


  {/* TEMP mock: */}
            <div className="meme-comments">
                {comments.slice(-3).map((c, index) => (
                  <div key={c._id || c.id || index} className="comment">
                    <b>{c.username}:</b> {c.text}
                  </div>
                ))}

        <div className="comment-box">
          <input
            value={text}
            placeholder="Add a comment..."
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={postComment}>Post</button>
        </div>
      </div>
    </article>
  );
}
