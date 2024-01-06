'use client';

import {useEffect, useState} from "react";

import {Container} from '@mui/material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import api from "@/util/api";


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
                <div className={'mb-24'} dangerouslySetInnerHTML={{ __html: blog.content }}/>
            </Container>
        </>
    )
}
