'use client';

import {useState} from "react";
import {Box, Container, Tabs, Tab} from '@mui/material';

export default function TabComponent({tabs, tabClassName}) {
    const [value, setValue] = useState(0);

    if (!tabs) {
        return null;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box className={tabClassName}>
                <Tabs value={value} onChange={handleChange}>
                    {tabs.map((tab, index) => (
                        <Tab key={index} label={tab.label}
                             className={'text-black hover:bg-gray-50 focus:bg-gray-50 dark:text-white dark:hover:bg-gray-500 dark:focus:bg-gray-900'}
                             title={tab.title} icon={tab.icon ? tab.icon : ''}/>
                    ))}
                </Tabs>
            </Box>
        </Container>
    );
}