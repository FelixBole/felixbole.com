import React, { useState } from 'react';
import Styles from './ProjectsPage.module.scss';

type ProjectProps = {
    className?: string;
    name: string;
    github?: string;
    description: string;
    image?: string;
    date: string;
};

const Project = ({ name, github, description, image, date, className }: ProjectProps) => {
    return (
        <div className={`${Styles.project} ${className || ''}`}>
            <h5>
                {name}{' '}
                {github && (
                    <a href={github}>
                        <i className="fa-brands fa-github"></i>
                    </a>
                )}
            </h5>
            <small>{date}</small>
            <p>{description}</p>
        </div>
    );
};

const projects = [
    <Project
        name={'felixbole.com'}
        description={
            'This current website. As I learned React in the past year I decided to redo my website entirely using React running on a backend node express server. This project came from an attempt to understand monorepos (turborepo) and their architecture.'
        }
        github={'https://github.com/FelixBole/felixbole.com'}
        date={'2022-2023'}
    />,
    <Project
        name={'NotificationToaster'}
        description={
            'A lightweight library in Vanilla JS to simplify creating toast notifications. Built initially for my personnal needs, ended up adding some customization options and is now used in Visions, the company I work for.'
        }
        github={'https://github.com/FelixBole/notificationtoaster'}
        date={'2022'}
    />,
    <Project
        name={'Tour.js'}
        description={
            'A lightweight library that will allow you to easily create interactive guides in your website or web application. Just vanilla JS, no frameworks required.'
        }
        github={'https://github.com/FelixBole/tour.js'}
        date={'2021'}
    />,
];

type ProjectsPageProps = {};

export const ProjectsPage = (props: ProjectsPageProps) => {
    const [selected, setSelected] = useState<number>(0);

    return (
        <div className={Styles.ProjectsPage}>
            <div className={Styles.pageContent}>
                <header>
                    <h1>Dev Projects</h1>
                    <h2>Projects I work on when I'm not at work</h2>
                    <h6>This page is a work in progress. Things do not work as expected yet.</h6>
                </header>
                <section>
                    <div className={Styles.projectsContainer}>
                        <div className={Styles.projects}>{projects[selected]}</div>
                        <div className={Styles.controls}>
                            <span onClick={() => setSelected(0)}>FelixBole.com</span>
                            <span onClick={() => setSelected(1)}>NotificationToaster</span>
                            <span onClick={() => setSelected(2)}>Tour.js</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
