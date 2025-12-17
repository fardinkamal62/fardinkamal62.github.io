'use client';

import {useEffect, useState} from "react";

import {marked} from 'marked';

import {Container} from '@mui/material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import * as api from "@/util/api";
import {getDate} from "@/util/utilities";

export default function BlogPage({params}) {
    const {slug} = params;

    const [navbarPages, setNavbarPages] = useState([]);
    const [blog, setBlog] = useState({});

    useEffect(() => {
        api.get('/', { _key: `blog:${slug}` }).then(res => {
            setBlog(res[0]);
            setNavbarPages(res[0].navbar);
        }).catch(err => console.log(err));
    }, [slug]);

    const secondaryButton = {
        title: 'Blogs',
        url: '/blogs'
    };

    return (
        <>
            <NavBar pages={navbarPages} secondaryButton={secondaryButton}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <div className={'mt-16'}>
                    <p className={'text-7xl font-bold text-center'}>{blog.title}</p>
                    <p className={'text-xl text-center'}>{blog.oneLiner}</p>
                    {blog.createdAt ? getDate(blog.createdAt) : null}
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mt-6">
                            {blog.tags.map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={'flex justify-center'}>
                    <div className={'mt-16 prose max-w-5xl lg:prose-xl dark:prose-invert'}>
                        {blog.content ? <div className={'mb-24'} dangerouslySetInnerHTML={{__html: marked.parse(blog.content)}}/> : null}
                    </div>
                </div>
            </Container>
        </>
    )
}
