import React, {useEffect, useState} from "react";
import {Box, Container, Skeleton} from "@mui/material";
import Cards from "@/components/Cards";
import {ArrowOutward} from "@mui/icons-material";
import Link from "next/link";

import Search from "@/components/Search";

export default function Project({projects, viewAllProjects = true, search = false}) {
    const [content, setContent] = useState(projects)

    const handleChange = (event) => {
        const {value} = event.target
        setContent(projects.filter(project => {
            return project.title.toLowerCase().includes(value.toLowerCase()) || 
                   project.technologies.join(' ').toLowerCase().includes(value.toLowerCase())
        }))
    }

    useEffect(() => {
        setContent(projects);
    }, [projects]);

    return (
        <Container id="project" className={'mb-24'}>
            <Box>
                <div className="flex flex-col items-center justify-center mb-5">
                    <h1 className="text-4xl lg:text-5xl font-bold">Projects</h1>
                    <p className="text-neutral-600 dark:text-neutral-400 mt-2 text-center max-w-2xl">
                        Explore my latest work and side projects
                    </p>
                </div>
                
                {search ? <Search pageName="Projects" content={projects} handleChange={handleChange}/> : null}
                
                <div className="mt-10 grid grid-cols-2 gap-6">
                    {projects.length !== 0 ? (
                        <Cards 
                            contents={content} 
                            classes="mx-4 text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border"
                        />
                    ) : (
                        <>
                            <Skeleton variant="rounded" width="100%" height={300} className="dark:bg-neutral-800 rounded-xl"/>
                            <Skeleton variant="rounded" width="100%" height={300} className="dark:bg-neutral-800 rounded-xl"/>
                            <Skeleton variant="rounded" width="100%" height={300} className="dark:bg-neutral-800 rounded-xl"/>
                        </>
                    )}
                </div>
                
                {viewAllProjects ? (
                    <div className="flex justify-center mt-12">
                        <Link href="/projects">
                            <button className="btn-primary flex items-center gap-2">
                                <span>View All Projects</span>
                                <ArrowOutward className="w-5 h-5"/>
                            </button>
                        </Link>
                    </div>
                ) : null}
            </Box>
        </Container>
    )
}
