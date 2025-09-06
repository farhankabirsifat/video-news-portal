import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const VideoPortal = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [headline, setHeadline] = useState("🔴 Breaking News: This is scrolling text at the bottom just like a news channel ticker!");
  const [isMuted, setIsMuted] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const playerRef = useRef(null);
  const playerObjRef = useRef(null);

  const [videos] = useState([
    { id: "ZUQoFmTUw08", title: "Global Economic Summit Concludes" },
    { id: "kfKP4o-bXzM", title: "New Technology Breakthrough Announced" },
    { id: "EYEfm2-R3cM", title: "Climate Change Agreement Reached" }
  ]);

  const newsHeadlines = [
    "🚨 Breaking: Major diplomatic breakthrough in international relations",
    "💰 Stock markets reach all-time high amid economic recovery",
    "🌍 Climate activists protest worldwide demanding faster action",
    "🏆 Local sports team wins championship after 20-year drought",
    "🔬 Scientific discovery could lead to new medical treatments"
  ];

  const handleUserInteraction = () => {
    if (!userInteracted && playerObjRef.current) {
      setUserInteracted(true);
      setIsMuted(false);
      playerObjRef.current.unMute();
      playerObjRef.current.playVideo();
    }
  };

  useEffect(() => {
    const interactionEvents = ['click', 'touchstart', 'keydown'];
    interactionEvents.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    const headlineInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * newsHeadlines.length);
      setHeadline(newsHeadlines[randomIndex]);
    }, 10000);

    return () => {
      clearInterval(headlineInterval);
      interactionEvents.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
      if (playerObjRef.current) {
        playerObjRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (playerObjRef.current && window.YT && window.YT.Player) {
      playerObjRef.current.loadVideoById({
        videoId: videos[currentVideoIndex].id,
        startSeconds: 0,
        suggestedQuality: 'large'
      });
    }
  }, [currentVideoIndex, videos]);

  const initializePlayer = () => {
    playerObjRef.current = new window.YT.Player(playerRef.current, {
      videoId: videos[currentVideoIndex].id,
      playerVars: {
        'autoplay': 1,
        'controls': 1,
        'modestbranding': 1,
        'rel': 0,
        'mute': isMuted ? 1 : 0,
        'playsinline': 1
      },
      events: {
        'onReady': (event) => {
          event.target.playVideo();
          if (event.target.getPlayerState() !== window.YT.PlayerState.PLAYING) {
            event.target.playVideo();
          }
        },
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      }
    });
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PAUSED && !userInteracted) {
      event.target.playVideo();
    }
    
    if (event.data === window.YT.PlayerState.ENDED) {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
    }
  };

  const onPlayerError = (event) => {
    console.error('YouTube Player Error:', event.data);
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
  };

  const toggleMute = () => {
    if (playerObjRef.current) {
      if (isMuted) {
        playerObjRef.current.unMute();
        setIsMuted(false);
      } else {
        playerObjRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="video-portal" onClick={handleUserInteraction}>
      <header className="portal-header">
  <h1>Video News Portal</h1>
  <Link to="/admin" className="admin-link">Admin</Link>
      </header>
      <div className="video-container">
        <div ref={playerRef} className="player"></div>
        <div className="headline">
          <span>{headline}</span>
        </div>
        {!userInteracted && (
          <div className="click-overlay">
            <p>Click anywhere to enable sound</p>
          </div>
        )}
        <button className="mute-btn" onClick={toggleMute}>
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      <style jsx>{`
        .video-portal {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .portal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
        }
        
        .portal-header h1 {
          margin: 0;
          color: #333;
        }
        
        .admin-link {
          background: #4CAF50;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .admin-link:hover {
          background: #45a049;
        }
        
        .video-container {
          width: 100%;
          height: 450px;
          margin: 0 auto;
          position: relative;
          background: #000;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        
        .player {
          width: 100%;
          height: 100%;
        }
        
        .headline {
          position: absolute;
          bottom: 0;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          background: rgba(0,0,0,0.8);
          color: #fff;
          font-size: 18px;
          padding: 8px 0;
          z-index: 10;
        }
        
        .headline span {
          display: inline-block;
          padding-left: 100%;
          animation: marquee 15s linear infinite;
        }
        
        @keyframes marquee {
          from { transform: translateX(0%); }
          to { transform: translateX(-100%); }
        }
        
        .click-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 18px;
          z-index: 5;
        }
        
        .mute-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.5);
          border: none;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          z-index: 10;
        }
        
        @media (max-width: 768px) {
          .video-container {
            height: 250px;
          }
          
          .portal-header {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default VideoPortal;