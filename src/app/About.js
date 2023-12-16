import {Box, Typography, Container, Link, Grid} from '@mui/material';
import Image from 'next/image'

import Contact from './contact';

export default function About() {
    const oneLiner = 'Software Developer intern after 12th 🤙';

    const description = () => {
        return <p>It all started with Python, and then I delved into the exciting realms of web development, and
            database management Now, I proudly call myself a Full-Stack developer, always hungry for more
            skills and projects
            <br/>
            <br/>

            Here's something that sets me apart - I landed a gig as a Software Developer intern while still
            in 12th grade, rubbing shoulders with brilliant CSE students
            Talk about getting a head start 😎
            <br/>
            <br/>
            You'll find me volunteering and doing my part for society. I've been a blood donor since I was
            young
            I also enjoy lending a hand for Gonoshasthaya Kendra, an awesome organization providing
            healthcare services in Bangladesh
            <br/>
            <br/>
            I'm not just tech-savvy; I'm a Linux aficionado.
            Oh, and guess what? My team, EliteSploit, participated in the epic Bangladesh National
            CyberDrill-2020, showcasing our skills and expertise
            <br/>
            <br/>
            Most importantly: BATMAN fan 🦇
        </p>
    }
    return (
        <Container className={'mb-32'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>About</h1>
                    <h5 className={'text-xl mt-3'}>{oneLiner}</h5>
                </div>
                <div className={'mt-12'}>
                    {description()}
                </div>
            </Box>
        </Container>);
}