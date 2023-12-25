import {Box, Container, Grid, Skeleton} from '@mui/material';
import Image from 'next/image'

import Contact from './contact';
import {useEffect, useState} from "react";

export default function Intro({ tag }) {
    const [tagline, setTagline] = useState('');

    useEffect(() => {
        setTagline(tag);
    }, [tag]);

    return (
        <Container className={'mb-24'}>
            <Box>
                <div className='flex lg:flex-row-reverse flex-col items-center lg:justify-between justify-center'>
                    <Grid item>
                        <Image src="https://avatars.githubusercontent.com/u/70953546?v=4" alt="Fardin Kamal" width={300}
                               height={300} className='rounded-full ring-2 ring-white'/>
                    </Grid>
                    <Grid item className='m-0 sm:mt-10 text-center'>
                        <h3 className='text-3xl font-bold'>Fardin Kamal</h3>
                        {tagline ? <div dangerouslySetInnerHTML={{__html: tagline}}></div> : <Skeleton variant="text" sx={{fontSize: '1rem'}} className={'dark:bg-gray-500'}/>}
                        <Contact/>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}