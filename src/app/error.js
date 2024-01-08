'use client'

import {useEffect} from 'react'
import Navbar from "@/components/Navbar";
import {Container} from "@mui/material";
import Link from "next/link";
import {ArrowOutward} from "@mui/icons-material";

export default function Error({error}) {
    useEffect(() => {
        console.dir(error.message)
    }, [error])

    return (
        <>
            <Navbar pages={navbarPages}/>
            <Container sx={{ marginTop: '10%' }}>
                <div className='flex flex-col items-center'>
                    <p className={'md:text-3xl text-xl mb-2'}>Something Went Wrong</p>
                    <button className={'bg-gray-50 dark:bg-gray-950 dark:text-white p-2'}><Link href="/">Return Home <ArrowOutward/></Link></button>
                </div>
            </Container>
        </>
    )
}

const navbarPages = [];
