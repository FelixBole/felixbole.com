import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage/GamePage";
import { SetupPage } from "./pages/SetupPage/SetupPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<SetupPage />} />
				<Route path="/game/:roomId" element={<GamePage />} />
			</Routes>
		</Router>
	);
}

export default App;
