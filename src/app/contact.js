import { Container, Grid, Box, Typography, Link } from "@mui/material";
import { LinkedIn, Mail, GitHub } from "@mui/icons-material";

export default function Contact() {
    return (
        <Container maxWidth="xl" className="mt-5">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs>
                        <a href="https://www.linkedin.com/in/fardinkamal62/" target="_blank" rel="noopener noreferrer" className="mr-5">
                            <LinkedIn className="text-4xl" />
                        </a>
                        <a href="mailto:fardinkamal62@protonmail.ch"><Mail className="text-4xl"></Mail></a>
                        <a href="https://github.com/fardinkamal62" target="_blank" rel="noopener noreferrer" className="ml-5">
                            <GitHub className="text-4xl" />
                        </a>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}