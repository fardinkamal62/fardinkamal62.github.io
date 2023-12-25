'use client';

import * as React from "react";

import {Container} from '@mui/material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import api from "@/util/api";


export default function Projects({params}) {
    api.post('/projects', { _key: 'project' }).then(res => console.log(res)).catch(err => console.log(err));
    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl" className='mt-20'>
                <ScrollToTop/>
            </Container>
        </>
    )
}

const navbarPages = [];