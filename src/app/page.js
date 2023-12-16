import { Container } from '@mui/material';

import Intro from './Intro';
import About from './About';


export default function Home() {
    return (
        <Container maxWidth="xl" className='mt-20'>
            <Intro />
            <hr className={'mb-24'}/>
            <About />
        </Container>
    )
}
