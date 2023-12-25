import {Box, Container, Link, Grid} from '@mui/material';
import Image from 'next/image'

import Contact from './contact';
import {useEffect, useState} from "react";
import api from "@/util/api";

export default function Intro() {
    const [tagline, setTagline] = useState('');

    useEffect(() => {
        api.post('/', {_key: "about:tagline"}).then((res) => {
            setTagline(res[0].content);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

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
                        <div dangerouslySetInnerHTML={{__html: tagline}}></div>
                        <Contact/>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}