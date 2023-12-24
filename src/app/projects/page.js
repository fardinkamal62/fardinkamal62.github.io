'use client';

import * as React from "react";

import {Container} from '@mui/material';

import Project from "@/app/Project";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

export default function Blogs() {
    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
                <Project projects={projects} viewAllProjects={false} search={true}/>
            </Container>
        </>
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

const navbarPages = [];