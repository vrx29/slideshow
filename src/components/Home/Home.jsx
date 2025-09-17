import "./Home.css";
import { useNavigate } from 'react-router-dom';
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

const dramaReels = [
  { id: 1, thumbnail: img1, video: vid1 },
  { id: 2, thumbnail: img2, video: vid2 },
  { id: 3, thumbnail: img3, video: vid3 },
  { id: 4, thumbnail: img4, video: vid4 },
  { id: 5, thumbnail: img5, video: vid5 },
];

const Home = () => {
  const navigate = useNavigate();

  // View more: show all videos starting from first
  const handleShortsClick = () => {
    navigate('/shorts?start=0');
  };

  const handleDramaClick = () => {
    navigate('/drama?start=0');
  };

  // Clicking a thumbnail: show only that video
  const handleShortThumbnailClick = (index) => {
    navigate(`/shorts?start=${index}`);
  };

  const handleDramaThumbnailClick = (index) => {
    navigate(`/drama?start=${index}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Slideshow</h1>
      
      {/* Shorts Section */}
      <section className="section">
        <div className="section-header">
          <h2>Shorts</h2>
          <button className="view-more" onClick={handleShortsClick}>View more</button>
        </div>
        <div className="reels-list">
          {shortsReels.map((reel, idx) => (
            <img
              key={reel.id}
              src={reel.thumbnail}
              alt={`Short ${reel.id}`}
              className="reel-thumb"
              onClick={() => handleShortThumbnailClick(idx)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </section>

      {/* Drama Section */}
      <section className="section">
        <div className="section-header">
          <h2>Drama Videos</h2>
          <button className="view-more" onClick={handleDramaClick}>View more</button>
        </div>
        <div className="reels-list">
          {dramaReels.map((reel, idx) => (
            <img
              key={reel.id}
              src={reel.thumbnail}
              alt={`Drama ${reel.id}`}
              className="reel-thumb"
              onClick={() => handleDramaThumbnailClick(idx)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;