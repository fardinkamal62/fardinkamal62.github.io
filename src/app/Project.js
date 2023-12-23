import {Box, Container} from "@mui/material";
import Cards from "@/components/Cards";
import {ArrowOutward} from "@mui/icons-material";
import * as React from "react";

export default function Project() {
    return (
        <Container className={'mb-24'} id={'project'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Project</h1>
                </div>
                <div className='mt-10 grid grid-cols-2'>
                    <Cards contents={projects} classes={'mx-4 text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border'}/>
                </div>
                <div className={'flex justify-center mt-12'}>
                    <button className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <a href={'/projects'}>View All Projects <ArrowOutward/></a>
                    </button>
                </div>
            </Box>
        </Container>
    )
}

const projects = [
    {
        title: "Fedora MiMe",
        link: "/projects/mime",
        icon: "",
        description: (
            <>
                <p>
                    A software that measures Fedora mirror speed, correctly
                </p>
                <div className="m-3">
                    Fedora had a big problem with autoselecting best mirror. DNF&#39;s
                    <i>fastestmirror</i> module pings all the servers in the list
                    it has and takes the fastest ping time as the
                    <i>fastestmirror</i>
                    and it goes to that one as the server. But this script
                    measures actual download speed.
                </div>
            </>
        ),
        technologies: ["Electron"],
    },
    {
        title: "Shodai",
        link: "/projects/shodai",
        icon: "/public/images/shodai-adaptive-icon.png",
        description: (
            <>
                <p>
                    Not another e-commerce platform 😮‍💨
                </p>
                <div className="m-3">
                    Remember the piece of paper where you note down all the items
                    that you need to buy? Say goodbye to pen and paper and
                    effortlessly create and organize your shopping lists with
                    <i style={{color: '#dd5353'}}>Shodai!</i>
                </div>
                <div className="m-3">
                    <i style={{color: '#dd5353'}}>Shodai</i> also provides you
                    real-time market prices for the items you need to buy.
                </div>
            </>
        ),
        technologies: ["React Native"],
    }
]