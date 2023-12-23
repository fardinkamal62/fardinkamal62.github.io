import * as React from 'react';
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Accordions({contents}) {
    return (
        <div>
            {contents.map((content, index) => (
                <Accordion key={index} className={'text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border'}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon className={'dark:text-white'}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className={'hover:bg-gray-50 dark:hover:bg-gray-950 '}
                    >
                        <div>{content.title} | {content.company} | {getTimeDiff(content.duration[0], content.duration[1])}</div>
                    </AccordionSummary>
                    <AccordionDetails className={'dark:bg-black'}>
                        <div>{content.description}</div>
                    </AccordionDetails>
                </Accordion>))}
        </div>
    );
}

function getTimeDiff(startDate, endDate) {
    if (!endDate) endDate = new Date()

    const diff = Math.abs(new Date(endDate) - new Date(startDate));

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const months = Math.ceil(days / 30);
    const years = Math.ceil(months / 12);
    return months > 12 ? `${years - 1} year ${months - 12} months` : `${months} months`;
}
