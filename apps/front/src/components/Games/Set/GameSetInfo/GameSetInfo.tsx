import React, { useState } from 'react';
import { useEffectOnce } from 'hooks';
import { GameOfSet } from 'setgame-fns';
import { SVGAvatar } from 'svg-pixel-generator';
import { GameCard } from 'ui';
import { getUserAvatar, getUserStats } from '../../../../utils/getUserSessionInfo';
import { Loader } from '../../../Loader/Loader';
import Styles from './GameSetInfo.module.scss';

type GameSetInfoProps = {
    game: GameOfSet | null;
};

export const GameSetInfo = ({ game = null }: GameSetInfoProps) => {
    const [timer, setTimer] = useState<number>(game?.startedAt ? Math.floor((Date.now() - game?.startedAt) / 1000) : 0);

    useEffectOnce(() => {
        const interval = setInterval(() => {
            setTimer((timer) => timer + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    if (!game) return <Loader />;

    return (
        <div className={Styles.GameSetInfo}>
            <div className={Styles.lastSet}>
                <h6>Last found set</h6>
                <div className={Styles.cards}>
                    {game !== null
                        ? game?.lastSet.map((id) => (
                              <GameCard id={id} key={`gamecard-${id}`} clicked={false} tiny={true} clickable={false} />
                          ))
                        : null}
                </div>
            </div>
            <div className={Styles.players}>
                {game.players.map((p, idx) => (
                    <div key={p.name} className={Styles.player}>
                        <div className={Styles.header}>
                            <SVGAvatar avatar={p.avatar || [[]]} pxSize={35} />
                            <h6>{p.name}</h6>
                        </div>
                        {p.requestShowMore && (
                            <div className={Styles.showMore}>
                                <i className="fa-solid fa-eye"></i>
                            </div>
                        )}
                        <div className={Styles.foundSets}>
                            <p>Found sets</p>
                            <div>{p.currentScore}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
