import React, { useEffect, useState } from "react";
import { Button, Input } from "ui";
import { serverCall } from "../../utils/serverCall";
import Styles from "./SetupPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "hooks";

type SetupPageProps = {};

export const SetupPage = (props: SetupPageProps) => {
	const [roomIDInput, setRoomIDInput] = useState<string>("");
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const navigate = useNavigate();

	const startGame = async () => {
		// ASK SERVER TO INIT A GAME AND A ROOM ID
		const gameData = await serverCall.GET("/set/newgame");

		// NAVIGATE TO THE /game/roomId received
		navigate("/games/set/" + gameData.roomId);
	};

	const joinGame = async () => {
		navigate("/games/set/" + roomIDInput);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRoomIDInput(e.currentTarget.value);
	};

	const logout = async () => {
		await serverCall.DELETE("/logout");
		location.reload();
	};

	useEffectOnce(() => {
		const checkLogStatus = async () => {
			const data = await serverCall.GET("/auth/check");

			if (data?.success) {
				setIsLoggedIn(true);
			}
		};

		checkLogStatus();
	});

	return (
		<div className={Styles.SetupPage}>
			{isLoggedIn ? (
				<>
					<Button
						onclick={() => {
							logout();
						}}
					>
						Logout
					</Button>
					<div className={Styles.start}>
						<p>
							Create a new room, a Room ID will be created that you can then
							share to friends or foes for them to join.
						</p>
						<Button onclick={() => startGame()}>Start a new Game</Button>
					</div>
					<p>OR</p>
					<div className={Styles.join}>
						<p>Join an existing game with a Room ID</p>
						<Input
							type="text"
							placeholder="Room ID"
							onchange={(e) => {
								handleChange(e);
							}}
							defaultValue={roomIDInput}
						/>
						<Button onclick={() => joinGame()}>Join a Game</Button>
					</div>
				</>
			) : (
				<div className={Styles.namePick}>
					<div className={Styles.inputContainer}>
						<p>You need to be logged in to play this game</p>
						<Button onclick={() => navigate("/login")} fullWidth={true}>Login</Button>
						<Button onclick={() => navigate("/signup")} fullWidth={true}>Create account</Button>
					</div>
				</div>
			)}
		</div>
	);
};