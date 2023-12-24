'use client';

import * as React from "react";

import { Container } from '@mui/material';

import Blog from "@/app/Blog";
import ScrollToTop from "@/components/ScrollToTop";

export default function Blogs() {
    return (
        <Container maxWidth="xl" className='mt-20'>
            <ScrollToTop />
            <Blog blogs={blogs} viewAllBlogs={false} search={true}/>
        </Container>
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
                    A case study on how I&#39;ve managed to reduce startup time of SUP Eco App&#39;s React front-end from <b>10 minutes</b> to <b>10 seconds</b>
                </p>
            </>
        ),
        technologies: ["Electron"],
    },
]
