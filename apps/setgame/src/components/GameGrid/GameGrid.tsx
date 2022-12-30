import React, { useEffect, useRef, useState } from "react";
import {
	generateDeck,
	findSets,
	isSet,
	drawCard,
	generateLayout,
	updateLayoutOnValidSet,
} from "setgame-fns";
import { Button, GameCard } from "ui";
import Styles from "./GameGrid.module.scss";
import { serverCall } from "../../utils/serverCall";
import { CONFIG } from "../../config";

interface WebSocketRef {
	current: WebSocket | null;
}

export const GameGrid = () => {
	const [deck, setDeck] = useState<string[]>([]);
	const [currentLayout, setCurrentLayout] = useState<string[]>([]);
	const [selection, setSelection] = useState<string[]>([]);
	const [showCount, setShowCount] = useState<number>(12);
	const [possibleSet, setPossibleSet] = useState<string[]>([]);
	const [showSet, setShowSet] = useState<boolean>(false);
	const [timer, setTimer] = useState<number>(0);
	const [finalTime, setFinalTime] = useState<number>(0);
	const [gameOver, setGameOver] = useState<boolean>(false);
	const [doneSets, setDoneSets] = useState<number>(0);
	const [lastDoneSet, setLastDoneSet] = useState<string[]>([]);

	const ws: WebSocketRef = useRef<WebSocket>(null);

	const selectDeselectCard = (
		e: React.TouchEvent | React.MouseEvent | null,
		selected: boolean,
		id: string
	) => {
		const idx = selection.findIndex((el) => el === id);
		if (idx !== -1) setSelection((prev) => prev.filter((el) => el !== id));
		else setSelection((prev) => [...prev, id]);
	};

	const resetShowCount = () => {
		setShowCount((prev) => {
			if (prev === 18) return 15;
			else return 12;
		});
	};

	const autoResolve = () => {
		if (possibleSet.length === 0) return console.log("no sets available");

		possibleSet.forEach((id) => {
			const card = document.getElementById(`gamecard-${id}`);
			card?.click();
		});
	};

	const isInSet = (id: string) => {
		return possibleSet.includes(id);
	};

	const updatePossibleSet = (layout: string[]) => {
		const possibleSets = findSets(layout);
		setPossibleSet(possibleSets.length !== 0 ? possibleSets[0] : []);
		return possibleSets;
	};

	useEffect(() => {
		if (selection.length !== 3) return;

		if (isSet(selection)) {
			resetShowCount();

			// set new deck with current values of deck (without layout)
			const newDeck = [...deck];

			// Re-render the layout with 3 random cards from the remaining deck without deleting them
			// Do operations outside of setstate othewise setdeck won't have the updated array
			const layout = updateLayoutOnValidSet(
				newDeck,
				[...currentLayout],
				selection
			);

			const possibleSets = updatePossibleSet(layout);
			setCurrentLayout(layout);
			setDeck(newDeck);
			setSelection([]);

			if (showSet) {
				setShowSet(false);
			} else {
				setDoneSets((prev) => prev + 1);
				setLastDoneSet(selection);
			}

			if (possibleSets.length === 0 && newDeck.length === 0) {
				setGameOver(true);
				setFinalTime(timer);
			}
		} else {
			setSelection([]);
			setDoneSets((prev) => (prev > 0 ? prev - 1 : 0));
		}
	}, [selection]);

	useEffect(() => {
		if (!currentLayout.length || !deck.length) return;
		const layout = [...currentLayout];
		const newDeck = [...deck];

		if (showCount === 12) {
			if (currentLayout.length === 15) {
				// Reapply last three to deck
				for (let i = 0; i < 3; i++) {
					newDeck.push(layout.pop()!);
				}
			} else if (currentLayout.length === 18) {
				for (let i = 0; i < 6; i++) {
					newDeck.push(layout.pop()!);
				}
			}
		} else if (showCount === 15) {
			if (currentLayout.length === 12) {
				// Get three more
				for (let i = 0; i < 3; i++) {
					layout.push(drawCard(newDeck, true));
				}
			} else if (currentLayout.length === 18) {
				for (let i = 0; i < 3; i++) {
					newDeck.push(layout.pop()!);
				}
			}
		} else if (showCount === 18) {
			for (let i = 0; i < 3; i++) {
				layout.push(drawCard(newDeck, true));
			}
		}

		setCurrentLayout(layout);
		updatePossibleSet(layout);
		setDeck(newDeck);
	}, [showCount]);

	// INIT
	useEffect(() => {
		const newDeck = generateDeck();
		const layout = generateLayout(newDeck, showCount);
		setDeck(newDeck);
		setCurrentLayout(layout);
		updatePossibleSet(layout);

		const interval = setInterval(() => {
			setTimer((timer) => timer + 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const setupWS = () => {
		ws.current = new WebSocket(CONFIG.wss);
		ws.current.onopen = () => {
			console.log("Connection opened");
		};
		ws.current.onmessage = (event) => {
			console.log("Received message:", event.data);
		};

		ws.current.onclose = () => {
			console.log("WebSocket connection closed");
		};

		ws.current.onerror = (e) => {
			console.log(e);
		};
	};

	const sendMsg = () => {
		ws.current?.send("TEST MESSAGE");
	};

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
						setShowCount((prev) => prev + 3);
					}}
				>
					Show more
				</Button>
				<Button onclick={() => setShowSet(true)}>Show Set</Button>
				<Button onclick={() => autoResolve()}>Resolve Set</Button>
				<Button onclick={() => serverCall.POST("/login")}>Login</Button>
				<Button onclick={() => serverCall.DELETE("/logout")}>Logout</Button>
				<Button onclick={() => setupWS()}>Setup WS</Button>
				<Button onclick={() => sendMsg()}>Test message</Button>

				<div>
					{gameOver ? <>Final time: {finalTime}</> : <>Your time: {timer}s</>}
				</div>
				<div>Possible set: {(possibleSet.length !== 0).toString()}</div>
				<div>Deck length: {deck.length}</div>
				<div>Show count: {showCount}</div>
				<div>Done sets: {doneSets}</div>
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
			</div>
			<div className={Styles.Grid}>
				{currentLayout.map((id, idx) => (
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
