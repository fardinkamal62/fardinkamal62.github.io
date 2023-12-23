import {Box, Container} from "@mui/material";
import Cards from "@/components/Cards";
import {ArrowOutward} from "@mui/icons-material";
import * as React from "react";

export default function Blog() {
    return (
        <Container className={'mb-24'} id={'blog'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Blog</h1>
                </div>
                <div className='mt-10 grid grid-cols-1'>
                    <Cards contents={blogs} classes={'mx-4 text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border'}/>
                </div>
                <div className={'flex justify-center mt-12'}>
                    <button className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <a href={'/blogs'}>View All Blogs <ArrowOutward/></a>
                    </button>
                </div>
            </Box>
        </Container>
    )
}

const blogs = [
    {
        title: "SUP admin portal startup time reduction",
        link: "/blogs/sup-startup-decrease",
        icon: "",
        description: (
            <>
                <p>
                    A case study on how I've reduced startup time of a React project from <b>10 minutes</b> to <b>10 seconds</b>
                </p>
            </>
        ),
        technologies: ["Electron"],
    },
]