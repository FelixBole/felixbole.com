import React, { useRef, useState } from 'react';
import Styles from './GamePage.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { GameGrid } from '../../components/GameGrid/GameGrid';
import { CONFIG } from '../../config';
import { Button, Checkmark } from 'ui';
import { Player, SetGame } from 'setgame-fns';
import { useEffectOnce, useWebSocket } from 'hooks';

type GamePageProps = {};

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
    const navigate = useNavigate();

    // Websocket callbacks
    const onWsOpen = () => {
        console.log('Connection opened');
        join();
    };

    const onWsMessage = (e: MessageEvent<any>) => {
        const data: any = JSON.parse(e.data);
        let typedData;

        switch (data.eventName) {
            case 'playerJoined':
            case 'playerReady':
            case 'playerExit':
                typedData = data as WebSocketResponse;
                setCurrentPlayers(typedData?.players || []);
                break;

            case 'gameStart':
                setGameData((data as WebSocketGameResponse).game);
                setGameStarted(true);
                break;

            case 'foundSet':
                updateGameData(data.game || {});
                setSelectedCards([...(data.selection || [])]);
                break;

            case 'showMore':
            case 'showMoreRequested':
            case 'invalidSet':
                updateGameData(data.game || {});
                break;

            case 'gameOver':
                updateGameData(data.game || {});

            default:
                break;
        }
    };

    const onWsClose = () => {
        // navigate('/games');
    };

    const ws = useWebSocket({
        webSocketURL: CONFIG.wss,
        onopen: onWsOpen,
        onclose: onWsClose,
        onmessage: onWsMessage,
        onerror: onWsClose,
    });

    const handleClickID = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        navigator.clipboard.writeText(e.currentTarget.innerText);
    };

    const socketAvailable = () => {
        return ws.current && ws?.current?.readyState === ws?.current?.OPEN;
    };

    const findMe = (players: any[]) => {
        return players.find((p) => p.uuid === sessionStorage.getItem('sid'));
    };

    const join = () => {
        if (!socketAvailable()) return;
        const msg = {
            eventName: 'playerJoined',
            roomId,
        };
        ws.current?.send(JSON.stringify(msg));
        setJoined(true);
    };

    const ready = () => {
        if (!socketAvailable()) return;

        const msg = {
            eventName: 'playerReady',
            roomId,
        };
        ws.current?.send(JSON.stringify(msg));
    };

    const quitGame = () => {
        if (!socketAvailable()) return;

        const msg = {
            eventName: 'playerExit',
            roomId,
        };
        ws.current?.send(JSON.stringify(msg));
        ws.current?.close();

        navigate('/games');
    };

    const updateGameData = (data: any) => {
        setGameData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };

    return (
        <div className={Styles.GamePage}>
            {gameStarted ? (
                <>
                    <Button onclick={() => navigate('/games')}>Home</Button>
                    <GameGrid gameData={gameData} ws={ws} roomId={roomId || ''} selectedCards={selectedCards} />
                </>
            ) : (
                <div className={Styles.Waiting}>
                    <div className={Styles.header}>
                        <h1>Waiting for players</h1>
                        <p>
                            Room ID:{' '}
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={(e) => {
                                    handleClickID(e);
                                }}
                            >
                                {roomId}
                            </span>
                        </p>
                    </div>
                    <div className={Styles.players}>
                        <h5>Players : {currentPlayers.length}</h5>
                        <ul>
                            {currentPlayers.map((p: any) => (
                                <li key={p.uuid}>
                                    {p.name} : {p.ready ? 'Ready' : 'Preparing'} - <Checkmark success={p.ready} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={Styles.buttons}>
                        {!joined ? <Button onclick={() => join()}>Join</Button> : null}
                        {joined && !findMe(currentPlayers)?.ready ? (
                            <Button onclick={() => ready()}>Ready</Button>
                        ) : null}
                        <Button onclick={() => quitGame()}>Quit</Button>
                    </div>
                </div>
            )}
        </div>
    );
};
