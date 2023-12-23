import {Box, Container} from "@mui/material";

export default function Project() {
    return (
        <Container className={'mb-24'} id={'project'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Project</h1>
                </div>
            </Box>
        </Container>
    )
}