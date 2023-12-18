import { Container } from '@mui/material';

import Intro from '@/app/Intro';
import About from '@/app/About';
import Experience from "@/app/Experience";


export default function Home() {
    return (
        <Container maxWidth="xl" className='mt-20'>
            <Intro />
            <hr className={'mb-24'}/>
            <About />
            <hr className={'mb-24'}/>
            <Experience />
        </Container>
    )
}
