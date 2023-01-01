import { useRef, useState } from "react";
import Styles from "./GamePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { GameGrid } from "../../components/GameGrid/GameGrid";
import { CONFIG } from "../../config";
import { Button } from "ui";
import { Player, SetGame } from "setgame-fns";
import { useEffectOnce } from "hooks";

type GamePageProps = {};

interface WebSocketRef {
	current: WebSocket | null;
}

interface WebSocketResponse {
	eventName: string;
	players?: Player[];
	roomId?: string;
}

interface WebSocketGameResponse extends WebSocketResponse {
	game: SetGame;
	selection?: string[];
}

export const GamePage = (props: GamePageProps) => {
	const { roomId } = useParams();
	const [gameStarted, setGameStarted] = useState(false);
	const [selectedCards, setSelectedCards] = useState<string[]>([]);
	const [joined, setJoined] = useState(false);
	const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
	const [gameData, setGameData] = useState<SetGame | null>(null);
	const ws: WebSocketRef = useRef<WebSocket>(null);
	const navigate = useNavigate();

	const socketAvailable = () => {
		return ws.current && ws?.current?.readyState === ws?.current?.OPEN;
	};

	const findMe = (players: any[]) => {
		return players.find((p) => p.uuid === sessionStorage.getItem("sid"));
	};

	const join = () => {
		if (!socketAvailable()) return;
		const msg = {
			eventName: "playerJoined",
			roomId,
		};
		ws.current?.send(JSON.stringify(msg));
		setJoined(true);
	};

	const ready = () => {
		if (!socketAvailable()) return;

		const msg = {
			eventName: "playerReady",
			roomId,
		};
		ws.current?.send(JSON.stringify(msg));
	};

	const quitGame = () => {
		if (!socketAvailable()) return;

		const msg = {
			eventName: "playerExit",
			roomId,
		};
		ws.current?.send(JSON.stringify(msg));
		ws.current?.close();

		navigate("/");
	};

	const updateGameData = (data: any) => {
		setGameData((prev) => {
			return {
				...prev,
				...data,
			};
		});
	};

	useEffectOnce(() => {
		// Open socket to be notified of new players joining
		ws.current = new WebSocket(CONFIG.wss);
		ws.current.onopen = () => {
			console.log("Connection opened");
			join();
		};
		ws.current.onmessage = (event) => {
			const data: any = JSON.parse(event.data);
			// TODO find some way on the server to only send ws to room and not all clients
			console.log(data);

			let typedData;

			switch (data.eventName) {
				case "playerJoined":
				case "playerReady":
				case "playerExit":
					typedData = data as WebSocketResponse;
					setCurrentPlayers(typedData?.players || []);
					break;

				case "gameStart":
					setGameData((data as WebSocketGameResponse).game);
					setGameStarted(true);
					break;

				case "foundSet":
					updateGameData(data.game || {});
					setSelectedCards([...(data.selection || [])]);
					break;

				case "showMore":
				case "showMoreRequested":
					updateGameData(data.game || {});
					break;

				case "invalidSet":
					updateGameData(data.game || {});
					break;

				case "gameOver":
					updateGameData(data.game || {});

				default:
					break;
			}
		};

		ws.current.onclose = () => {
			navigate("/");
		};

		ws.current.onerror = (e) => {
			navigate("/");
		};

		// TODO Add window events to cancel room if done or no players left
	});

	return (
		<div className={Styles.GamePage}>
			{gameStarted ? (
				<>
					<Button onclick={() => navigate("/")}>Home</Button>
					<GameGrid
						gameData={gameData}
						ws={ws}
						roomId={roomId || ""}
						selectedCards={selectedCards}
					/>
				</>
			) : (
				<div className={Styles.Waiting}>
					<h1>Waiting for players</h1>
					<h3>Room: {roomId}</h3>
					<h5>Players : {currentPlayers.length}</h5>
					<ul>
						{currentPlayers.map((p: any) => (
							<li key={p.uuid}>
								{p.name} - {p.ready ? "Ready" : "Preparing"}
							</li>
						))}
					</ul>
					{!joined ? <Button onclick={() => join()}>Join</Button> : null}
					{joined && !findMe(currentPlayers)?.ready ? (
						<Button onclick={() => ready()}>Ready</Button>
					) : null}
					<Button onclick={() => quitGame()}>Quit</Button>
				</div>
			)}
		</div>
	);
};
