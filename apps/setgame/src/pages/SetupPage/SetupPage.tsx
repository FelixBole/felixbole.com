import React, { useEffect, useState } from "react";
import { Button } from "ui";
import { serverCall } from "../../utils/serverCall";
import Styles from "./SetupPage.module.scss";
import { useNavigate } from "react-router-dom";

type SetupPageProps = {};

export const SetupPage = (props: SetupPageProps) => {
	const [roomIDInput, setRoomIDInput] = useState<string>("");
	const navigate = useNavigate();

	const startGame = async () => {
		// LOGIN
		const login = await serverCall.POST("/login");
		sessionStorage.setItem("sid", login.sid);

		// ASK SERVER TO INIT A GAME AND A ROOM ID
		const gameData = await serverCall.GET("/set/newgame");

		// NAVIGATE TO THE /game/roomId received
		navigate("/game/" + gameData.roomId);
	};

	const joinGame = async () => {
		// TMP
		const login = await serverCall.POST("/login");
		sessionStorage.setItem("sid", login.sid);

		navigate("/game/" + roomIDInput);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomIDInput(e.currentTarget.value);
	};

	return (
		<div className={Styles.SetupPage}>
			<div className={Styles.start}>
				<Button onclick={() => startGame()}>Start a Game</Button>
			</div>
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
		</div>
	);
};
