import ProjectsPage from "./ProjectsPage";
import api from "@/util/api";

export async function generateMetadata({params}) {
    const {title} = params;

    const project = await api.post('/', { _key: `project:${title}` })
    return {
        title: `${project?.[0]?.title || 'Project'} | Fardin Kamal`,
        description: project?.[0]?.description || 'Project',
    }
}

export default function Page({params}) {
    return (
        <ProjectsPage params={params}/>
    )
}
