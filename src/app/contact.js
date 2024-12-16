import {Box, Container, Grid} from "@mui/material";
import {GitHub, LinkedIn, Mail} from "@mui/icons-material";
import Link from "next/link";

export default function Contact() {
    return (
        <Container maxWidth="xl" className="mt-5">
            <Box sx={{flexGrow: 1}}>
                <Grid container>
                    <Grid item xs>
                        <Link href="https://www.linkedin.com/in/fardinkamal62/" target="_blank"
                              rel="noopener noreferrer" className="mr-5" title="LinkedIn Profile">
                            <LinkedIn className="text-4xl"/>
                        </Link>
                        <Link href="mailto:fardinkamal62@protonmail.ch" title="Email"><Mail className="text-4xl"></Mail></Link>
                        <Link href="https://github.com/fardinkamal62" target="_blank" rel="noopener noreferrer"
                              className="ml-5" title="Github Profile">
                            <GitHub className="text-4xl"/>
                        </Link>
                        <Link href="https://codeforces.com/profile/fardinkamal62" target="_blank"
                              rel="noopener noreferrer" className="ml-5">
                            <img
                                src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/external-codeforces-programming-competitions-and-contests-programming-community-logo-bold-tal-revivo.png"
                                alt="Codeforces" className="text-4xl inline-block align-middle"
                                title="Codeforces Profile"/>
                        </Link>
                        <Link href="https://leetcode.com/u/fardinkamal62/" target="_blank"
                              rel="noopener noreferrer" className="ml-5">
                            <img
                                src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-bold-tal-revivo.png"
                                alt="Leetcode" className="text-4xl inline-block align-middle"
                                title="Leetcode Profile"/>
                        </Link>
                        <Link href="https://www.hackerrank.com/profile/fardinkamal62/" target="_blank"
                              rel="noopener noreferrer" className="ml-5">
                            <img
                                src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/external-hackerrank-is-a-technology-company-that-focuses-on-competitive-programming-logo-bold-tal-revivo.png"
                                alt="Hackerrank" className="text-4xl inline-block align-middle"
                                title="Hackerrank Profile"/>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
