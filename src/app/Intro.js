import { Box, Container, Grid, Skeleton } from '@mui/material';
import Image from 'next/image'

import Contact from './contact';
import { useEffect, useState } from "react";

import { marked } from 'marked';

export default function Intro({ tag }) {
    const [tagline, setTagline] = useState('');

    useEffect(() => {
        setTagline(tag);
    }, [tag]);

    return (
        <Container className="section-spacing">
            <Box>
                <div className="flex lg:flex-row-reverse flex-col items-center lg:justify-between justify-center gap-12 lg:gap-16">
                    <Grid item className="flex-shrink-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br rounded-full blur-2xl opacity-20 animate-pulse"></div>
                            <Image
                                src="https://avatars.githubusercontent.com/u/70953546?v=4"
                                alt="Fardin Kamal"
                                width={320}
                                height={320}
                                className="rounded-full shadow-2xl relative z-10"
                                priority
                            />
                        </div>
                    </Grid>

                    <Grid item className="flex-1 text-center lg:text-left">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-5xl lg:text-6xl font-bold bg-clip-text mb-4">
                                    Fardin Kamal
                                </h1>
                                {tagline ? (
                                    <div
                                        className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: marked.parse(tagline) }}
                                    />
                                ) : (
                                    <Skeleton
                                        variant="text"
                                        sx={{ fontSize: '1.5rem' }}
                                        className="dark:bg-neutral-800"
                                        width="80%"
                                    />
                                )}
                            </div>

                            <div className="pt-4">
                                <Contact />
                            </div>
                        </div>
                    </Grid>
                </div>
            </Box>
        </Container>
    );
}