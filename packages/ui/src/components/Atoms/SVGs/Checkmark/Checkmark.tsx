import React from 'react';
import Styles from './Checkmark.module.scss';

type CheckmarkProps = {
    success?: boolean;
};

export const Checkmark = ({ success = false }: CheckmarkProps) => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${Styles.Checkmark} ${success ? Styles.success : Styles.waiting}`}
        >
            <path d="M22.8821 36.4111L23.2978 36.6989L23.581 36.2799L38.1643 14.6966L37.3357 14.1367L23.0355 35.3011L8.50196 25.2394C8.64125 15.9707 16.1982 8.5 25.5 8.5C34.8888 8.5 42.5 16.1112 42.5 25.5C42.5 34.8888 34.8888 42.5 25.5 42.5C16.4378 42.5 9.03175 35.4092 8.52739 26.4732L22.8821 36.4111Z" />
        </svg>
    );
};
