'use client';

import {useEffect, useState} from "react";

import Image from 'next/image';

import {Container, ImageList, ImageListItem} from '@mui/material';

import {Android, Inventory, GitHub, Link} from '@mui/icons-material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import * as api from "@/util/api";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function ProjectsPage({params}) {
    const {slug} = params;

    const [navbarPages, setNavbarPages] = useState([]);
    const [project, setProject] = useState({});

    useEffect(() => {
        api.post('/', {_key: `project:${slug}`}).then(res => {
            setProject(res[0]);
            setNavbarPages(res[0].navbar);
        }).catch(err => console.log(err));
    }, [slug]);

    return (
        <>
            <NavBar pages={navbarPages}/>
            <Container maxWidth="xl">
                <ScrollToTop/>
                <div className={'mt-16 text-center'}>
                    <p className={'text-7xl font-bold'}>{project.title}</p>
                    <p className={'text-xl'}>{project.oneLiner}</p>
                    {project.createdAt ? getDate(project.createdAt) : null}
                </div>
                {project.images ? <ImageList cols={3} rowHeight={300} className={'mt-16'}>
                    {project.images.map((image, index) => (
                        <ImageListItem key={index}>
                            <Image src={image} layout={'fill'} objectFit={'cover'} alt={project.title}/>
                        </ImageListItem>
                    ))}
                </ImageList> : null}
                <div className={'text-center mt-16'}>
                    {project.content ? project.content.map((content, index) => {
                        return <div id={content.id} key={index}>
                            <p className={'text-3xl font-bold mt-5 my-5'}>{content.title}</p>
                            <div dangerouslySetInnerHTML={{__html: content.content}}></div>
                        </div>
                    }) : null}
                </div>
                <footer className={'mb-16'}>
                    {project.footer ? <div className={'text-center mt-16'}>
                        <p className={'text-3xl font-bold mt-5 my-5'}>{project.footer.title}</p>
                        { project.footer.content ? project.footer.content.map((content, index) => {
                            return <div key={index}><a href={content.link} id={content.id} target={'_blank'} className={'my-5 text-xl'}>
                                {content.title ? getIcon(content.icon) : null} {content.title}
                            </a><br/></div>
                        }) : null }
                    </div> : null}
                </footer>
            </Container>
        </>
    )
}

const getIcon = (icon) => {
    switch (icon) {
        case 'android':
            return <Android/>;
        case 'inventory':
            return <Inventory/>;
        case 'github':
            return <GitHub/>;
        case 'link':
            return <Link/>;
        default:
            return null;
    }
};

/**
 * @function getDate
 * @description Returns the date in a human readable format
 * @param {Date} date
 * @returns {JSX.Element}
 */
const getDate = (date) => {
    return <p>{days[new Date(date).getDay()]}, {new Date(date).getDate()}/{new Date(date).getMonth()}/{new Date(date).getFullYear()}</p>
};
