import { Routes, Route } from 'react-router-dom';
import { TwitterInterface } from './components/twitter-interface';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { AuthProvider } from './lib/contexts/auth-context';
import ProtectedRoute from './components/protected-route';

import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <TwitterInterface />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/:username" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;