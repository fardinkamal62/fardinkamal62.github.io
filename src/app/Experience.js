'use client';

import {useEffect, useState} from "react";
import {Box, Container} from '@mui/material';
import {Business, Construction} from "@mui/icons-material";

import TabComponent from "@/components/Tabs";
import Accordion from '@/components/WorkExperienceAccordion';
import api from "@/util/api";

const tabs = [
    {
        label: 'Work',
        title: 'Work Experience in Industry',
        icon: <Business/>
    },
    {
        label: 'Tool',
        title: 'Experience with Tools',
        icon: <Construction/>
    }
];

export default function Experience() {
    const [tabIndex, setTabIndex] = useState(0);
    const [toolExperience, setToolExperience] = useState({});

    const handleTabIndexChange = (index) => {
        setTabIndex(index);
    };

    const toolExperienceTable = () => {
        return <>
            <table className="border-collapse border text-center w-full">
                <thead>
                <tr>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950">1 Year+</th>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950 whitespace-nowrap">6 Months+</th>
                    <th className="px-36 py-3 border bg-gray-50 dark:bg-gray-950">Basic</th>
                </tr>
                </thead>
                <tbody>
                {renderTable(toolExperience)}
                </tbody>
            </table>
            <caption className={'self-start'}>* Have industry experience</caption>
        </>;
    };

    const workExperienceTable = () => {
        return <Accordion contents={workExperience}/>;
    };

    useEffect(() => {
        api.post('', {_key: 'about:experience:tools'}).then(res => {
            setToolExperience(res[0])
        }).catch(err => console.log(err));
    }, []);

    return (
        <Container className={'mb-24'} id={'experience'}>
            <Box>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className={'text-4xl font-bold'}>Experience</h1>
                </div>
                <div className='mt-10'>
                    <TabComponent tabs={tabs} tabClassName={'flex flex-col items-center justify-center'}
                                  handleTabIndexChange={handleTabIndexChange}/>
                </div>
                <div className={'mt-10 flex flex-col items-center justify-center'}>
                    {tabIndex === 0 ? workExperienceTable() : toolExperienceTable()}
                </div>
            </Box>
        </Container>
    );
}

const workExperience = [
    {
        title: 'Software Developer',
        company: 'DeepThought Growth Management System',
        duration: ['19 November 2022 UTC+6', ''],
        url: 'https://deepthought.education',
        description: (<div>
            <p>Software Developer at <a href={'https://deepthought.education'} target={'_blank'}
                                        className={'underline hover:text-blue-500'}>DeepThought Growth Management
                System</a></p>
            <p><b>Type</b>: Part-Time</p>
            <p><b>Duration</b>: 19 November 2022 - Present</p>
            <br/>
            <p className={'text-3xl mb-2'}>Projects</p>
            <ul className={'p-2'}><b>DTthon:</b>
                <ul>
                    - Implemented essential features, including duplication of courses and
                    projects, and enhanced the selection process.
                </ul>
                <ul>- Addressed backend issues and resolved bugs, ensuring smooth
                    functionality.
                </ul>
            </ul>

            <ul className={'p-2'}><b>John Dewey Peer Learning System (JD-PLS):</b>
                <ul> - Spearheaded the development of a robust Peer Learning System, serving
                    as the product manager.
                </ul>
                <ul> - Established the foundation of the system, enabling students to
                    provide feedback and evaluate their peers.
                </ul>
            </ul>

            <ul className={'p-2'}><b>Observation Panel:</b>
                <ul> - Optimized the backend infrastructure.</ul>
            </ul>
            <ul className={'p-2'}><b>Builders: </b>
                <ul>- Led the development of the Rigor &amp; Maturity builder, overseeing the
                    product management aspects.
                </ul>
                <ul>- Played a crucial role in delivering a comprehensive tool for improving
                    project quality and maturity.
                </ul>
            </ul>
            <br/>
            <p className={'text-3xl mb-2'}>Leadership</p>
            <div className={'p-2'}>
                <p>Throughout my career, I have displayed exemplary
                    leadership skills in diverse teams comprising both technical and
                    non-technical professionals. <br/>
                    Notable leadership roles include:</p>
                <ul>- Team Leader:
                    <ul>- Rigor Lab</ul>
                    <ul>- Career Acceleration Lab</ul>
                </ul>
                <ul>- Assistant Team Leader:
                    <ul>- Center of Excellence Lab</ul>
                    <ul>- Career Progression Lab</ul>
                </ul>
                <p></p>
            </div>
            <br/>
            <p className={'text-3xl'}>Mentorship:</p>
            <div className={'p-2'}>
                I have had the privilege of mentoring <b>2</b> individuals,
                guiding them to become proficient backend developers and assisting them in
                adapting to the platform.
            </div>
            <br/>
            <p className={'text-3xl'}>Others:</p>
            <div className={'p-2'}>
                <ul>- Actively participated in Socratic Dialogue questioning sessions, fostering
                    intellectual discussions and collaborative problem-solving
                </ul>
                <ul>- Engaged in the Leadership Development Initiative (LDI) events, enhancing
                    my
                    leadership skills and promoting professional growth
                </ul>
                <ul>- Conducted regular workshops on various topics such as Linux,
                    authentication,
                    HTTP caching, PWA, software development, and project management, empowering
                    individuals with valuable knowledge and practical skills
                </ul>
            </div>
        </div>)
    },
    {
        title: 'Software Developer',
        company:
            'SUP Eco App',
        duration:
            ['20 February 2022 UTC+6', '20 July 2022 UTC+6'],
        url:
            'https://deepthought.education',
        type:
            'Part-Time',
        description: (<div>
            <p>Software Developer at <a href={'https://supapp.in/'} target={'_blank'}
                                        className={'underline hover:text-blue-500'}>SUP Eco App
                System</a></p>
            <p><b>Type</b>: Part-Time</p>
            <p><b>Duration</b>: 19 November 2022 - Present</p>
            <br/>
            <p>Client company of DeepThought</p>
            <br/>
            Key achievements include:
            <ul className={'list-decimal list-inside ml-5 p-2'}>
                <li>Reduced the admin panel startup time from <b>10 minutes</b> to <b>10 seconds</b> by resolving
                    critical errors.
                </li>
                <li>Streamlining the backend of the &#34;Wish List&#34; project to improve user experience</li>
                <li>Enhancing user onboarding for the &#34;Referral&#34; project by optimizing backend processes</li>
                <li>Developing the &#34;Organization&#34; entity, enabling smooth management and onboarding of
                    organizations
                    for SUP.
                </li>
                <li>Creating the &#34;Eco Hub&#34; control panel, facilitating efficient organization management.</li>
            </ul>
            <br/>
            <p className={'text-3xl'}>Mentorship</p>
            <p className={'p-2'}>
                Helped their intern to improve their technical &amp; leadership skills
            </p>
        </div>)
    },
    {
        title: 'Software Developer Intern',
        company:
            'DeepThought Growth Management System',
        duration:
            ['08 June 2022 UTC+6', '09 October 2022 UTC+6'],
        url:
            'https://deepthought.education',
        type:
            'Part-Time',
        description: (<div>
            <p>Software Developer Intern at <a href={'https://deepthought.education'} target={'_blank'}
                                               className={'underline hover:text-blue-500'}>DeepThought Growth Management
                System</a></p>
            <p><b>Type</b>: Part-Time</p>
            <p><b>Duration</b>: 08 June 2022 - 09 October 2022</p>
            <br/>

            <p className={'text-3xl mb-2'}>Projects</p>
            <div className={'p-2'}>
                <ul className={'list-disc list-item list-inside'}>
                    <b>DeepThought Marketplace </b>
                    DT ecosystem Marketplace from scratch with virtual
                    currency system as well as sub-market facility
                </ul>

                <ul className={'list-disc list-item list-inside'}>
                    <b>DeepThought Profile Page </b>
                    DT Student &amp; Parents account profile page. Worked on
                    existing Profile Page project to bug fix &amp; add small
                    improvements
                </ul>

                <ul className={'list-disc list-item list-inside'}>
                    <b>DeepThought CPaaS </b>
                    Communication Platform as a Service; used to communicate
                    outside of DT ecosystem. Can be used to send
                    email/SMS/WhatsApp messages. Actively used by
                    DeepThought DTThon project to send emails to applicants.
                </ul>
            </div>
            <p className={'text-3xl my-2'}>Mentorship</p>
            <p className={' p-2'}>
                Mentored one person to become better
                backend developer and get used to our codebase.
            </p>
        </div>)
    }
];

/**
 * @function maximum
 * @description Returns the maximum value in an array.
 * @param array
 * @return {
 number
 }
 */
function maximum(array) {
    return Math.max.apply(null, array);
}

function renderTable(object) {
    const categories = Object.keys(object);
    const lengths = categories.map(category => object[category].length);
    const maxLength = maximum(lengths);

    let rows = [];
    for (let i = 0; i < maxLength; i++) {
        rows.push(<tr>
            {categories.map(category => {
                if (object[category][i]) {
                    return <td key={object[category][i].label}
                               className={'px-36 py-3 whitespace-nowrap'}
                               title={object[category][i].hasIndustryExperience ? 'Have Industry Experience' : ''}
                    >
                        {object[category][i].hasIndustryExperience ?
                            <u>{object[category][i].label}</u> : object[category][i].label}
                    </td>
                } else {
                    return <td key={object[category][i] + 'undefined'} className={''}></td>
                }
            })}
        </tr>);
    }
    return rows;
}
