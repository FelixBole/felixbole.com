import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from 'ui';

export const NavbarHandler = () => {
    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    const handleHamburgerClick = () => {
        setActive(!active);
    };

    const handleNavigate = (loc: string) => {
        setActive(false);
        navigate(loc);
    }

    return (
        <Navbar
            onclickHamburger={handleHamburgerClick}
            visible={active}
            navItems={[
                { icon: 'home', onclick: () => handleNavigate('/') },
                { icon: 'games', onclick: () => handleNavigate('/games') },
                { icon: 'music', onclick: () => handleNavigate('/music') },
                { icon: 'projects', onclick: () => handleNavigate('/projects') },
            ]}
        />
    );
};
