import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../context/UserProvider';
import { GamePage } from '../pages/GamePage/GamePage';
import { GamesPage } from '../pages/GamesPage/GamesPage';
import { SetupPage } from '../pages/SetupPage/SetupPage';

export const GamesRouter = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<GamesPage />} />
        <Route path="/set" element={<SetupPage />} />
        <Route path="/set/:roomId" element={<GamePage />} />
      </Routes>
    </UserProvider>
  );
};
