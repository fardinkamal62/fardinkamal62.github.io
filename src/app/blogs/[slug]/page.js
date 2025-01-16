import BlogPage from "./BlogPage";
import * as api from "@/util/api";

export async function generateMetadata(props) {
    const params = await props.params;
    const {slug} = params;

    const project = await api.post('/', { _key: `blog:${slug}` })
    return {
        title: `${project?.[0]?.title || 'Blogs'} | Fardin Kamal`,
        description: project?.[0]?.description,
    }
}

export default async function Page(props) {
    const params = await props.params;
    return (
        <BlogPage params={params}/>
    )
}
