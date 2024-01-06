'use client';

import {AppBar, Box, Toolbar, Container, createTheme} from '@mui/material';
import ThemeSwitch from '@/components/ThemeSwitch';
import NavbarMenu from './NavbarMenu';

const navbarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "rgb(249 250 251/var(--tw-bg-opacity))"    // TODO Temporary fix for transparent navbar
                }
            }
        }
    }
});

function NavBar({pages}) {
    return (
        <AppBar position="sticky" className={'bg-gray-50 dark:bg-gray-950 dark:text-black'} sx={{boxShadow: 'none'}}
                theme={navbarTheme}>
            <Container maxWidth="xl">
                <Toolbar className={'text-gray-700 dark:text-gray-400'}>
                    <a href='/' className={`text-4xl`} style={{textDecoration: 'none'}}>{'{~,~}'}</a>
                    <Box sx={{flexGrow: 100}}></Box>
                    <Box className={'flex sm:hidden md:flex'}>
                        {pages.map((page, index) => (
                            <a href={page.url} key={index} className={`text-lg mx-2 decoration-0`}>{page.title}</a>
                        ))}
                    </Box>
                    <ThemeSwitch/>
                    <NavbarMenu pages={pages}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;