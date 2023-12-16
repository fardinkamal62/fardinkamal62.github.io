import {Box, Typography, Container, Link, Grid} from '@mui/material';
import Image from 'next/image'

import Contact from './contact';

export default function Intro() {
    return (
        <Container className={'mb-32'}>
            <Box>
                <div className='flex lg:flex-row-reverse flex-col items-center lg:justify-between justify-center'>
                    <Grid item>
                        <Image src="https://avatars.githubusercontent.com/u/70953546?v=4" alt="Fardin Kamal" width={300}
                               height={300} className='rounded-full ring-2 ring-white'/>
                    </Grid>
                    <Grid item className='m-0 sm:mt-10 text-center'>
                        <h3 className='text-3xl font-bold'>Fardin Kamal</h3>
                        <h5 className='text-xl'>Developing tech to help people grow at <Link href={'https://deepthought.education'} target={'_blank'}>DeepThought</Link>
                        </h5>
                        <Contact/>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}