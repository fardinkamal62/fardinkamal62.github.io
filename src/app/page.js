import { Container } from '@mui/material';

import Intro from '@/app/Intro';
import About from '@/app/About';
import Experience from "@/app/Experience";
import Project from "@/app/Project";
import Blog from "@/app/Blog";

import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
    return (
        <Container maxWidth="xl" className='mt-20'>
            <ScrollToTop />
            <Intro />
            <hr className={'mb-24'}/>
            <About />
            <hr className={'mb-24'}/>
            <Experience />
            <hr className={'mb-24'}/>
            <Project />
            <hr className={'mb-24'}/>
            <Blog />
        </Container>
    )
}
