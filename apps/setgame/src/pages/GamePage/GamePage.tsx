import React, { useEffect, useRef, useState } from "react";
import Styles from "./GamePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { GameGrid } from "../../components/GameGrid/GameGrid";
import { CONFIG } from "../../config";
import { Button } from "ui";

type GamePageProps = {};

interface WebSocketRef {
	current: WebSocket | null;
}

type Player = {
	uuid: string;
	wins: number;
	currentScore: number;
	ready: boolean;
};

export type SetGame = {
	players: Player[];
	deck: string[];
	currentLayout: string[];
	setIsPossible: boolean;
	possibleSets: string[][];
	showCount: number;
};

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

	useEffect(() => {
		// Open socket to be notified of new players joining
		ws.current = new WebSocket(CONFIG.wss);
		ws.current.onopen = () => {
			console.log("Connection opened");
		};
		ws.current.onmessage = (event) => {
			const data: any = JSON.parse(event.data);
			// TODO find some way on the server to only send ws to room and not all clients
			console.log(data);

			let typedData;

			switch (data.eventName) {
				case "playerJoined":
					typedData = data as WebSocketResponse;
					setCurrentPlayers(typedData?.players || []);
					break;

				case "playerReady":
					typedData = data as WebSocketResponse;
					setCurrentPlayers(typedData?.players || []);
					break;

				case "playerExit":
					typedData = data as WebSocketResponse;
					setCurrentPlayers(typedData?.players || []);
					break;

				case "gameStart":
					setGameData((data as WebSocketGameResponse).game);
					setGameStarted(true);
					break;

				case "foundSet":
					setGameData((prev) => {
						return {
							...prev,
							...(data.game || {}),
						};
					});
					setSelectedCards([...(data.selection || [])]);
					break;

				default:
					break;
			}
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (e) => {
			location.reload();
		};

		// TODO Add window events to cancel room if done or no players left
	}, []);

	console.log({ selectedCardsFrom: selectedCards });

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
				<>
					<h1>Waiting for players</h1>
					<h3>Room: {roomId}</h3>
					<h5>Players : {currentPlayers.length}</h5>
					<ul>
						{currentPlayers.map((p: any) => (
							<li key={p.uuid}>
								{p.uuid!} - {p.ready ? "Ready" : "Preparing"}
							</li>
						))}
					</ul>
					{!joined ? <Button onclick={() => join()}>Join</Button> : null}
					{joined && !findMe(currentPlayers)?.ready ? (
						<Button onclick={() => ready()}>Ready</Button>
					) : null}
					<Button onclick={() => quitGame()}>Quit</Button>
				</>
			)}
			{/* <GameGrid /> */}
		</div>
	);
};
