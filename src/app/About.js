import {useEffect, useState} from "react";
import {Box, Container, Skeleton} from '@mui/material';
import {marked} from 'marked';

export default function About({oneLine, desc}) {
    // const [oneLiner, setOneLiner] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setDescription(desc);
        // setOneLiner(oneLine);
    }, [oneLine, desc]);

    return (
        <Container id="about" className={'mb-32'}>
            <Box>
                <div className="flex flex-col items-center justify-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold">About Me</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-center max-w-2xl">
                        Get to know more about my background and expertise
                    </p>
                </div>
                {description ? (
                    <div className="card p-8 lg:p-12 mx-auto">
                        <div 
                            className="prose prose-lg dark:prose-invert max-w-none
                                prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100
                                prose-p:text-neutral-700 dark:prose-p:text-neutral-300
                                prose-strong:text-neutral-900 dark:prose-strong:text-neutral-100
                                prose-a:text-primary-600 dark:prose-a:text-primary-400
                                prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{__html: marked.parse(description)}}
                        />
                    </div>
                ) : (
                    <div className="card p-8 lg:p-12 mx-auto space-y-4">
                        <Skeleton variant="rounded" width="100%" height={60} className="dark:bg-neutral-800"/>
                        <Skeleton variant="rounded" width="100%" height={40} className="dark:bg-neutral-800"/>
                        <Skeleton variant="rounded" width="85%" height={40} className="dark:bg-neutral-800"/>
                        <Skeleton variant="rounded" width="90%" height={40} className="dark:bg-neutral-800"/>
                    </div>
                )}
            </Box>
        </Container>
    );
}
