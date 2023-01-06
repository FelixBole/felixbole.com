import React, { PropsWithChildren } from 'react';
import Styles from './Button.module.scss';
import './Button.module.scss';

type ButtonProps = {
    onclick?: (e: React.MouseEvent | React.TouchEvent) => any;
    fullWidth?: boolean;
};

export const Button = ({ onclick, fullWidth = false, children }: PropsWithChildren<ButtonProps>) => {
    const handleClick = async (e: React.MouseEvent | React.TouchEvent) => {
        if (onclick) await onclick(e);
    };

    return (
        <button className={Styles.Button} style={{width: fullWidth ? '100%' : undefined}} onClick={(e) => handleClick(e)}>
            {children}
        </button>
    );
};
