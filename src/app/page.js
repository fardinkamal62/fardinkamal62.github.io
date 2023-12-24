'use client'

import {Container} from '@mui/material';

import Intro from '@/app/Intro';
import About from '@/app/About';
import Experience from "@/app/Experience";
import Project from "@/app/Project";
import Blog from "@/app/Blog";

import ScrollToTop from "@/components/ScrollToTop";
import * as React from "react";
import NavBar from "@/components/Navbar";

export default function Home() {
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

const blogs = [
    {
        title: "SUP admin portal startup time reduction",
        link: "/blogs/sup-startup-decrease",
        icon: "",
        description: (
            <>
                <p>
                    A case study on how I&#39;ve managed to reduce startup time of SUP Eco App&#39;s React front-end
                    from <b>10 minutes</b> to <b>10 seconds</b>
                </p>
            </>
        ),
        technologies: ["Electron"],
    },
]

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

const navbarPages = [
    {title: 'About', url: '#about'},
    {title: 'Experience', url: '#experience'},
    {title: 'Project', url: '#project'},
    {title: 'Blog', url: '#blog'}
];
