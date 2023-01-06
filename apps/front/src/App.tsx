import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarHandler } from './components/NavbarHandler/NavbarHandler';
import { ResolutionHandler } from './components/ResolutionHandler/ResolutionHandler';
import { GamePage } from './pages/GamePage/GamePage';
import { GamesPage } from './pages/GamesPage/GamesPage';
import { HomePage } from './pages/HomePage/HomePage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SetupPage } from './pages/SetupPage/SetupPage';
import { SignupPage } from './pages/SignupPage/SignupPage';

function App() {
    return (
        <Router>
            <NavbarHandler />
			<ResolutionHandler>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/games" element={<GamesPage />} />
					<Route path="/games/set" element={<SetupPage />} />
					<Route path="/games/set/:roomId" element={<GamePage />} />

					<Route path="/music" element={<>Coming soon</>} />
					<Route path="/projects" element={<>Coming soon</>} />

					<Route path="/signup" element={<SignupPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Routes>
			</ResolutionHandler>
        </Router>
    );
}

export default App;
