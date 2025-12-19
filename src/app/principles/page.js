'use client';

import NavBar from "@/components/Navbar";
import { Container } from '@mui/material';
import ScrollToTop from "@/components/ScrollToTop";
import PrinciplesPage from "./PrinciplesPage";

export default function Principles() {
    return (
        <>
            <NavBar pages={navbarPages} />
            <Container maxWidth="xl">
                <ScrollToTop />
                <PrinciplesPage />
            </Container>
        </>
    );
}

const navbarPages = [
    { title: 'Home', url: '/' },
    { title: 'How I Think', url: '#how-i-think' },
    { title: 'Evidence', url: '#this-thinking-applied' },
    { title: 'Focus', url: '#where-im-focusing-now' },
    { title: 'Leadership', url: '#leadership-as-systems-thinking' },
    { title: 'Learning', url: '#what-im-still-learning' },
    { title: 'Opportunities', url: '#what-im-looking-for' },
];
