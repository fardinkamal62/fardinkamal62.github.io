'use client';

import {useEffect, useState} from "react";

import Image from 'next/image';

import {Container, ImageList, ImageListItem} from '@mui/material';

import {Android, Inventory} from '@mui/icons-material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import * as api from "@/util/api";


export default function ProjectsPage({params}) {
    const {slug} = params;

    const [navbarPages, setNavbarPages] = useState([]);
    const [project, setProject] = useState({});

    useEffect(() => {
        api.post('/', { _key: `project:${slug}` }).then(res => {
            setProject(res[0]);
            setNavbarPages(res[0].navbar);
        }).catch(err => console.log(err));
    }, [slug]);
    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl">
                <ScrollToTop/>
                <div className={'mb-24'} dangerouslySetInnerHTML={{ __html: project.content }}/>
            </Container>
        </>
    )
}
