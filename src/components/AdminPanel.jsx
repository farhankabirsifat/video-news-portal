import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [videos, setVideos] = useState([]);
  const [headlines, setHeadlines] = useState([]);
  const [newVideo, setNewVideo] = useState({ id: '', title: '' });
  const [newHeadline, setNewHeadline] = useState('');

  useEffect(() => {
    // In a real app, these would be API calls to your FastAPI backend
    const mockVideos = [
      { id: "ZUQoFmTUw08", title: "Global Economic Summit Concludes" },
      { id: "kfKP4o-bXzM", title: "New Technology Breakthrough Announced" },
      { id: "EYEfm2-R3cM", title: "Climate Change Agreement Reached" }
    ];
    
    const mockHeadlines = [
      "🚨 Breaking: Major diplomatic breakthrough in international relations",
      "💰 Stock markets reach all-time high amid economic recovery",
      "🌍 Climate activists protest worldwide demanding faster action"
    ];
    
    setVideos(mockVideos);
    setHeadlines(mockHeadlines);
  }, []);

  const addVideo = () => {
    if (newVideo.id && newVideo.title) {
      setVideos([...videos, newVideo]);
      setNewVideo({ id: '', title: '' });
    }
  };

  const removeVideo = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  const addHeadline = () => {
    if (newHeadline) {
      setHeadlines([...headlines, newHeadline]);
      setNewHeadline('');
    }
  };

  const removeHeadline = (index) => {
    const newHeadlines = headlines.filter((_, i) => i !== index);
    setHeadlines(newHeadlines);
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <Link to="/" className="portal-link">Back to Portal</Link>
      </header>
      
      <div className="admin-section">
        <h3>Manage Videos</h3>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="YouTube Video ID"
            value={newVideo.id}
            onChange={(e) => setNewVideo({...newVideo, id: e.target.value})}
          />
          <input
            type="text"
            placeholder="Video Title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
          />
          <button onClick={addVideo}>Add Video</button>
        </div>
        
        <div className="video-list">
          <h4>Current Videos</h4>
          {videos.length === 0 ? (
            <p>No videos added yet.</p>
          ) : (
            <ul>
              {videos.map((video, index) => (
                <li key={index}>
                  <div className="video-info">
                    <img 
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                      alt={video.title}
                    />
                    <div>
                      <strong>{video.title}</strong>
                      <br />
                      <small>ID: {video.id}</small>
                    </div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => removeVideo(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      
      <div className="admin-section">
        <h3>Manage Headlines</h3>
        
        <div className="form-group">
          <input
            type="text"
            placeholder="New Headline"
            value={newHeadline}
            onChange={(e) => setNewHeadline(e.target.value)}
          />
          <button onClick={addHeadline}>Add Headline</button>
        </div>
        
        <div className="headline-list">
          <h4>Current Headlines</h4>
          {headlines.length === 0 ? (
            <p>No headlines added yet.</p>
          ) : (
            <ul>
              {headlines.map((headline, index) => (
                <li key={index}>
                  <span>{headline}</span>
                  <button 
                    className="delete-btn"
                    onClick={() => removeHeadline(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-panel {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: left;
        }
        
        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #ddd;
        }
        
        .admin-header h1 {
          margin: 0;
          color: #333;
        }
        
        .portal-link {
          background: #333;
          color: white;
          padding: 8px 16px;
          text-decoration: none;
          border-radius: 4px;
          font-size: 14px;
        }
        
        .portal-link:hover {
          background: #555;
        }
        
        .admin-section {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .form-group {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        
        .form-group input {
          flex: 1;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 150px;
        }
        
        .form-group button {
          padding: 8px 16px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .form-group button:hover {
          background: #45a049;
        }
        
        ul {
          list-style: none;
          padding: 0;
        }
        
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .video-info {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .video-info img {
          width: 60px;
          height: 45px;
          object-fit: cover;
        }
        
        .delete-btn {
          background: #f44336;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .delete-btn:hover {
          background: #d32f2f;
        }
        
        @media (max-width: 768px) {
          .form-group {
            flex-direction: column;
          }
          
          .form-group input, 
          .form-group button {
            width: 100%;
          }
          
          .admin-header {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;