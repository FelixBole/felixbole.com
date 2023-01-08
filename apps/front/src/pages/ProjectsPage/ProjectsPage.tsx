import React from 'react';
import Styles from './ProjectsPage.module.scss';

type ProjectsPageProps = {

}

export const ProjectsPage = (props: ProjectsPageProps) => {
  return <div className={Styles.ProjectsPage}>
    <div className={Styles.pageContent}>
      <header>
        <h1>Dev Projects</h1>
        <h2>Projects I work on when I'm not at work</h2>
      </header>
      <section>
        <div className={Styles.projectCard}>
          <h5>This website</h5>

        </div>
      </section>
    </div>
  </div>;
};
