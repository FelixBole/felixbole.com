import { useNavigate } from "react-router-dom"
import { Navbar } from "ui";

export const NavbarHandler = () => {
    const navigate = useNavigate();

    return (
        <Navbar
            navItems={[
                { icon: 'home', onclick: () => navigate('/') },
                { icon: 'games', onclick: () => navigate('/games') },
                { icon: 'music', onclick: () => navigate('/music') },
                { icon: 'projects', onclick: () => navigate('/projects') },
            ]}
        />
    );
}