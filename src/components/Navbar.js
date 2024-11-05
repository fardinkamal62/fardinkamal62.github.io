'use client';

import {AppBar, Box, Container, createTheme, Toolbar} from '@mui/material';
import ThemeSwitch from '@/components/ThemeSwitch';
import NavbarMenu from './NavbarMenu';
import Link from "next/link";

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

function NavBar({pages, secondaryButton}) {
    return (
        <AppBar position="sticky" className={'bg-gray-50 dark:bg-gray-950 dark:text-black'} sx={{boxShadow: 'none'}}
                theme={navbarTheme}>
            <Container maxWidth="xl">
                <Toolbar className={'text-gray-700 dark:text-gray-400'}>
                    <Link href='/' className={`text-4xl mb-2`}>{'{~,~}'}</Link>
                    {secondaryButton ?
                    <Link href={secondaryButton.url} className={`text-lg ml-7 p-2 bg-gray-200 text-gray-500 rounded-full dark:bg-gray-400 dark:text-black`}>
                        <button >{secondaryButton.title}</button>
                    </Link> : null}
                    <Box sx={{flexGrow: 100}}></Box>
                    <Box className={'flex sm:hidden md:flex'}>
                        {pages.map((page, index) => (
                            <Link href={page.url} key={index}
                                  className={`text-lg mx-2 decoration-0`}>{page.title}</Link>
                        ))}
                    </Box>
                    <ThemeSwitch/>
                    {pages.length > 0 && <NavbarMenu pages={pages}/>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
