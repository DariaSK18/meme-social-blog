import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import PostImage from "../assets/default-post.png";
// import { useAuth } from "../context/AuthContext";

export default function PostCard({ post }) {
  // const { user, logout } = useAuth();
  return (
    <div className="post">
      <div className="post__user user">
        {/* <img
          src={post.userAvatar}
          alt={post.username}
          className="user__img"
        /> */}
        <FontAwesomeIcon icon={faUser} />
        <span className="user__username">{post.user.username}</span>
      </div>

      <div className="post__image">
        <img
          style={{ width: "25rem" }}
          src={post.image_url.trim() !== "" ? post.image_url : PostImage}
          alt="post"
        />
      </div>

      <div className="post__actions">
        <Button text={<FontAwesomeIcon icon={faHeart} />}></Button>{" "}
        <span>{post.likesCount}</span>
        <Button text={<FontAwesomeIcon icon={faComment} />}></Button>{" "}
        <span>{post.commentsCount}</span>
        <Button text={<FontAwesomeIcon icon={faShare} />}></Button>
      </div>
      <div className="post__info">
        <span style={{ color: "green" }} className="post__description">
          {post.user.username}
        </span>
        <span style={{ color: "green" }}>{post.title}</span>
        <span>{post.description}</span>
      </div>
      <div className="post__tags">
        {post.tags?.map((tag) => (
          <span key={tag.id}>#{tag.tag_name} </span>
        ))}
      </div>
    </div>
  );
}
