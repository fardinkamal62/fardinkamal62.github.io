'use client';

import {AppBar, Box, Container, Toolbar} from '@mui/material';
import ThemeSwitch from '@/components/ThemeSwitch';
import NavbarMenu from './NavbarMenu';
import Link from "next/link";

function NavBar({pages, secondaryButton}) {
    return (
        <AppBar
            position="sticky"
            color="inherit"
            className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800"
            sx={{boxShadow: 'none', backgroundColor: 'rgb(249 250 251 / var(--tw-bg-opacity, 1))'}}
        >
            <Container maxWidth="xl">
                <Toolbar className="text-neutral-700 dark:text-neutral-400 py-2">
                    <Link href="/" className="text-3xl lg:text-4xl font-bold hover:text-gray-500 dark:hover:text-primary-400 transition-colors">
                        {'{~,~}'}
                    </Link>
                    {secondaryButton && secondaryButton.url && (
                        <Link href={secondaryButton.url} className="ml-7">
                            <button className="btn-secondary text-sm lg:text-base">
                                {secondaryButton.title}
                            </button>
                        </Link>
                    )}
                    <Box sx={{flexGrow: 100}}></Box>
                    <Box className="hidden md:flex items-center gap-1">
                        {pages && pages.length > 0 ? pages.map((page, index) => (
                            <Link 
                                href={page.url} 
                                key={index}
                                className={`text-base lg:text-lg px-4 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 font-medium ${
                                    page.title === 'Principles' 
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-primary-600 dark:text-primary-400' 
                                        : ''
                                }`}
                            >
                                {page.title}
                            </Link>
                        )) : null}
                    </Box>
                    <div className="ml-4">
                        <ThemeSwitch/>
                    </div>
                    {pages && pages.length > 0 && <NavbarMenu pages={pages}/>}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
