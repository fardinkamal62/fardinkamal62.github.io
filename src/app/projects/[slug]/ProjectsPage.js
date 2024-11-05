'use client';

import {useEffect, useState} from "react";

import Image from 'next/image';

import {marked} from "marked";

import {Container, ImageList, ImageListItem} from '@mui/material';

import {Android, GitHub, Inventory, Link} from '@mui/icons-material';

import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";

import * as api from "@/util/api";

import {getDate} from "@/util/utilities";

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
                <div className={'mt-16'}>
                    <div className='flex justify-center'>
                        {project.icon ? <Image src={project.icon} alt={'Project Image'} width={300} height={300}
                                               layout={'intrinsic'} className={'-mt-16'}/> : null}
                    </div>
                    <p className={'text-7xl font-bold text-center'}>{project.title}</p>
                    <p className={'text-xl text-center'}>{project.oneLiner}</p>
                    {project.createdAt ? getDate(project.createdAt) : null}
                </div>

                {project.images ? <div className={'flex justify-center'}>
                    <ImageList cols={3} className={'mt-16'}>
                        {project.images.map((image, index) => (
                            <ImageListItem key={index} sx={{width: 300, height: 300}} cols='1' className={'m-5'}>
                                <Image src={image} alt={project.title} width='300' height='300'/>
                            </ImageListItem>
                        ))}
                    </ImageList></div> : null}

                <div className={'flex justify-center'}>
                    <div className={'mt-16 prose max-w-5xl lg:prose-xl dark:prose-invert'}>
                        {project.content ? project.content.map((content, index) => {
                            return <div id={content.id} key={index}>
                                <p className={'text-4xl font-bold mt-5 my-5 flex'}>{content.title}</p>
                                <div dangerouslySetInnerHTML={{__html: marked.parse(content.content)}}></div>
                            </div>
                        }) : null}
                    </div>
                </div>

                <footer className={'mb-16'}>
                    {project.footer ? <div className={'text-center mt-16'}>
                        <p className={'text-3xl font-bold mt-5 my-5'}>{project.footer.title}</p>
                        {project.footer.content ? project.footer.content.map((content, index) => {
                            return <div key={index} className={'my-3'}>
                                <a href={content.link} id={content.id} target={'_blank'} className={'text-xl'}>
                                    {content.title ? getIcon(content.icon) : null}
                                    <span
                                        className={'text-blue-500 hover:text-blue-800 m-1'}>{content.title}</span>
                                </a><br/></div>
                        }) : null}
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
