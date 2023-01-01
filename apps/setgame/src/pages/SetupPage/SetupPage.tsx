import React, { useEffect, useState } from "react";
import { Button } from "ui";
import { serverCall } from "../../utils/serverCall";
import Styles from "./SetupPage.module.scss";
import { useNavigate } from "react-router-dom";

type SetupPageProps = {};

export const SetupPage = (props: SetupPageProps) => {
	const [roomIDInput, setRoomIDInput] = useState<string>("");
	const [nameInput, setNameInput] = useState<string>("");
	const [nameSet, setNameSet] = useState<boolean>(false);
	const navigate = useNavigate();

	const startGame = async () => {
		// LOGIN
		const login = await serverCall.POST("/login", { name: nameInput });
		sessionStorage.setItem("sid", login.sid);

		// ASK SERVER TO INIT A GAME AND A ROOM ID
		const gameData = await serverCall.GET("/set/newgame");

		// NAVIGATE TO THE /game/roomId received
		navigate("/game/" + gameData.roomId);
	};

	const joinGame = async () => {
		// TMP
		const login = await serverCall.POST("/login", { name: nameInput });
		sessionStorage.setItem("sid", login.sid);

		navigate("/game/" + roomIDInput);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomIDInput(e.currentTarget.value);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNameInput(e.currentTarget.value);
	};

	return (
		<div className={Styles.SetupPage}>
			{nameSet ? (
				<>
					<div className={Styles.start}>
						<Button onclick={() => startGame()}>Start a Game</Button>
					</div>
					<hr />
					<h5>Or</h5>
					<hr />
					<div className={Styles.join}>
						<input
							type="text"
							placeholder="Room ID"
							onChange={(e) => {
								handleChange(e);
							}}
							defaultValue={roomIDInput}
						/>
						<Button onclick={() => joinGame()}>Join a Game</Button>
					</div>
				</>
			) : (
				<>
					<h5>Enter a name</h5>
					<input
						type="text"
						placeholder="Pseudo"
						onChange={(e) => {
							handleNameChange(e);
						}}
						defaultValue={nameInput}
					/>
					{nameInput !== "" ? (
						<Button
							onclick={() => {
								setNameSet(true);
							}}
						>
							OK
						</Button>
					) : null}
				</>
			)}
		</div>
	);
};
