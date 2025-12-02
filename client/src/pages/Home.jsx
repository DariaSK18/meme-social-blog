import PostCard from "../components/PostCard";
import PostImage from "../assets/default-post.png";
import { useEffect, useState } from "react";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("http://localhost:3000/api/post");
        const data = await res.json();
        console.log(data);
        
        setPosts(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPosts();
  }, []);
  // mock posts 
  // const postsMock = [{
  //         username: "Daria",
  //         imageUrl: PostImage,
  //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorem fugiat eveniet libero exercitationem, modi quisquam ipsum rem consectetur iste quo, voluptatum quis facilis aspernatur reprehenderit, eligendi unde saepe tempora.",
  //       }, {
  //         username: "Burcu",
  //         imageUrl: PostImage,
  //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorem fugiat eveniet libero exercitationem, modi quisquam ipsum rem consectetur iste quo, voluptatum quis facilis aspernatur reprehenderit, eligendi unde saepe tempora.",
  //       }, {
  //         username: "Liv",
  //         imageUrl: PostImage,
  //         description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolorem fugiat eveniet libero exercitationem, modi quisquam ipsum rem consectetur iste quo, voluptatum quis facilis aspernatur reprehenderit, eligendi unde saepe tempora.",
  //       }]
  return (
    <>
      <h1>Home Page</h1>
      <div>
        {posts.map(post => (<PostCard key={post.id} post={post} />))}
      </div>
    </>
  );
}
