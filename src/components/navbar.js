'use client';

import {useState} from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';

const pages = ['About', 'Experience', 'Projects', 'Blogs'];

function NavBar() {
    const [lightMode, setLightMode] = useState(false);

    const handleLightMode = () => {
        setLightMode(!lightMode);
    };


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mx: 5,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'Quicksand',
                            fontSize: '40px',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontWeight: 300,
                        }}
                    >{'{~,~}'}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                sx={{my: 2, color: 'white', display: 'block'}}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{flexGrow: 0}}>
                        <Tooltip title={`Toggle Night Mode ${lightMode ? 'On' : 'Off' }`}>
                            <IconButton onClick={handleLightMode} sx={{p: 0}}>
                                {!lightMode ? <LightMode alt='light-mode-toggle'/> : <DarkMode alt='light-mode-toggle'/>}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;