import {useEffect, useState} from "react";
import {Box, Container, Skeleton} from '@mui/material';
import * as api from "@/util/api";

export default function About({ oneLine, desc }) {
    const [oneLiner, setOneLiner] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(desc);
        setOneLiner(oneLine);
    }, [oneLine, desc]);

    return (
        <Container className={'mb-32'} id={'about'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>About</h1>
                    {oneLiner ? <h5 className={'text-xl mt-3'}>{oneLiner}</h5> : <Skeleton variant={'text'} sx={{fontSize: '1rem'}} className={'dark:bg-gray-500 text-xl'} width={'100%'}/>}
                </div>
                { description ? <div className={'mt-12'} dangerouslySetInnerHTML={{__html: description}}/> : <div><Skeleton variant="rounded" width={'100%'} height={50} className={'dark:bg-gray-500'}/><br/> <Skeleton variant="rounded" width={'80%'} height={30} className={'dark:bg-gray-500'}/></div> }
            </Box>
        </Container>);
}