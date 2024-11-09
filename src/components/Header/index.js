import React, { useContext } from "react";
import { Box, AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from "react-router-dom"; // Importando useNavigate
import Logo from "../../assets/logo.png";
import StoreContext from "../../store/StoreContext";
import "./style.css";

function Header() {
    const { token, setToken } = useContext(StoreContext);
    const navigate = useNavigate(); // Hook para navegação

    const sair = () => {
        setToken(null);
        window.location.reload();
    };

    const navItems = [
        { nome: 'Início', link: 'inicio' },
        { nome: 'Nossa História', link: 'nossahistoria' },
        //{ nome: 'Cultos', link: 'cultos' },
        //{ nome: 'Doações', link: 'doacoes' },
        { nome: 'Localização', link: 'localizacao' },
        { nome: 'Eventos', link: 'eventos' },
       
    ];

    if (token !== null) {
        navItems.push({ nome: 'Sair', link: 'sair' });
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
                    <ListItem key={item.nome} disablePadding>
                        <ListItemButton 
                            onClick={() => { 
                                handleDrawerToggle(); 
                                if (item.link === 'sair') {
                                    sair();
                                } else if (item.link === 'eventos') {
                                    navigate('/eventos');  
                                } else {
                                    navigate('/inicio');
                                    scrollToSection(item.link); // Para outros itens, rolar para a seção
                                }
                            }}
                            sx={{
                                border: '2px solid #3f51b5',
                                borderRadius: '8px', 
                                margin: '5px 5px', 
                                padding: '6px',
                                textAlign: 'center',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                },
                            }}
                        >
                            <ListItemText primary={item.nome} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box className="header">
            <AppBar position="fixed" component="nav" className="nav_bar">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <img src={Logo} alt="Logo Assembléia de Deus Monteiro" className="logo" />
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                    <NavLink
                        key={item.nome}
                        to={item.link === 'sair' ? '#' : `/${item.link}`}  
                        underline='none'
                        color="inherit"
                        className='link-app-bar'
                        onClick={(e) => {
                            e.preventDefault(); 
                            const currentPath = window.location.pathname;
                        
                            if (item.link === 'sair') {
                                sair();
                            } else if (item.link === 'eventos') {
                                navigate('/eventos');
                            } else if (currentPath === '/inicio') {
                                scrollToSection(item.link);
                            } else {
                                navigate('/inicio');
                                setTimeout(() => scrollToSection(item.link), 500); // Adjust delay as needed
                            }
                        }}
                        
                        style={{ padding: '10px', cursor: 'pointer' }}
                    >
                    {item.nome}
                </NavLink>
                ))}

                    </Box>
                    <IconButton
                        className="menu-icon"
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
                        keepMounted: true,
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
    );
};

export default Header;
