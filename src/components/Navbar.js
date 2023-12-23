'use client';

import {AppBar, Box, Toolbar, Container, createTheme} from '@mui/material';
import ThemeSwitch from '@/components/ThemeSwitch';
import NavbarMenu from './NavbarMenu';

const pages = [
    {title: 'About', url: '#about'},
    {title: 'Experience', url: '#experience'},
    {title: 'Project', url: '#project'},
    {title: 'Blog', url: '#blog'}
];

const navbarTheme = createTheme({
    components: {
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "transparent"
                }
            }
        }
    }
});

function NavBar() {
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