import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, GameCard } from 'ui';
import Styles from './GamesPage.module.scss';
import Animations from '../../shared/styles/modules/animations.module.scss';

import dlb_banner from '../../assets/img/banner_dlb.png';
import set_banner from '../../assets/svg/set.svg';

type GamesPageProps = {};

export const GamesPage = (props: GamesPageProps) => {
    const navigate = useNavigate();

    const prepareLoginSignup = (callbackURL: string) => {
        sessionStorage.setItem('callbackURL', callbackURL);
        navigate(callbackURL);
    };

    return (
        <div className={Styles.GamesPage}>
            <section className={Styles.unity}>
                <div className={Animations.animatedHighlight}>
                    <h1>Games I made</h1>
                </div>
                <div className={Styles.container}>
                    <div className={Styles.bannerCard} style={{ backgroundImage: `url(${dlb_banner})` }}>
                        <div>
                            <h5>Don't Look Back</h5>
                            <small>Unity C#</small>
                        </div>
                        <div>
                            <a href="https://felixbole.itch.io/dlb" target={'_blank'}>
                                Learn more
                            </a>
                            <Button onclick={() => (location.href = 'https://felixbole.itch.io/dlb')}>Play</Button>
                        </div>
                    </div>
                    <div
                        className={Styles.bannerCard}
                        style={{ backgroundImage: `url(${set_banner})`, backgroundSize: 'contain' }}
                    >
                        <div>
                            <h5>Set</h5>
                            <p>Browser game</p>
                            <small>React / NodeJS</small>
                        </div>
                        <div>
                            <a
                                href="https://www.setgame.com/sites/default/files/instructions/SET%20INSTRUCTIONS%20-%20ENGLISH.pdf"
                                style={{ paddingRight: '15px' }}
                                target={'_blank'}
                            >
                                Rules
                            </a>
                            <Button onclick={() => prepareLoginSignup('/games/web/set')}>Play</Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
