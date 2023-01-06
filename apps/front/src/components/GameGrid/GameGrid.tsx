import { useEffectOnce } from 'hooks';
import React, { useEffect, useState } from 'react';
import { GameOfSet, isGameOver, isSet } from 'setgame-fns';
import { SVGAvatar } from 'svg-pixel-generator';
import { Button, GameCard } from 'ui';
import { getParameterByName } from '../../utils/getParameterByName';
import Styles from './GameGrid.module.scss';

interface WebSocketRef {
    current: WebSocket | null;
}

type Props = {
    gameData: GameOfSet | null;
    ws: WebSocketRef;
    roomId: string;
    selectedCards: string[];
};

export const GameGrid = ({ gameData = null, ws, roomId }: Props) => {
    const [selection, setSelection] = useState<string[]>([]);
    const [showSet, setShowSet] = useState<boolean>(false);

    const isAdmin = getParameterByName('admin') === 'true';

    const selectDeselectCard = (e: React.TouchEvent | React.MouseEvent | null, selected: boolean, id: string) => {
        const idx = selection.findIndex((el) => el === id);
        if (idx !== -1) setSelection((prev) => prev.filter((el) => el !== id));
        else setSelection((prev) => [...prev, id]);
    };

    const requestShowMore = () => {
        const msg = {
            eventName: 'showMore',
            roomId,
        };
        ws?.current?.send(JSON.stringify(msg));
    };

    const sendInvalidSet = () => {
        const msg = {
            eventName: 'invalidSet',
            roomId,
        };
        ws?.current?.send(JSON.stringify(msg));
    };

    const autoResolve = () => {
        if (!gameData?.setIsPossible) return console.log('no sets available');

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
            eventName: 'foundSet',
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
            return 'red';
        }

        if (isLastValidPlayer(uuid)) {
            return 'green';
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
                case 'foundSet':
                    setSelection([]);
                    setShowSet(false);
                default:
                    break;
            }
        };

        ws.current.addEventListener('message', handleSelectionReset);

        return () => {
            ws.current?.removeEventListener('message', handleSelectionReset);
        };
    }, [ws]);

    const getWidth = (showCount: number | undefined) => {
        switch (showCount) {
            case 12:
                return 400;
            case 15:
                return 500;
            case 18:
                return 600;
            default:
                return 400;
        }
    };

    return (
        <div className={Styles.GameGrid}>
            <div className={Styles.Grid} style={{ width: getWidth(gameData?.showCount) }}>
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
                    <div className={Styles.results}>
                        <h3>Results</h3>
                        <div className={Styles.players}>
                            {gameData?.players.map((p, idx) => (
                                <div key={p.name} className={Styles.player}>
                                    <div className={Styles.header}>
                                        <span>{idx + 1}</span>
                                        <SVGAvatar avatar={p.avatar || [[]]} pxSize={35} />
                                        <h6>{p.name}</h6>
                                    </div>
                                    <div className={Styles.foundSets}>
                                        <p>Score</p>
                                        <div>{p.currentScore}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
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
                        {isAdmin && (
                            <>
                                <Button onclick={() => setShowSet(true)}>Show Set</Button>
                                <Button onclick={() => autoResolve()}>Resolve Set</Button>
                                <div>Possible set: {(gameData?.possibleSets?.length !== 0).toString()}</div>
                                <div>Deck length: {gameData?.deck.length}</div>
                                <div>Showing: {gameData?.showCount}</div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
