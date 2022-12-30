import React, { useEffect, useRef, useState } from "react";
import {
	generateDeck,
	findSets,
	isSet,
	drawCard,
	generateLayout,
	updateLayoutOnValidSet,
	updateDeckAndLayoutOnShowCountChange,
} from "setgame-fns";
import { Button, GameCard } from "ui";
import Styles from "./GameGrid.module.scss";
import { serverCall } from "../../utils/serverCall";
import { CONFIG } from "../../config";
import { SetGame } from "../../pages/GamePage/GamePage";

interface WebSocketRef {
	current: WebSocket | null;
}

type Props = {
	gameData: SetGame | null;
	ws: WebSocketRef;
	roomId: string;
	selectedCards: string[];
};

export const GameGrid = ({
	gameData = null,
	ws,
	roomId,
	selectedCards,
}: Props) => {
	const [selection, setSelection] = useState<string[]>([]);
	const [showSet, setShowSet] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(0);
	const [finalTime, setFinalTime] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [doneSets, setDoneSets] = useState<number>(0);
	const [lastDoneSet, setLastDoneSet] = useState<string[]>([]);

	const selectDeselectCard = (
		e: React.TouchEvent | React.MouseEvent | null,
		selected: boolean,
		id: string
	) => {
		const idx = selection.findIndex((el) => el === id);
		if (idx !== -1) setSelection((prev) => prev.filter((el) => el !== id));
		else setSelection((prev) => [...prev, id]);
	};

	const requestShowMore = () => {
		const msg = {
			eventName: "requestShowMore",
			roomId,
		};
		ws?.current?.send(JSON.stringify(msg));
	};

	const autoResolve = () => {
		if (gameData?.possibleSets[0]?.length === 0)
			return console.log("no sets available");

		gameData?.possibleSets[0]?.forEach((id) => {
			const card = document.getElementById(`gamecard-${id}`);
			card?.click();
		});
	};

	const isInSet = (id: string) => {
		return gameData?.possibleSets[0].includes(id);
	};

	const isInSelectedCards = (id: string) => {
		return selectedCards.includes(id);
	};

	const sendSelectionMsg = (ws: WebSocketRef, selection: string[]) => {
		const msg = {
			eventName: "foundSet",
			roomId,
			gameData,
			selection,
		};
		ws?.current?.send(JSON.stringify(msg));
	};

	useEffect(() => {
		if (selection.length !== 3) return;

		if (isSet(selection)) {
			sendSelectionMsg(ws, selection);
		} else {
			// TODO SEND MESSAGE TO SERVER FOR WRONG PICK
			setSelection([]);
			setDoneSets((prev) => (prev > 0 ? prev - 1 : 0));
		}
	}, [selection]);

	useEffect(() => {
		if (!ws.current) return;

		const handleSelectionReset = (ev: MessageEvent<any>) => {
			const data: any = JSON.parse(ev.data);
			switch (data.eventName) {
				case "foundSet":
					setSelection([]);
					setShowSet(false);
				default:
					break;
			}
		};

		ws.current.addEventListener("message", handleSelectionReset);

		return () => {
			ws.current?.removeEventListener("message", handleSelectionReset);
		};
	}, [ws]);

	// INIT
	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((timer) => timer + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const getScore = () => {
		return Math.floor(doneSets * (100 / finalTime) * 1000);
	};

	return (
		<div className={Styles.GameGrid}>
			<div className={Styles.Sidebar}>
				{gameOver ? <h2>GAME OVER</h2> : <h2>GAME RUNNING</h2>}
				<Button
					onclick={() => {
						setShowSet(false);
						// setShowCount((prev) => prev + 3);
					}}
				>
					Show more
				</Button>
				<Button onclick={() => setShowSet(true)}>Show Set</Button>
				<Button onclick={() => autoResolve()}>Resolve Set</Button>

				<div>
					{gameOver ? <>Final time: {finalTime}</> : <>Your time: {timer}s</>}
				</div>
				<div>
					Possible set: {(gameData?.possibleSets?.length !== 0).toString()}
				</div>
				<div>Deck length: {gameData?.deck.length}</div>
				<div>Show count: {gameData?.showCount}</div>
				<div>Showing set: {showSet.toString()}</div>
				<div>{gameOver ? <>Score : Score: {getScore()}</> : null}</div>

				<h3>Last set</h3>
				<div style={{ display: "flex" }}>
					{lastDoneSet.map((id) => (
						<GameCard
							id={id}
							key={`gamecard-${id}`}
							clicked={selection.includes(id)}
							tiny={true}
						/>
					))}
				</div>
				<h5>Players:</h5>
				<div>
					{gameData?.players.map((p, idx) => (
						<p>
							Player {idx + 1}: {p.currentScore}
						</p>
					))}
				</div>
			</div>
			<div className={Styles.Grid}>
				{gameData?.currentLayout.map((id, idx) => (
					<GameCard
						id={id}
						key={`gamecard-${id}`}
						onclick={(e, selected, id) => selectDeselectCard(e, selected, id)}
						highlighted={showSet && isInSet(id)}
						clicked={selection.includes(id)}
						animationDelay={idx * 0.03}
					/>
				))}
			</div>
		</div>
	);
};
