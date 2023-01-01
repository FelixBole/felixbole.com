import { useEffectOnce } from "hooks";
import React, { useEffect, useState } from "react";
import { isGameOver, isSet, SetGame } from "setgame-fns";
import { Button, GameCard } from "ui";
import Styles from "./GameGrid.module.scss";

interface WebSocketRef {
	current: WebSocket | null;
}

type Props = {
	gameData: SetGame | null;
	ws: WebSocketRef;
	roomId: string;
	selectedCards: string[];
};

export const GameGrid = ({ gameData = null, ws, roomId }: Props) => {
	const [selection, setSelection] = useState<string[]>([]);
	const [showSet, setShowSet] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(
		gameData?.startedAt
			? Math.floor((Date.now() - gameData?.startedAt) / 1000)
			: 0
	);

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
			eventName: "showMore",
			roomId,
		};
		ws?.current?.send(JSON.stringify(msg));
	};

	const sendInvalidSet = () => {
		const msg = {
			eventName: "invalidSet",
			roomId,
		};
		ws?.current?.send(JSON.stringify(msg));
	};

	const autoResolve = () => {
		if (!gameData?.setIsPossible) return console.log("no sets available");

		gameData?.possibleSets[0]?.forEach((id) => {
			const card = document.getElementById(`gamecard-${id}`);
			card?.click();
		});
	};

	const isInSet = (id: string) => {
		return gameData?.possibleSets[0]?.includes(id);
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

	const isLastInvalidPlayer = (uuid: string) => {
		return gameData?.lastInvalidPlayerID === uuid;
	};

	const isLastValidPlayer = (uuid: string) => {
		return gameData?.lastValidPlayerID === uuid;
	};

	const playerHighlight = (uuid: string) => {
		if (isLastInvalidPlayer(uuid)) {
			return "red";
		}

		if (isLastValidPlayer(uuid)) {
			return "green";
		}
	};

	useEffect(() => {
		if (selection.length !== 3) return;

		if (isSet(selection)) {
			sendSelectionMsg(ws, selection);
		} else {
			sendInvalidSet();
		}
		setSelection([]);
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
	useEffectOnce(() => {
		const interval = setInterval(() => {
			setTimer((timer) => timer + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	// const getScore = () => {
	// 	return Math.floor(doneSets * (100 / finalTime) * 1000);
	// };

	return (
		<div className={Styles.GameGrid}>
			<div className={Styles.Sidebar}>
				{gameData !== null && isGameOver(gameData) ? (
					<>GAME OVER</>
				) : (
					<>
						<Button
							onclick={() => {
								setShowSet(false);
								requestShowMore();
							}}
						>
							Show more
						</Button>
						<Button onclick={() => setShowSet(true)}>Show Set</Button>
						<Button onclick={() => autoResolve()}>Resolve Set</Button>
						<div>
							Possible set: {(gameData?.possibleSets?.length !== 0).toString()}
						</div>
						<div>Deck length: {gameData?.deck.length}</div>
						<div>Showing: {gameData?.showCount}</div>
						<div>Time: {timer}</div>
					</>
				)}

				<h3>Last set</h3>
				<div style={{ display: "flex" }}>
					{gameData !== null
						? gameData?.lastSet.map((id) => (
								<GameCard
									id={id}
									key={`gamecard-${id}`}
									clicked={selection.includes(id)}
									tiny={true}
								/>
						  ))
						: null}
				</div>
				<h5>Players:</h5>
				<div>
					{gameData?.players.map((p, idx) => (
						<p key={p.uuid}>
							<h5
								style={{
									color: playerHighlight(p.uuid),
								}}
							>
								{p.name}: {p.currentScore}
							</h5>
							<small>{p.requestShowMore ? "Requested Show More" : null}</small>
						</p>
					))}
				</div>
			</div>
			<div className={Styles.Grid}>
				{gameData && !isGameOver(gameData) ? (
					gameData?.currentLayout.map((id, idx) => (
						<GameCard
							id={id}
							key={`gamecard-${id}`}
							onclick={(e, selected, id) => selectDeselectCard(e, selected, id)}
							highlighted={showSet && isInSet(id)}
							clicked={selection.includes(id)}
							animationDelay={idx * 0.03}
						/>
					))
				) : (
					<>
						<h3>Score</h3>
						<ol>
							{gameData !== null &&
								gameData?.players.map((p) => (
									<li>
										{p.name} - {p.currentScore} sets
									</li>
								))}
						</ol>
					</>
				)}
			</div>
		</div>
	);
};
