import React, { PropsWithChildren } from 'react';
import Styles from './Button.module.scss';

type ButtonProps = {
    onclick?: (e: React.MouseEvent | React.TouchEvent) => any;
};

export const Button = ({ onclick, children }: PropsWithChildren<ButtonProps>) => {
    const handleClick = async (e: React.MouseEvent | React.TouchEvent) => {
        if (onclick) await onclick(e);
    };

    return (
        <button className={Styles.Button} onClick={(e) => handleClick(e)}>
            {children}
        </button>
    );
};
