'use client';

import {useEffect, useState} from "react";
import {Box, Container} from '@mui/material';
import {Business, Construction, Code, CheckCircle, Star} from "@mui/icons-material";

import TabComponent from "@/components/Tabs";
import Accordion from '@/components/WorkExperienceAccordion';
import * as api from "@/util/api";

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
        const experienceLevels = [
            { key: 'oneYear', label: '1 Year+ Experience', color: 'text-primary-600 dark:text-primary-400', icon: 'star' },
            { key: 'sixMonths', label: '6 Months+ Experience', color: 'text-accent-light dark:text-accent-light', icon: 'check' },
            { key: 'basics', label: 'Basic Knowledge', color: 'text-neutral-600 dark:text-neutral-400', icon: 'code' }
        ];

        return (
            <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {experienceLevels.map((level) => (
                        <div key={level.key} className="card card-hover p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`icon-wrapper ${level.color}`}>
                                    {level.icon === 'star' && <Star className="w-6 h-6" />}
                                    {level.icon === 'check' && <CheckCircle className="w-6 h-6" />}
                                    {level.icon === 'code' && <Code className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-semibold">{level.label}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {toolExperience[level.key]?.map((tool) => (
                                    <div
                                        key={tool.label}
                                        className={`tech-tag ${tool.hasIndustryExperience ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''}`}
                                        title={tool.hasIndustryExperience ? 'Industry Experience' : ''}
                                    >
                                        {tool.label}
                                        {tool.hasIndustryExperience && <span className="ml-1">*</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-6 text-center">
                    * Indicates industry experience
                </p>
            </div>
        );
    };

    const workExperienceTable = () => {
        return <Accordion contents={workExperience}/>;
    };

    useEffect(() => {
        setToolExperience(toolXp);
        setWorkExperience(workXp);
    }, [toolXp, workXp]);

    return (
        <Container className={'mb-24'} id="experience">
            <Box>
                <div className="flex flex-col items-center justify-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold">Experience</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-center max-w-2xl">
                        My professional journey and technical expertise
                    </p>
                </div>
                <div className="mt-10">
                    <TabComponent 
                        tabs={tabs} 
                        tabClassName="flex flex-col items-center justify-center"
                        handleTabIndexChange={handleTabIndexChange}
                    />
                </div>
                <div className="mt-12">
                    {tabIndex === 0 ? workExperienceTable() : toolExperienceTable()}
                </div>
            </Box>
        </Container>
    );
}
