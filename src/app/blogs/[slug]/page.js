import BlogPage from "./BlogPage";
import api from "@/util/api";

export async function generateMetadata({params}) {
    const {slug} = params;

    const project = await api.post('/', { _key: `blog:${slug}` })
    return {
        title: `${project?.[0]?.title || 'Blog'} | Fardin Kamal`,
        description: project?.[0]?.description,
    }
}

export default function Page({params}) {
    return (
        <BlogPage params={params}/>
    )
}
