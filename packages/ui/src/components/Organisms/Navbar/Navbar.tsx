import React, { useState } from 'react';
import { NavItem, NavItemProps } from '../../Atoms/NavItem/NavItem';
import Styles from './Navbar.module.scss';

type NavbarProps = {
    navItems: NavItemProps[];
    bg?: string;
    visible?: boolean;
    showLocation?: boolean;
    onclickHamburger?: (e: React.MouseEvent | React.TouchEvent) => any;
};

export const Navbar = ({
    bg = 'black',
    navItems,
    visible = true,
    showLocation = false,
    onclickHamburger,
}: NavbarProps) => {
    const [selected, setSelected] = useState<number>(-1);

    // Visible state handled by a parent component
    const handleHamburgerClick = (e: React.MouseEvent | React.TouchEvent) => {
        if (onclickHamburger) onclickHamburger(e);
    };

    const handleClick = async (
        keyIdx: number,
        e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
        callback: ((e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => any) | undefined,
    ) => {
        setSelected(keyIdx);

        if (callback) await callback(e);
    };

    return (
        <>
            {' '}
            <div
                className={`${Styles.hamburger} ${visible ? Styles.active : ''}`}
                onClick={(e) => handleHamburgerClick(e)}
            >
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={`${!visible ? 'M20,28 48,28' : 'M20,20 L68,68'}`} />
                    <path d={`${!visible ? 'M20,48 L68,48' : 'M20,20 L68,68'}`} />
                    <path d={`${!visible ? 'M20,68 L78,68' : 'M20,68 L68,20'}`} />
                </svg>
            </div>
            <div className={`${Styles.Navbar} ${visible ? Styles.active : ''}`}>
                {selected !== -1 && showLocation && (
                    <span className={Styles.location}>{<NavItem icon={navItems[selected].icon} />}</span>
                )}
                <nav>
                    {navItems.map((navItemProp, idx) => (
                        <NavItem
                            icon={navItemProp.icon}
                            onclick={(e) => {
                                handleClick(idx, e, navItemProp.onclick);
                            }}
                            selected={idx === selected}
                            key={idx}
                            className={idx === selected ? Styles.selected : ''}
                        >
                            {/* {navItemProp.icon?.charAt(0).toUpperCase() + navItemProp.icon?.substring(1)} */}
                        </NavItem>
                    ))}
                </nav>
            </div>
        </>
    );
};
