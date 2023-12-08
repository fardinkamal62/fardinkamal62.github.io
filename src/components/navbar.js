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
        <AppBar position="sticky" className={`${lightMode ? 'lightMode' : 'darkMode'}`}>
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'Quicksand',
                            fontSize: '40px',
                            textDecoration: 'none',
                            fontWeight: 300,
                        }}
                    >{'{~,~}'}
                    </Typography>

                    <Box sx={{ flexGrow: 100 }}></Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                className={`${lightMode ? 'lightMode' : 'darkMode'}`}
                                href={page.url}
                            >
                                {page.title}
                            </Button>
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