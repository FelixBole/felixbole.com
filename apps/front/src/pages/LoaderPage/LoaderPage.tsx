import React from 'react';
import { Loader } from '../../components/Loader/Loader';
import Styles from './LoaderPage.module.scss';

type LoaderPageProps = {};

export const LoaderPage = (props: LoaderPageProps) => {
    return (
        <div className={Styles.LoaderPage}>
            <Loader />
        </div>
    );
};
