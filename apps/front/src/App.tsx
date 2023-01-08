import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarHandler } from './components/NavbarHandler/NavbarHandler';
import { ResolutionHandler } from './components/ResolutionHandler/ResolutionHandler';
import { ComingSoonPage } from './pages/ComingSoonPage/ComingSoonPage';
import { GamesPage } from './pages/GamesPage/GamesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { LoaderPage } from './pages/LoaderPage/LoaderPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MusicPage } from './pages/MusicPage/MusicPage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { GamesRouter } from './routers/GamesRouter';

function App() {
    return (
        <Router>
            <NavbarHandler />
            <ResolutionHandler>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/games/web/*" element={<GamesRouter />} />

                    <Route path="/music" element={<MusicPage />} />
                    <Route path="/projects" element={<ComingSoonPage />} />

                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route path="/loader" element={<LoaderPage />} />
                </Routes>
            </ResolutionHandler>
        </Router>
    );
}

export default App;
