import * as React from 'react';
import Card from '@mui/material/Card';
import {CardActions, CardContent} from '@mui/material';
import {ArrowOutward, Code, PowerSettingsNew} from "@mui/icons-material";
import Link from "next/link";
import { marked } from "marked";

export default function Cards({contents, classes}) {
    if (!contents) return (<></>);

    return (contents.map((content, index) => (
            <Card key={index} className={`${classes} card card-hover overflow-hidden`}>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                            {content.title}
                        </h2>
                        {content.description && content.description.length > 0 && <div 
                            className="prose prose-sm dark:prose-invert max-w-none mb-4
                                prose-p:text-neutral-600 dark:prose-p:text-neutral-400
                                prose-p:leading-relaxed line-clamp-3"
                            dangerouslySetInnerHTML={{__html: marked.parse(content.description)}}
                        />}
                    </div>
                    
                    {/* Tech Stack Tags */}
                    {content.technologies && content.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {content.technologies.slice(0, 5).map((tech, idx) => (
                                <span key={idx} className="tech-tag text-xs">
                                    {tech}
                                </span>
                            ))}
                            {content.technologies.length > 5 && (
                                <span className="tech-tag text-xs">
                                    +{content.technologies.length - 5} more
                                </span>
                            )}
                        </div>
                    )}
                    
                    {/* Tags */}
                    {content.tags && content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {content.tags.map((tag, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </CardContent>
                
                <CardActions className="flex flex-wrap gap-2 p-6 pt-0">
                    {content.link && (
                        <Link href={content.link} className="flex-1 min-w-fit">
                            <button className="btn-secondary w-full flex items-center justify-center gap-2 py-2 px-4">
                                <span>Learn More</span>
                                <ArrowOutward className="w-4 h-4"/>
                            </button>
                        </Link>
                    )}
                    {content.codeLink && (
                        <Link target="_blank" href={content.codeLink} className="flex-1 min-w-fit">
                            <button className="btn-secondary w-full flex items-center justify-center gap-2 py-2 px-4">
                                <Code className="w-4 h-4"/>
                                <span>Code</span>
                            </button>
                        </Link>
                    )}
                    {content.liveLink && (
                        <Link target="_blank" href={content.liveLink} className="flex-1 min-w-fit">
                            <button className="btn-primary w-full flex items-center justify-center gap-2 py-2 px-4">
                                <PowerSettingsNew className="w-4 h-4"/>
                                <span>Live Demo</span>
                            </button>
                        </Link>
                    )}
                </CardActions>
            </Card>
        ))
    );
}