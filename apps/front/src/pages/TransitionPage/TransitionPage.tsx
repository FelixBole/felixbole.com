import React from 'react';
import Styles from './TransitionPage.module.scss';

type TransitionPageProps = {

}

export const TransitionPage = (props: TransitionPageProps) => {
  return <div className={Styles.TransitionPage}>
    <svg viewBox='0 0 100 500'>
      <circle cx={0} cy={100} r={50} fill={'red'} />
    </svg>
  </div>;
};
