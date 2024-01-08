import Link from 'next/link';
import {Container, Button} from "@mui/material";
import {ArrowOutward} from "@mui/icons-material";
import Navbar from "@/components/Navbar";

export const metadata = {
    title: "Oopsie! Don't fall off!",
    description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <>
            <Navbar pages={navbarPages}/>
            <Container sx={{ marginTop: '10%' }}>
                <div className='flex flex-col items-center'>
                    <p className={'md:text-3xl text-xl mb-2'}>The page that you followed doesn&apos;t exist</p>
                    <button className={'bg-gray-50 dark:bg-gray-950 dark:text-white p-2'}><Link href="/">Return Home <ArrowOutward/></Link></button>
                </div>
            </Container>
        </>
    )
}

const navbarPages = [];
