import "./Shorts.css";
import { useLocation } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import img1 from "../../assets/img1.jpeg";
import img2 from "../../assets/img2.jpeg";
import img3 from "../../assets/img3.jpeg";
import img4 from "../../assets/img4.jpeg";
import img5 from "../../assets/img5.jpeg";
import vid1 from "../../assets/1.mp4";
import vid2 from "../../assets/2.mp4";
import vid3 from "../../assets/3.mp4";
import vid4 from "../../assets/4.mp4";
import vid5 from "../../assets/5.mp4";

// Example comments data for reels
const commentsData = {
  2: ["Great reel!", "Love this!"],
  5: ["Amazing video!", "So funny!"],
  // Add more as needed
};

const shortsReels = [
  { id: 1, thumbnail: img1, video: vid1 },
  { id: 2, thumbnail: img2, video: vid2 },
  { id: 3, thumbnail: img3, video: vid3 },
  { id: 4, thumbnail: img4, video: vid4 },
  { id: 5, thumbnail: img5, video: vid5 },
  { id: 6, thumbnail: img1, video: vid1 },
  { id: 7, thumbnail: img2, video: vid2 },
  { id: 8, thumbnail: img3, video: vid3 },
  { id: 9, thumbnail: img4, video: vid4 },
  { id: 10, thumbnail: img5, video: vid5 },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Shorts = () => {
  const query = useQuery();
  const start = parseInt(query.get("start")) || 0;
  const [selected, setSelected] = useState(start);
  const carouselRef = useRef(null);

  // Center the selected video in the viewport
  useEffect(() => {
    if (carouselRef.current) {
      const selectedElem = carouselRef.current.querySelector(
        `[data-index="center"]`
      );
      if (selectedElem) {
        const carouselRect = carouselRef.current.getBoundingClientRect();
        const elemRect = selectedElem.getBoundingClientRect();
        const offset =
          elemRect.left -
          carouselRect.left -
          carouselRect.width / 2 +
          elemRect.width / 2;
        carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
      }
    }
  }, [selected]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        setSelected((prev) => Math.min(prev + 1, shortsReels.length - 1));
      } else if (e.key === "ArrowLeft") {
        setSelected((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Get left side: if comments exist for current reel, show comments, else show previous reels
  const maxSide = 3;
  const leftReelIdxs = [];
  for (let i = 1; i <= maxSide; i++) {
    if (selected - i >= 0) leftReelIdxs.push(selected - i);
  }
  let leftContent;
  if (commentsData[shortsReels[selected].id]) {
    leftContent = (
      <div className="shorts-comments">
        <h3>Comments</h3>
        {commentsData[shortsReels[selected].id].map((c, i) => (
          <div key={i} className="shorts-comment">{c}</div>
        ))}
      </div>
    );
  } else {
    leftContent = leftReelIdxs.map((idx, i) => (
      <div
        key={shortsReels[idx].id}
        className={`shorts-side-reel left size-${maxSide - i}`}
        onClick={() => setSelected(idx)}
      >
        <img
          src={shortsReels[idx].thumbnail}
          alt={`Short ${shortsReels[idx].id}`}
          className="shorts-thumb"
        />
      </div>
    ));
  }

  // Get right side: next reels, stacked with decreasing size
  const rightReelIdxs = [];
  for (let i = 1; i <= maxSide; i++) {
    if (selected + i < shortsReels.length) rightReelIdxs.push(selected + i);
  }
  const rightContent = rightReelIdxs.map((idx, i) => (
    <div
      key={shortsReels[idx].id}
      className={`shorts-side-reel right size-${maxSide - i}`}
      onClick={() => setSelected(idx)}
    >
      <img
        src={shortsReels[idx].thumbnail}
        alt={`Short ${shortsReels[idx].id}`}
        className="shorts-thumb"
      />
    </div>
  ));

  return (
    <div className="shorts-fullpage-container">
      <div className="shorts-fullpage-row">
        <div className="shorts-fullpage-left">{leftContent}</div>
        <div
          className="shorts-fullpage-center"
          data-index="center"
          ref={carouselRef}
        >
          <video
            src={shortsReels[selected].video}
            poster={shortsReels[selected].thumbnail}
            autoPlay
            loop
            className="shorts-video-main"
            controls={false}
            playsInline
            muted
            style={{ height: "100vh", width: "auto", maxWidth: "100vw" }}
          />
          <div className="shorts-title-main">Short {shortsReels[selected].id}</div>
        </div>
        <div className="shorts-fullpage-right">{rightContent}</div>
      </div>
    </div>
  );
};

export default Shorts;