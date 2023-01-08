import React, { useState } from 'react';
import { Button, Input } from 'ui';
import { serverCall } from '../../utils/serverCall';
import Styles from './SetupPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

type SetupPageProps = {};

export const SetupPage = (props: SetupPageProps) => {
    const { game } = useParams();
    const [roomIDInput, setRoomIDInput] = useState<string>('');
    const navigate = useNavigate();

    const startGame = async () => {
        const gameData = await serverCall.GET(`/${game}/newgame`);
        navigate(`/games/web/${game}/${gameData.roomId}`);
    };

    const joinGame = async () => {
        navigate(`/games/web/${game}/${roomIDInput}`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoomIDInput(e.currentTarget.value);
    };

    const logout = async () => {
        await serverCall.DELETE('/logout');
        navigate('/games')
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
