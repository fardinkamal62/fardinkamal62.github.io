import {useEffect, useState} from "react";

import {Box, Container, Skeleton} from "@mui/material";
import Cards from "@/components/Cards";
import {ArrowOutward} from "@mui/icons-material";
import Link from "next/link";

import Search from "@/components/Search";

export default function Blog({blogs, viewAllBlogs = true, search = false}) {
    const [content, setContent] = useState(blogs)

    const handleChange = (event) => {
        const {value} = event.target
        setContent(blogs.filter(blog => {
            return blog.title.toLowerCase().includes(value.toLowerCase()) || blog.technologies.join(' ').toLowerCase().includes(value.toLowerCase())
        }))
    }

    useEffect(() => {
        setContent(blogs);
    }, [blogs]);

    return (
        <Container className={'mb-24'} id={'blog'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Blog</h1>
                </div>
                {search ? <Search pageName={'Blogs'} content={blogs} handleChange={handleChange}/> : null}
                <div className='mt-10 grid grid-cols-1'>
                    {blogs.length !==0 ? <Cards contents={content}
                            classes={'mx-4 text-black dark:bg-gray-900 dark:text-white mb-3 dark:border-slate-800 dark:border'}/> : <Skeleton variant="rounded" width={'100%'} height={30} className={'dark:bg-gray-500'}/>}
                </div>
                {viewAllBlogs ? <div className={'flex justify-center mt-12'}>
                    <button
                        className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <Link href={'/blogs'}>View All Blogs <ArrowOutward/></Link>
                    </button>
                </div> : null}
            </Box>
        </Container>
    )
}
