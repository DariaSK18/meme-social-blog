// Picks random meme on button click

import { useEffect, useState } from "react";
import "../styles/RandomMeme.css";

export default function RandomMeme() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success) setMemes(data.data.memes);
      });
  }, []);

  const randomMeme = () => {
    if (!memes.length) return;
    const i = Math.floor(Math.random() * memes.length);
    setMeme(memes[i]);
  };

  return (
    <div>
      <button className="random-meme-button" onClick={randomMeme}>
        Show Random Meme
      </button>

      {meme && (
        <>
          <img src={meme.url} alt={meme.name} />
          <p className="trending-meme-title">{meme.name}</p>
        </>
      )}
    </div>
  );
}