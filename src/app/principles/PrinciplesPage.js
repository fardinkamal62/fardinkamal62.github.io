'use client';

import { Container } from '@mui/material';
import ScrollToTop from "@/components/ScrollToTop";
import { Box, Grid } from "@mui/material";
import { LinkedIn, Mail } from "@mui/icons-material";
import Link from "next/link";

const socialLinks = [
    { href: "https://www.linkedin.com/in/fardinkamal62/", icon: LinkedIn, title: "LinkedIn Profile", label: "LinkedIn" },
    { href: "mailto:fardinkamal62@protonmail.ch", icon: Mail, title: "Email", label: "Email" },
]

export default function PrinciplesPage() {
    return (
        <>
            <Container maxWidth="xl">
                <ScrollToTop />
                <article className="max-w-4xl mx-auto pt-8">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                            How I Approach Engineering Problems
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            My approach to engineering is shaped by frameworks that prioritize clear thinking over immediate execution.
                            I learned early that the hardest part of software isn&apos;t writing code, it&apos;s making sound decisions under uncertainty.
                        </p>
                    </header>

                    {/* Section 1: The Foundation */}
                    <section className="mb-16" id='how-i-think'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            How I Think
                        </h2>

                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            Software engineering, to me, is not primarily about writing code. It’s about making a series of decisions under constraints.
                            <br></br>
                            Early in my journey, I was trained in an environment that emphasized thinking over output.
                            At <b>DeepThought</b>, the core belief was simple but demanding: <i>we don’t need more workers; we need problem-solvers who can think and take ownership.</i> That idea shaped how I approach technical problems to this day.
                            <br></br>
                            <br></br>
                            Before reaching for a solution, I try to understand the problem at its most fundamental level - what is the core issue we are trying to solve?
                            What are the constraints and trade-offs?
                            <br></br>
                            Only then do I consider possible approaches.
                        </p>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">The Principles I Use</h3>
                            <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                Over time, a small set of principles has become my default way of working:
                            </p>
                            <ul className="space-y-4">
                                <li className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                                    <strong className="text-gray-900 dark:text-gray-100">First Principle Reasoning:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Breaking problems down to fundamentals before building up solutions</span>
                                </li>
                                <li className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                                    <strong className="text-gray-900 dark:text-gray-100">Design Thinking:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Solving problems and anchoring innovation keeping user needs at the forefront</span>
                                </li>
                                <li className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                                    <strong className="text-gray-900 dark:text-gray-100">Socratic Questioning:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Challenging assumptions to reduce ambiguity and improve clarity</span>
                                </li>
                                <li className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                                    <strong className="text-gray-900 dark:text-gray-100">The Feynman Technique:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> If I can&apos;t explain it simply, I don&apos;t truly understand it</span>
                                </li>
                                <li className="pl-4 border-l-4 border-blue-500 dark:border-blue-400">
                                    <strong className="text-gray-900 dark:text-gray-100">Reflection Rituals:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Learning deliberately from both success and failure</span>
                                </li>
                            </ul>
                            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                These are not abstract ideas to me - they shape how I debug, design, and collaborate.
                            </p>
                        </div>
                    </section>

                    {/* Section 2: Evidence in Practice */}
                    <section className="mb-16" id='this-thinking-applied'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            This Thinking, Applied
                        </h2>

                        <div className="space-y-8">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">On the DIU Transport App</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    While working on a university transportation system, I treated vehicle tracking not as a UI feature but as a real-time synchronization problem.
                                    From first principles, this led to choosing WebSockets over polling and using caching to reduce unnecessary load.
                                    The architecture emerged from understanding constraints rather than copying a pattern.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">On the Eco App Backend</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    When the admin panel took 10 minutes to start, I used Socratic questioning to dig deeper than
                                    &ldquo;it&apos;s slow.&rdquo; I discovered a configuration error in the deployment pipeline. This wasn&apos;t just
                                    fixing a bug—it was about questioning the assumption that &ldquo;deployment scripts just work.&rdquo;
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold mb-3">On Mentoring</h3>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    When mentoring junior developers, I often ask them to explain concepts back to me.
                                    This approach, inspired by the <b>Feynman technique</b>, helps reveal gaps in understanding and builds confidence through clarity rather than authority.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3: Current Trajectory */}
                    <section className="mb-16" id='where-im-focusing-now'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Where I'm Focusing Now
                        </h2>

                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            I started with full-stack development using the <b>MERN</b> stack, which gave me early exposure to building and shipping production software.
                            Over time, I became more interested in the backend decisions that shape system behavior under load, failure, and scale.
                            <br></br>
                            Today, I&apos;m intentionally deepening my expertise in backend architecture and system design.
                        </p>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">My Focus Areas</h3>
                            <ul className="space-y-4 mb-6">
                                <li className="pl-4 border-l-4 border-green-500 dark:border-green-400">
                                    <strong className="text-gray-900 dark:text-gray-100">Backend Architecture:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Transitioning to <b>Java Spring Boot</b> to understand enterprise-grade systems,
                                        concurrency models, and robust API design at scale</span>
                                </li>
                                <li className="pl-4 border-l-4 border-green-500 dark:border-green-400">
                                    <strong className="text-gray-900 dark:text-gray-100">System Design:</strong>
                                    <span className="text-gray-700 dark:text-gray-300"> Studying distributed systems patterns not as abstract concepts,
                                        but as tools for making specific trade-offs</span>
                                </li>
                            </ul>
                        </div>


                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            I believe the most meaningful engineering challenges exist where technical decisions have real consequences.
                            I want to build systems that don&apos;t just work, but work well under pressure.
                        </p>
                    </section>

                    {/* Section 4: Leadership Philosophy */}
                    <section className="mb-16" id='leadership-as-systems-thinking'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Leadership as Systems Thinking
                        </h2>

                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            I think of leadership as system design applied to people and processes.
                        </p>

                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>A good team is a well-architected system</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Clear communication is a clean API</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Mentoring is reducing cognitive load through abstractions</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Ownership is designing for failure recovery</span>
                            </li>
                        </ul>

                        <p className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            In teams, I try to create clarity, ask better questions, streamline processes and build structures that help others do their best work.
                            My focus is less on being the loudest voice and more on making decisions understandable and reversible where possible.
                        </p>
                    </section>

                    {/* Section 5: What I'm Still Learning */}
                    <section className="mb-16 bg-amber-50 dark:bg-amber-900/20 p-8 rounded-lg border-l-4 border-amber-500" id='what-im-still-learning'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            What I'm Still Learning
                        </h2>

                        <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                            I&apos;m still early in my journey. I haven&apos;t seen every kind of system fail and I don&apos;t claim to have all the answers.
                            That&apos;s why I&apos;m deliberately studying distributed systems, backend internals, and architecture—not to collect knowledge,
                            but to sharpen my decision-making over time.
                            <br></br>
                            <br></br>
                            Currently, I'm focused on:
                        </p>

                        <ul className="space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Mastering JVM internals and Spring Boot&apos;s design patterns</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Understanding database performance at scale</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>Building intuition for distributed systems trade-offs</span>
                            </li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            What excites me is not how much I already know, but how clearly I can see what I still need to learn.
                        </p>
                    </section>

                    {/* Section 6: What I'm Looking For */}
                    <section className="" id='what-im-looking-for'>
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Problems That Demand This Thinking
                        </h2>

                        <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                            I thrive in environments where:
                        </p>

                        <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span><b>Ambiguity is high </b> - problems aren&apos;t fully defined yet</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span><b>Technical decisions have consequences </b> - architecture matters</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span><b>Learning is systematic </b> - not accidental nor forced</span>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <span><b>People prioritize understanding</b> <i>why</i> before deciding <i>how</i></span>
                            </li>
                        </ul>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            If you&apos;re building something that requires both deep technical execution and clear thinking about
                            trade-offs, I&apos;d love to hear about what you&apos;re working on
                        </p>
                    </section>
                </article>
                <div className="pb-12">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <div className="flex items-center justify-center gap-4 flex-wrap">
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
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Container>
        </>
    );
}
