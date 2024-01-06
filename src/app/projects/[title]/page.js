import ProjectsPage from "@/app/projects/[title]/ProjectsPage";
import api from "@/util/api";

export async function generateMetadata(props) {
    const {title} = props.params;

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
