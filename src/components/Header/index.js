import React, { useContext } from "react";
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from "react-router-dom";

import Logo from "../../assets/logo.png"

import StoreContext from "../../store/StoreContext";

import "./style.css"

function Header() {

    const { token, setToken } = useContext(StoreContext);

    const sair = () => {
        setToken(null);
        window.location.reload();
    }

    const navItems = [
        {
            "nome": 'Início',
            "link": 'inicio'

        },
        {
            "nome": 'Nossa História',
            "link": 'nossahistoria'

        },
        {
            "nome": 'Cultos',
            "link": 'cultos'

        },
        {
            "nome": 'Doações',
            "link": 'doacoes'

        },
        {
            "nome": 'Eventos',
            "link": 'eventos'

        }
    ];

    if (token !== null) {
        navItems.push({
            "nome": 'Sair',
            "link": 'sair'
        });
    }


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.nome} disablePadding >
                        <ListItemButton onClick={() => item.link === 'sair' ? sair() : scrollToSection(item.link)}>
                            <ListItemText primary={item.nome} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box className="header" >
            <Box sx={{ display: 'flex' }}>
                <AppBar component="nav" className="nav_bar">
                    <Toolbar>
                        <Box
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <img src={Logo} alt="Logo Assembléia de Deus Monteiro" className="logo" />
                        </Box>
                        <Box
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.nome}
                                    to={["inicio", "eventos"].includes(item.link) ? `/${item.link}` : ""}
                                    underline='none'
                                    color="inherit"
                                    className='link-app-bar'
                                    onClick={() => item.link === 'sair' ? sair() : scrollToSection(item.link)}
                                >
                                    {item.nome}
                                </NavLink>
                            ))}
                        </Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
            </Box>
        </Box>
    );
};

export default Header;