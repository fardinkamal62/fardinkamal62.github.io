import * as React from 'react';
import Card from '@mui/material/Card';
import {CardActions, CardContent} from '@mui/material';
import {ArrowOutward, Code, PowerSettingsNew} from "@mui/icons-material";
import Link from "next/link";

export default function Cards({contents, classes}) {
    if (!contents) return (<></>);

    return (contents.map((content, index) => (
            <Card key={index} className={classes}>
                <CardContent>
                    <div>
                        <h2 className={'text-2xl font-bold'}>{content.title}</h2>
                        <div dangerouslySetInnerHTML={{__html: content.description}}/>
                    </div>
                </CardContent>
                <CardActions className={'flex justify-center bottom-0'}>
                    {content.link ? <button
                        className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <Link href={content.link} className={'text-blue-500'}>Learn More <ArrowOutward/></Link>
                    </button> : null}
                    {content.codeLink ? <button
                        className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <Link target={'_blank'} href={content.codeLink} className={'text-blue-500'}>Code <Code/></Link>
                    </button> : null}
                    {content.liveLink ? <button
                        className={'bg-gray-50 dark:bg-gray-950 dark:text-white text-black px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900'}>
                        <Link target={'_blank'} href={content.liveLink}
                           className={'text-blue-500'}>Live <PowerSettingsNew/></Link></button> : null}
                </CardActions>
            </Card>
        ))
    );
}