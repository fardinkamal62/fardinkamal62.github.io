'use client';

import {useState, useEffect} from "react";

import {Container} from '@mui/material';

import Project from "@/app/Project";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";
import * as api from "@/util/api";

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.post('/', {_key: 'project:short'}).then(res => setProjects(res)).catch(err => console.log(err));
    }, []);

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

const navbarPages = [];
