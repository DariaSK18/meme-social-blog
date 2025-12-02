import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faShare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";

export default function PostCard({ post }) {
  return (
    <div className="post">
      <div className="post__user user">
        {/* <img
          src={post.userAvatar}
          alt={post.username}
          className="user__img"
        /> */}
        <FontAwesomeIcon icon={faUser} />
        <span className="user__username">{post.username}</span>
      </div>

      <div className="post__image">
        <img style={{width: "25rem"}} src={post.imageUrl || "/default-post.png"} alt="post" />
      </div>

      <div className="post__actions">
        <Button text={<FontAwesomeIcon icon={faHeart} />}></Button>
        <Button text={<FontAwesomeIcon icon={faComment} />}></Button>
        <Button text={<FontAwesomeIcon icon={faShare} />}></Button>
      </div>
      <div className="post__info">
        <span style={{color: "green"}} className="post__description">{post.username}</span>
        <span>{post.description}</span>
      </div>
    </div>
  );
}
