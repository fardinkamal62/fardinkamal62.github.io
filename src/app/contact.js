import { Box, Container, Grid } from "@mui/material";
import { GitHub, LinkedIn, Mail, EmojiEvents } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";


export default function Contact() {
    const { theme } = useTheme();

    const socialLinks = [
        { href: "https://www.linkedin.com/in/fardinkamal62/", icon: LinkedIn, title: "LinkedIn Profile", label: "LinkedIn" },
        { href: "mailto:fardinkamal62@protonmail.ch", icon: Mail, title: "Email", label: "Email" },
        { href: "https://github.com/fardinkamal62", icon: GitHub, title: "Github Profile", label: "GitHub" },
        { href: "https://www.bragdocs.com/@fardinkamal62", icon: EmojiEvents, title: "Bragdocs Profile", label: "Bragdocs" },
    ];

    return (
        <Container maxWidth="xl" className="mt-5">
            <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                    <Grid item xs>
                        <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
                                        rel="noopener noreferrer"
                                        title={link.title}
                                        className="group"
                                    >
                                        <div className="icon-wrapper group-hover:scale-110 transition-transform duration-200">
                                            <Icon className="w-6 h-6 text-neutral-900 dark:text-neutral-100" />
                                        </div>
                                    </Link>
                                );
                            })}
                            <Link
                                href="https://codeforces.com/profile/fardinkamal62"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Codeforces Profile"
                                className="group"
                            >
                                <div className="icon-wrapper group-hover:scale-110 transition-transform duration-200">
                                    <Image
                                        src={theme === 'dark' ? "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/FFFFFF/external-codeforces-programming-competitions-and-contests-programming-community-logo-bold-tal-revivo.png" : "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/external-codeforces-programming-competitions-and-contests-programming-community-logo-bold-tal-revivo.png"}
                                        alt="Codeforces"
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </div>
                            </Link>
                            <Link
                                href="https://leetcode.com/u/fardinkamal62"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Leetcode Profile"
                                className="group"
                            >
                                <div className="icon-wrapper group-hover:scale-110 transition-transform duration-200">
                                    <Image
                                        src={theme === 'dark' ? "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/FFFFFF/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-bold-tal-revivo.png" : "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/32/external-level-up-your-coding-skills-and-quickly-land-a-job-logo-bold-tal-revivo.png"}
                                        alt="Leetcode"
                                        width={24}
                                        height={24}
                                        className="w-6 h-6"
                                    />
                                </div>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
