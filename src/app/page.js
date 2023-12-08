import { AppBar, Box, Toolbar, IconButton, Typography, Container, Button, Tooltip } from '@mui/material';

import Intro from './intro';


export default function Home() {
    return (
        <Container maxWidth="xl" className='mt-20'>
            <Intro />
        </Container>
    )
}
