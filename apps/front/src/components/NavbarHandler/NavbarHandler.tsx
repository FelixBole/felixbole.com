import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from 'ui';

export const NavbarHandler = () => {
    const navigate = useNavigate();

    const [active, setActive] = useState(false);

    const handleHamburgerClick = () => {
        setActive(!active);
    };

    return (
        <Navbar
            onclickHamburger={handleHamburgerClick}
            visible={active}
            navItems={[
                { icon: 'home', onclick: () => navigate('/') },
                { icon: 'games', onclick: () => navigate('/games') },
                { icon: 'music', onclick: () => navigate('/music') },
                { icon: 'projects', onclick: () => navigate('/projects') },
            ]}
        />
    );
};
