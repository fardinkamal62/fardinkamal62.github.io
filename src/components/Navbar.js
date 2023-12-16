'use client';

import {AppBar, Box, Toolbar, Container, createTheme} from '@mui/material';
import ThemeSwitch from '@/components/ThemeSwitch';

const pages = [{ title: 'About', url: '#about' }, { title: 'Experience', url: '#experience' }, { title: 'Projects', url: '#projects' }, { title: 'Blogs', url: '#blogs' }];

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
        <AppBar position="sticky" className={'bg-white dark:bg-black dark:text-black'} sx={{boxShadow: 'none'}} theme={navbarTheme}>
            <Container maxWidth="xl">
                <Toolbar className={'text-gray-700 dark:text-gray-400'}>
                    <a href='/' className={`text-4xl`} style={{ textDecoration: 'none' }}>{'{~,~}'}</a>
                    <Box sx={{ flexGrow: 100 }}></Box>
                    {/* TODO On small screen hide the links and show a menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <a href={page.url} key={index} className={`text-lg mx-2`} style={{ textDecoration: 'none' }}>{page.title}</a>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <ThemeSwitch />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;