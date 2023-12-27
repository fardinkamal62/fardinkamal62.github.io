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
    const [tagline, setTagline] = useState('');
    const [description, setDescription] = useState('');
    const [oneLiner, setOneLiner] = useState('');
    const [toolExperience, setToolExperience] = useState({});
    const [workExperience, setWorkExperience] = useState([]);

    useEffect(() => {
        const homepageData = [
            api.post('/', {
                _key: 'project:short',
                limit: 2
            }).then(res => setProjects(res)).catch(err => console.log(err)),

            api.post('/', {_key: 'blog:short', limit: 2}).then(res => setBlogs(res)).catch(err => console.log(err)),

            api.post('/', {_key: "about:tagline"}).then((res) => {
                setTagline(res[0].content)
            }).catch((err) => {
                console.log(err)
            }),

            api.post('', {_key: "about:oneliner"}).then((res) => {
                setOneLiner(res[0].content)
            }).catch((err) => {
                console.log(err)
            }),

            api.post('', {_key: "about:description"}).then((res) => {
                setDescription(res[0].content)
            }).catch((err) => {
                console.log(err)
            }),

            api.post('', {_key: 'about:experience:tools'}).then(res => {
                setToolExperience(res[0])
            }).catch(err => console.log(err)),

            api.post('', {_key: 'about:experience:work'}).then(res => {
                setWorkExperience(res[0].content)
            }).catch(err => console.log(err)),
        ]
        Promise.all(homepageData).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <Intro tag={tagline}/>
                <hr className={'mb-24'}/>
                <About desc={description} oneLine={oneLiner}/>
                <hr className={'mb-24'}/>
                <Experience toolXp={toolExperience} workXp={workExperience}/>
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
