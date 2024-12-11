'use client';

import {useState, useEffect} from "react";

import {Container} from '@mui/material';

import Blog from "@/app/Blog";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";
import * as api from "@/util/api";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      api.post('/', {_key: 'blog:short', sort: { precedence: 1 }}).then(res => setBlogs(res)).catch(err => console.log(err));
    }, []);

    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <Blog blogs={blogs} viewAllBlogs={false} search={true}/>
            </Container>
        </>
    )
}

const navbarPages = [
    {title: 'Home', url: '/'},
    {title: 'Projects', url: '/projects'},
];
