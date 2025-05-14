import { Routes, Route } from 'react-router-dom';
import { TwitterInterface } from './components/twitter-interface';
import  Login  from './pages/Login';
import Profile  from './pages/Profile';

import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<TwitterInterface />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile params={{ username: '' }} />} />
      <Route path="/profile/:username" element={<Profile params={{ username: '' }} />} />
    </Routes>
  );
}

export default App;