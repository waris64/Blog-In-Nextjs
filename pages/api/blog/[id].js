import { useRouter } from "next/router";
export default function BlogPage({ blog }) {
    const router = useRouter();
    if (router.isFallback) {
        return <>Loading ...</>
    }else
    return (
        <div>
            <h1>{blog.title}</h1>
            <p>{blog.contnet}</p>
            <p>Author: {blog.author}</p>
        </div>
    )
}
export async function getStaticPaths() {
    //fetching all the blogs path
        const res = await fetch('http://localhost:3000/api/blogs/');
        const blogs = await res.json();

        const paths = blogs.map((blog)=>({
            params:{id:blog._id.toString()}
        }));
        return {
            paths,
            fallback:true,
        }


}

export async function getStaticProps({params}){
    // fetching single blog  by id
    
    const res = await fetch(`http://localhost:3000/api/blogs/${parms.id}`);
    const blog = await res.json();
    return (
        {
            props:{
                blog,
            },
            revalidation:60,//Revalidate after 60 seconds
        }
    )
}