'use client';

import {useEffect, useState} from "react";

import {Container} from '@mui/material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import * as api from "@/util/api";
import {getDate} from "@/util/utilities";

export default function ProjectsPage({params}) {
    const {slug} = params;

    const [navbarPages, setNavbarPages] = useState([]);
    const [blog, setBlog] = useState({});

    useEffect(() => {
        api.post('/', { _key: `blog:${slug}` }).then(res => {
            setBlog(res[0]);
            setNavbarPages(res[0].navbar);
        }).catch(err => console.log(err));
    }, [slug]);
    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <div className={'mt-16'}>
                    <p className={'text-7xl font-bold text-center'}>{blog.title}</p>
                    <p className={'text-xl text-center'}>{blog.oneLiner}</p>
                    {blog.createdAt ? getDate(blog.createdAt) : null}
                </div>

                <div className={'flex justify-center'}>
                    <div className={'mt-16 prose max-w-5xl lg:prose-xl dark:prose-invert'}>
                        {blog.content ? <div className={'mb-24'} dangerouslySetInnerHTML={{__html: blog.content}}/> : null}
                    </div>
                </div>

                {/*<div className={'mb-24'} dangerouslySetInnerHTML={{__html: blog.content}}/>*/}
            </Container>
        </>
    )
}
