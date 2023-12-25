import React, {useEffect, useState} from "react";
import {Box, Container} from "@mui/material";
import Cards from "@/components/Cards";
import {ArrowOutward} from "@mui/icons-material";

import Search from "@/components/Search";

export default function Project({projects, viewAllProjects = true, search = false}) {
    const [content, setContent] = useState(projects)

    const handleChange = (event) => {
        const {value} = event.target
        setContent(projects.filter(project => {
            return project.title.toLowerCase().includes(value.toLowerCase()) || project.technologies.join(' ').toLowerCase().includes(value.toLowerCase())
        }))
    }

    useEffect(() => {
        setContent(projects);
    }, [projects]);

    return (
        <Container className={'mb-24'} id={'project'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Project</h1>
                </div>
                {search ? <Search pageName={'Projects'} content={projects} handleChange={handleChange}/> : null}
                <div className='mt-10 grid grid-cols-2'>
                    <Cards contents={content} classes={'mx-4 text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border'}/>
                </div>
                {viewAllProjects ? <div className={'flex justify-center mt-12'}>
                    <button
                        className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <a href={'/projects'}>View All Projects <ArrowOutward/></a>
                    </button>
                </div> : null}
            </Box>
        </Container>
    )
}
