import ProjectsPage from "./ProjectsPage";
import * as api from "@/util/api";

export async function generateMetadata(props) {
    const params = await props.params;
    const {slug} = params;

    const project = await api.post('/', { _key: `project:${slug}` })
    return {
        title: `${project?.[0]?.title || 'Projects'} | Fardin Kamal`,
        description: project?.[0]?.description || 'Projects',
    }
}

export default async function Page(props) {
    const params = await props.params;
    return (
        <ProjectsPage params={params}/>
    )
}
