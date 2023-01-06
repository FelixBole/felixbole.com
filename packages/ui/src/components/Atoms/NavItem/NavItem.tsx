import React, { PropsWithChildren } from 'react';
import { getSVG } from '../../../utils/getSVG';
import Styles from './NavItem.module.scss';

export type Icon = 'home' | 'menu' | 'projects' | 'music' | 'games' | 'profile' | 'login' | 'logout';

export type NavItemProps = {
    icon: Icon;
    textPosition?: 'TOP' | 'BOTTOM';
    fill?: string;
    stroke?: string;
    color?: string;
    selected?: boolean;
    onclick?: (e: React.MouseEvent | React.TouchEvent) => any;
};

export const NavItem = ({
    icon,
    fill = 'white',
    stroke = 'white',
    color = 'white',
    textPosition = 'BOTTOM',
    selected = false,
    onclick = () => {},
    children,
}: PropsWithChildren<NavItemProps>) => {

    const handleClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (onclick) await onclick(e);
    }

    // if (selected) return <></>;

    return (
        <div className={Styles.NavItem} onClick={(e) => handleClick(e)}>
            {textPosition === 'TOP' && <span style={{ color }}>{children}</span>}
            {icon && getSVG(icon) ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={getSVG(icon).viewBox}
                    width={50}
                    height={50}
                    fill={fill}
                    stroke={stroke}
                >
                    {getSVG(icon).g}
                </svg>
            ) : null}
            {textPosition === 'BOTTOM' && <span style={{ color }}>{children}</span>}
        </div>
    );
};
