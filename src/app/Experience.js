'use client';

import {useEffect, useState} from "react";
import {Box, Container} from '@mui/material';
import {Business, Construction} from "@mui/icons-material";

import TabComponent from "@/components/Tabs";
import Accordion from '@/components/WorkExperienceAccordion';
import api from "@/util/api";

const tabs = [
    {
        label: 'Work',
        title: 'Work Experience in Industry',
        icon: <Business/>
    },
    {
        label: 'Tool',
        title: 'Experience with Tools',
        icon: <Construction/>
    }
];

export default function Experience({ toolXp, workXp }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [toolExperience, setToolExperience] = useState({});
    const [workExperience, setWorkExperience] = useState([]);

    const handleTabIndexChange = (index) => {
        setTabIndex(index);
    };

    const toolExperienceTable = () => {
        return <>
            <table className="border-collapse border text-center w-full">
                <thead>
                <tr>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950">1 Year+</th>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950 whitespace-nowrap">6 Months+</th>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950">Basic</th>
                </tr>
                </thead>
                <tbody>
                {renderTable(toolExperience)}
                </tbody>
            </table>
            <caption className={'self-start'}>* Have industry experience</caption>
        </>;
    };

    const workExperienceTable = () => {
        return <Accordion contents={workExperience}/>;
    };

    useEffect(() => {
        setToolExperience(toolXp);
        setWorkExperience(workXp);
    }, [toolXp, workXp]);

    return (
        <Container className={'mb-24'} id={'experience'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Experience</h1>
                </div>
                <div className='mt-10'>
                    <TabComponent tabs={tabs} tabClassName={'flex flex-col items-center justify-center'}
                                  handleTabIndexChange={handleTabIndexChange}/>
                </div>
                <div className={'mt-10 flex flex-col items-center justify-center'}>
                    {tabIndex === 0 ? workExperienceTable() : toolExperienceTable()}
                </div>
            </Box>
        </Container>
    );
}

/**
 * @function maximum
 * @description Returns the maximum value in an array.
 * @param array
 * @return {
 number
 }
 */
function maximum(array) {
    return Math.max.apply(null, array);
}

function renderTable(object) {
    const categories = Object.keys(object);
    const lengths = categories.map(category => object[category].length);
    const maxLength = maximum(lengths);

    let rows = [];
    for (let i = 0; i < maxLength; i++) {
        rows.push(<tr>
            {categories.map(category => {
                if (object[category][i]) {
                    return <td key={object[category][i].label}
                               className={'px-36 py-3 whitespace-nowrap'}
                               title={object[category][i].hasIndustryExperience ? 'Have Industry Experience' : ''}
                    >
                        {object[category][i].hasIndustryExperience ?
                            <u>{object[category][i].label}</u> : object[category][i].label}
                    </td>
                } else {
                    return <td key={object[category][i] + 'undefined'} className={''}></td>
                }
            })}
        </tr>);
    }
    return rows;
}
