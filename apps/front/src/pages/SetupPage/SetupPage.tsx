import React, { useState } from 'react';
import { Button, Input } from 'ui';
import { serverCall } from '../../utils/serverCall';
import Styles from './SetupPage.module.scss';
import { useNavigate } from 'react-router-dom';

type SetupPageProps = {};

export const SetupPage = (props: SetupPageProps) => {
    const [roomIDInput, setRoomIDInput] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    const startGame = async () => {
        // ASK SERVER TO INIT A GAME AND A ROOM ID
        const gameData = await serverCall.GET('/set/newgame');

        // NAVIGATE TO THE /game/roomId received
        navigate('/games/set/' + gameData.roomId);
    };

    const joinGame = async () => {
        navigate('/games/set/' + roomIDInput);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomIDInput(e.currentTarget.value);
    };

    const logout = async () => {
        await serverCall.DELETE('/logout');
        location.reload();
    };

    return (
        <div className={Styles.SetupPage}>
            <Button
                onclick={() => {
                    logout();
                }}
            >
                Logout
            </Button>
            <div className={Styles.start}>
                <p>
                    Create a new room, a Room ID will be created that you can then share to friends or foes for them to
                    join.
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
        </div>
    );
};
