import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, GameCard } from 'ui';
import Styles from './GamesPage.module.scss';

type GamesPageProps = {};

export const GamesPage = (props: GamesPageProps) => {
    const navigate = useNavigate();

    return (
        <div className={Styles.GamesPage}>
            <h1>Games</h1>
            <div className={Styles.games}>
                <div className={Styles.gamePresCard}>
                    <h3>SET</h3>
                    <p>The card game where you need to associate 3 cards to form a set.</p>
                    <div className={Styles.setCards}>
                        <GameCard id="1121" />
                        <GameCard id="2212" />
                        <GameCard id="3333" />
                    </div>
                    <div className={Styles.btnContainer}>
                        {/* <Button>Rules</Button> */}
                        <Button onclick={() => navigate('/games/set')}>Play</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
