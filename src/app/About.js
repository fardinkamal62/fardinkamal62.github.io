import {useEffect, useState} from "react";
import {Box, Container} from '@mui/material';
import api from "@/util/api";

export default function About() {
    const [oneLiner, setOneLiner] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.post('', {_key: "about:oneliner"}).then((res) => {
            setOneLiner(res[0].content)
        }).catch((err) => {
            console.log(err)
        });
        api.post('', {_key: "about:description"}).then((res) => {
            setDescription(res[0].content)
        }).catch((err) => {
            console.log(err)
        });
    }, [])

    return (
        <Container className={'mb-32'} id={'about'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>About</h1>
                    <h5 className={'text-xl mt-3'}>{oneLiner}</h5>
                </div>
                <div className={'mt-12'} dangerouslySetInnerHTML={{__html: description}}>
                </div>
            </Box>
        </Container>);
}