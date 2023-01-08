import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../context/UserProvider';
import { GamePage } from '../pages/GamePage/GamePage';
import { SetupPage } from '../pages/SetupPage/SetupPage';

export const GamesRouter = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/:game" element={<SetupPage />} />
        <Route path="/:game/:roomId" element={<GamePage />} />
      </Routes>
    </UserProvider>
  );
};
