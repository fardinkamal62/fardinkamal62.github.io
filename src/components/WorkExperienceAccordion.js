import * as React from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Skeleton} from '@mui/material';
import {ExpandMore, Business} from '@mui/icons-material';
import {marked} from 'marked';

export default function Accordions({contents}) {
    return (
        <div className="space-y-4">
            {contents.map((content, index) => (
                <Accordion 
                    key={index}
                    className="card !shadow-none border border-neutral-200 dark:border-neutral-800 overflow-hidden"
                >
                    <AccordionSummary
                        expandIcon={<ExpandMore className="text-neutral-700 dark:text-neutral-300"/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900 px-6 py-4"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <div className="icon-wrapper">
                                <Business className="w-5 h-5"/>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                                    {content.title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                                    {content.company} • {getTimeDiff(content.duration[0], content.duration[1])}
                                </p>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className="bg-neutral-50/50 dark:bg-neutral-900/50 px-6 py-6">
                        {content ? (
                            <div 
                                className="prose prose-sm dark:prose-invert max-w-none
                                    prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                                    prose-ul:text-neutral-700 dark:prose-ul:text-neutral-300"
                                dangerouslySetInnerHTML={{__html: marked.parse(content.description)}}
                            />
                        ) : (
                            <div className="space-y-2">
                                <Skeleton variant="rounded" width="100%" height={50} className="dark:bg-neutral-800"/>
                                <Skeleton variant="rounded" width="80%" height={30} className="dark:bg-neutral-800"/>
                            </div>
                        )}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

function getTimeDiff(startDate, endDate) {
    if (!endDate) endDate = new Date()

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    // Adjust if months is negative
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Format the output
    if (years > 0 && months > 0) {
        return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    } else if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''}`;
    } else {
        return `${months} month${months > 1 ? 's' : ''}`;
    }
}
