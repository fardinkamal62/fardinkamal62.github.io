import * as React from 'react';
import Card from '@mui/material/Card';
import {CardActions, CardContent} from '@mui/material';
import {ArrowOutward, Code, PowerSettingsNew} from "@mui/icons-material";
import Link from "next/link";

export default function Cards({contents, classes}) {
    if (!contents) return (<></>);

    return (contents.map((content, index) => (
            <Card key={index} className={`${classes} card card-hover overflow-hidden`}>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                            {content.title}
                        </h2>
                        <div 
                            className="prose prose-sm dark:prose-invert max-w-none mb-4
                                prose-p:text-neutral-600 dark:prose-p:text-neutral-400
                                prose-p:leading-relaxed line-clamp-3"
                            dangerouslySetInnerHTML={{__html: content.description}}
                        />
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