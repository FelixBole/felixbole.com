import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './MusicPage.module.scss';

type MusicPageProps = {};

export const MusicPage = (props: MusicPageProps) => {
    const navigate = useNavigate();

    return (
        <div className={`${Styles.MusicPage} bgBlack`}>
            <header>
                <div>
                    <h1>Music and sound</h1>
                    <h2>Discover my work in music</h2>
                </div>
                <div>
                    <i className="fa-solid fa-music"></i>
                    <i className="fa-solid fa-headphones"></i>
                    <i className="fa-solid fa-guitar"></i>
                    <i className="fa-solid fa-volume-high"></i>
                    <i className="fa-solid fa-drum"></i>
                    <i className="fa-solid fa-film"></i>
                </div>
            </header>

            <section className={Styles.sectionJourney}>
                <div>
                    <h3>Journey</h3>
                    <h4>My first completed album</h4>
                    <h6>Released in 2019</h6>
                    <p>
                        Journey is a voyage of the sounds I love and love to create with. It was the first collection of
                        music that made sense to me to put as an album.
                    </p>
                    <p>
                        Composing, mixing and producing this project was very enlightening and although I would probably
                        redo a lot of it today, Journey made me start many other projects that I prefer spending time
                        on.
                    </p>
                </div>
                <div>
                    <iframe
                        src="https://bandcamp.com/EmbeddedPlayer/album=3965290269/size=large/bgcol=333333/linkcol=e99708/artwork=small/transparent=true/"
                        seamless
                    >
                        <a href="https://felixbole.bandcamp.com/album/journey">Journey by Felix Bole</a>
                    </iframe>
                </div>
            </section>
            <section className={Styles.sectionOther}>
                <div className={Styles.content}>
                    <h3>The other sounds I do</h3>
                    <div className={Styles.stuff}>
                        <div className={Styles.stuffCard}>
                            <h4>
                                Cinema <i className="fa-solid fa-film"></i>
                            </h4>
                            <p>
                                As I've studied sound in cinema, before becoming a developer I have worked with a team
                                on several short-films, some of which receiving prizes in amateur festivals.
                            </p>
                        </div>
                        <div className={`${Styles.stuffCard} ${Styles.stuffCardClickable}`} onClick={() => navigate('/games')}>
                            <h4>
                                Games <i className="fa-solid fa-gamepad"></i>
                            </h4>
                            <p>
                                Along with my own Indie game dev projects, I have worked with indie dev teams in the
                                past on game projects on both sound design and music.
                            </p>
                        </div>
                        <a href="https://soundcloud.com/felixbole" target={'_blank'} style={{ textDecoration: 'none' }}>
                            <div className={`${Styles.stuffCard} ${Styles.stuffCardClickable}`}>
                                <h4>
                                    Soundcloud <i className="fa-brands fa-soundcloud" />
                                </h4>
                                <p>
                                    Along with my own Indie game dev projects, I have worked with indie dev teams in the
                                    past on game projects on both sound design and music.
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};
