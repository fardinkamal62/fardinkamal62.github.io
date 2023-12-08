import { Box, Typography, Container, Link, Grid } from '@mui/material';
import Image from 'next/image'

import Contact from './contact';

export default function Intro() {
    return (
        <Container>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container alignItems={'center'} justifyContent={'space-between'} direction={'row'}>
                    <Grid item sx={{ textAlign: 'center' }}>
                        <Typography variant="h3">Fardin Kamal</Typography>
                        <Typography variant="h5">Developing tech to help people grow at <Link component="button" variant="h5"><a href='https://deepthought.education' rel='noopener' target='_blank'>DeepThought</a></Link>
                        </Typography>
                        <Contact />
                    </Grid>
                    <Grid item>
                        <Image src="https://avatars.githubusercontent.com/u/70953546?v=4" alt="Fardin Kamal" width={300} height={300} className='rounded-full ring-2 ring-white' />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}