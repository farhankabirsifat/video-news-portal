import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoPortal from './components/VideoPortal';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<VideoPortal />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;