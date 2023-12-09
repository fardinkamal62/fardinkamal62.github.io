'use client';

import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip } from '@mui/material';
import { DarkMode, LightModeOutlined } from '@mui/icons-material';

const pages = [{ title: 'About', url: '#about' }, { title: 'Experience', url: '#experience' }, { title: 'Projects', url: '#projects' }, { title: 'Blogs', url: '#blogs' }];

function NavBar() {
    const [lightMode, setLightMode] = useState(true);

    const handleLightMode = () => {
        setLightMode(!lightMode);
    };

    return (
        <AppBar position="sticky" className={`${lightMode ? 'lightMode' : 'darkMode'}`} sx={{boxShadow: 'none'}}>
            <Container maxWidth="xl">
                <Toolbar>
                    <a href='/' className={`text-4xl ${ lightMode ? 'text-gray-700' : 'text-gray-400'}`} style={{ textDecoration: 'none' }}>{'{~,~}'}</a>
                    <Box sx={{ flexGrow: 100 }}></Box>
                    {/* TODO On small screen hide the links and show a menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <a href={page.url} key={index} className={`text-lg mx-2 ${ lightMode ? 'text-gray-700' : 'text-gray-400'}`} style={{ textDecoration: 'none' }}>{page.title}</a>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={`Toggle Night Mode ${lightMode ? 'On' : 'Off'}`}>
                            <IconButton onClick={handleLightMode} sx={{ p: 0 }}>
                                {!lightMode ? <LightModeOutlined sx={{ color: 'white' }} alt='light-mode-toggle' /> : <DarkMode alt='night-mode-toggle' />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;