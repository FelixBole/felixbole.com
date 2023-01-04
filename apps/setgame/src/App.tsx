import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { SetupPage } from "./pages/SetupPage/SetupPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SetupPage />} />
				<Route path="/game/:roomId" element={<GamePage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	);
}

export default App;
