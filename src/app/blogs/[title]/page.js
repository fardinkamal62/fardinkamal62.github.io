import BlogPage from "@/app/blogs/[title]/BlogPage";
import api from "@/util/api";

export async function generateMetadata(props) {
    const {title} = props.params;

    const project = await api.post('/', { _key: `blog:${title}` })
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
