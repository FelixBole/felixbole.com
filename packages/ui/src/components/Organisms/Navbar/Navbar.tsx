import React, { PropsWithChildren, useState } from 'react';
import { Icon, NavItem, NavItemProps } from '../../Atoms/NavItem/NavItem';
import Styles from './Navbar.module.scss';

type NavbarProps = {
    navItems: NavItemProps[];
    bg?: string;
};

export const Navbar = ({ bg = 'black', navItems }: NavbarProps) => {
    const [selected, setSelected] = useState<number>(-1);

    const handleClick = async (
        keyIdx: number,
        e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
        callback: ((e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>) => any) | undefined,
    ) => {
        setSelected(keyIdx);

        if (callback) await callback(e);
    };

    return (
        <div className={Styles.Navbar}>
            {selected !== -1 && <span className={Styles.location}>{<NavItem icon={navItems[selected].icon} />}</span>}
            <nav>
                {navItems.map((navItemProp, idx) => (
                    <NavItem
                        icon={navItemProp.icon}
                        onclick={(e) => {
                            handleClick(idx, e, navItemProp.onclick);
                        }}
                        selected={idx === selected}
                        key={idx}
                    >
                        {navItemProp.icon?.charAt(0).toUpperCase() + navItemProp.icon?.substring(1)}
                    </NavItem>
                ))}
            </nav>
        </div>
    );
};
