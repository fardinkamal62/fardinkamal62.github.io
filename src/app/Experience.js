'use client';

import {Box, Container} from '@mui/material';
import TabComponent from "@/components/Tabs";
import {Business, Construction} from "@mui/icons-material";

export default function Experience() {
    const tabs = [
        {
            label: 'Work',
            title: 'Work Experience in the Market',
            icon: <Business/>
        },
        {
            label: 'Tool',
            title: 'Experience with Tools',
            icon: <Construction/>
        }
    ];
    return (
        <Container className={'mb-24'} id={'experience'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Experience</h1>
                </div>
                <div className='mt-10'>
                    <TabComponent tabs={tabs} tabClassName={'flex flex-col items-center justify-center'}/>
                </div>
            </Box>
        </Container>
    );
}