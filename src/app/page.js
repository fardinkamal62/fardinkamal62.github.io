'use client'

import {Container} from '@mui/material';

import Intro from '@/app/Intro';
import About from '@/app/About';
import Experience from "@/app/Experience";
import Project from "@/app/Project";
import Blog from "@/app/Blog";

import ScrollToTop from "@/components/ScrollToTop";
import React, {useEffect, useState} from "react";
import NavBar from "@/components/Navbar";
import api from "@/util/api";

export default function Home() {
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        api.post('/', {_key: 'project:short'}).then(res => setProjects(res)).catch(err => console.log(err));
        api.post('/', {_key: 'blog:short'}).then(res => setBlogs(res)).catch(err => console.log(err));
    }, [])

    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <Intro/>
                <hr className={'mb-24'}/>
                <About/>
                <hr className={'mb-24'}/>
                <Experience/>
                <hr className={'mb-24'}/>
                <Project projects={projects}/>
                <hr className={'mb-24'}/>
                <Blog blogs={blogs}/>
            </Container>
        </>
    )
}

const navbarPages = [
    {title: 'About', url: '#about'},
    {title: 'Experience', url: '#experience'},
    {title: 'Project', url: '#project'},
    {title: 'Blog', url: '#blog'}
];
