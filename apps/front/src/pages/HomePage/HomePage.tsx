import React from 'react';
import Styles from './HomePage.module.scss';

import me from '../../assets/img/me-min.jpg';
import visions from '../../assets/img/visions-fbcom.png';
import journey from '../../assets/img/journey.png';
import dlb from '../../assets/img/dlb.png';

type HomePageProps = {};

export const HomePage = (props: HomePageProps) => {
    const socials = (resolution: 'mobile' | 'desktop') => {
        return (
            <div
                className={`${Styles.socials} ${
                    resolution === 'desktop' ? Styles.socialsDesktop : Styles.socialsMobile
                }`}
            >
                <a href="https://github.com/FelixBole/FelixBole" target={'_blank'}>
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.youtube.com/channel/UCpqz8BqXDrTETT82WXSQ3cg" target={'_blank'}>
                    <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://twitter.com/FelixBole" target={'_blank'}>
                    <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="https://felixbole.bandcamp.com/album/journey" target={'_blank'}>
                    <i className="fa-brands fa-bandcamp"></i>
                </a>
            </div>
        );
    };

    return (
        <div className={Styles.HomePage}>
            <header dir="ltr">
                <div className={Styles.main}>
                    <div className={Styles.presentation}>
                        <h1>Felix Bole</h1>
                        <h2>
                            Felix is a fullstack developer, music composer, sound designer and indie game developer
                            based in France.
                        </h2>
                        <>{socials('desktop')}</>
                    </div>
                    <div className={Styles.image}>
                        <img src={me} alt="" />
                        <span></span>
                    </div>
                    <>{socials('mobile')}</>
                </div>
                <a className={Styles.learnMore} href="#pro">
                    <span>Learn More</span>
                    <div className={Styles.icon}>
                        <div></div>
                        <div></div>
                    </div>
                </a>
            </header>
            <section id="pro" className={Styles.sectionPro} dir="ltr">
                <div className={Styles.sectionContent}>
                    <h2>Development</h2>
                    <div>
                        <h3>Currently working as the lead developer at Visions</h3>
                        <p>
                            Visions is a data operator and a consent management system allowing anyone to share data
                            between platforms from their consent.
                        </p>
                        <p>
                            Expanding on this base, Visions created VisionsGalaxy, a gamified platform to help students
                            find educational content, orientation advice and job offers throughout all platforms that
                            are plugged into the VisionsTrust consent management API.
                        </p>
                        <p>
                            Visions is also a strong actor in attempting to define the standards and governance of data
                            sharing through the construction of Data Spaces.
                        </p>
                        <div className={Styles.imgContainer}>
                            <a href="https://visionspol.eu">
                                <img src={visions} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="music" className={Styles.sectionMusic}>
                <div className={Styles.sectionContent}>
                    <h2>Music & Sound</h2>
                    <div>
                        <h3>Music</h3>
                        <div>
                            <p>
                                Having started at the same time he learned to walk, music has always been a central
                                element in Felix's life. He played for a couple years with Le Horla, a french band that
                                managed to reach the finals of the french Emergenza contest.
                            </p>
                            <p>
                                On his side, Felix is a music composer with a style that suits best video games or
                                cinema. In 2019, he released his first album, Journey.
                            </p>
                        </div>
                        <div className={Styles.imgContainer}>
                            <a href="https://felixbole.bandcamp.com/album/journey" target="_blank">
                                <img src={journey} alt="Journey album cover" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Sound and Post-production</h3>
                        <div>
                            <p>
                                After studying sound engineering, sound recording, audio post-production at EICAR, Felix
                                spent a bit of time working on amateur movies to hone his sound skills. Work in sound
                                has slowed down since he got into development professionnally, but the love of sound is
                                still there.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={Styles.sectionGames} id="tmp">
                <div className={Styles.sectionContent}>
                    <h2>Indie game development</h2>
                    <div>
                        <h3>Unity C#</h3>
                        <p>
                            Felix loves games, he has been a competitor on many games in his youth and today, he loves
                            building some as much as playing them.
                        </p>
                        <p>
                            After building the right skills to land a job as a developer, he started exploring what he
                            could do with his knowledge in a game building environment. Unity has been a blast to try
                            out ideas and a fully-fledged indie game is currently in the works.
                        </p>
                        <p>
                            After a year learning Unity, in 2021, he made a small puzzle game in a self-assigned game
                            jam lasting a week to see what would come out of it. Don't look back, a puzzle game where
                            you can only move forwards unless certain conditions are met is the result of this.
                            Everything, from the code to the art, the sound, the visual effects and the music was made
                            by him during this time frame.
                        </p>
                        <div className={Styles.imgContainer}>
                            <a href="#tmp">
                                <img src={dlb} alt="Don't look back" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3>Web</h3>
                        <p>
                            Sitting down to learn new stuff is always something that drives Felix to build things using
                            whatever new tech or tip he finds out about.
                        </p>
                        <p>
                            The best way for him to do so is to make it by creating interactive things, such as games.
                            For example, to learn websockets, he reproduced the card game SET by making it multiplayer
                            and online. You can discover this in the Games section of this website.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};
