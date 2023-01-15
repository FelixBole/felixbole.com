import React, { useState } from 'react';
import { Project, projects } from '../../data/projects';
import Styles from './ProjectsPage.module.scss';
import Animations from '../../shared/styles/modules/animations.module.scss';

type ProjectElementProps = {
    className?: string;
    project: Project;
    playAnim: boolean;
};

const ProjectElement = ({ className, project, playAnim }: ProjectElementProps) => {
    const { name, description, date, github, website } = project;
    const classNames = playAnim ? Animations.animatedHighlight : '';

    return (
        <div className={`${Styles.project} ${className || ''}`}>
            <div className={classNames}>
                <h5>{name}</h5>
            </div>
            <small>{date}</small>
            {github && (
                <a href={github} style={{ paddingLeft: '10px' }}>
                    <i className="fa-brands fa-github"></i>
                </a>
            )}
            <p>{description}</p>
            {website && (
                <div className={Styles.highlightableLink}>
                    <a href={website}>Go to project</a>
                </div>
            )}
        </div>
    );
};

type ProjectsPageProps = {};

export const ProjectsPage = (props: ProjectsPageProps) => {
    const [selected, setSelected] = useState<number>(0);
    const [isChangingProject, setIsChangingProject] = useState<boolean>(false);
    const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
    const [isFadingIn, setIsFadingIn] = useState<boolean>(true);
    const [playAnim, setPlayAnim] = useState<boolean>(true);

    const handleProjectChange = (index: number) => {
        if (isChangingProject || index === selected) return;
        setIsChangingProject(true);
        setIsFadingIn(false);
        setIsFadingOut(true);
        setPlayAnim(false);

        setTimeout(() => {
            setIsFadingOut(false);
            setIsFadingIn(true);
            setSelected(index);
            setIsChangingProject(false);
            setPlayAnim(true);
        }, 500);
    };

    const project = projects[selected];
    const classNames = `${isFadingIn ? Styles.fadeIn : ''} ${isFadingOut ? Styles.fadeOut : ''}`;

    return (
        <div className={Styles.ProjectsPage}>
            <div className={Styles.pageContent}>
                <header>
                    <div className={Styles.bg}>
                        {Array(4).fill(1).map((el, idx) => (
                            <svg
                                width="171"
                                height="377"
                                viewBox="0 0 171 377"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={Styles[`bgSvg${(idx + 1).toString()}`]}
                            >
                                <path
                                    d="M85.5001 0L147.5 124L170.804 260.25L0.196533 376.5L0.196609 260.25L85.5001 0Z"
                                    fill="#862D86"
                                />
                            </svg>
                        ))}
                    </div>
                    <div className={Styles.content}>
                        <h1>Dev Projects</h1>
                        <h2>Selected work from everything I do in web</h2>
                    </div>
                </header>
                <section>
                    <div className={Styles.projectsContainer}>
                        <div className={Styles.projects}>
                            <ProjectElement className={classNames} project={project} playAnim={playAnim} />
                        </div>
                        <div className={Styles.controls}>
                            {projects.map((project, idx) => (
                                <span onClick={() => handleProjectChange(idx)} key={project.name}>
                                    {project.name.toUpperCase()}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
