'use client';

import {useState, useEffect} from "react";

import {Container} from '@mui/material';

import Blog from "@/app/Blog";
import ScrollToTop from "@/components/ScrollToTop";
import NavBar from "@/components/Navbar";
import api from "@/util/api";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
      api.post('/', {_key: 'blog:short'}).then(res => setBlogs(res)).catch(err => console.log(err));
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

const navbarPages = [];