import Blog from "../../models/Blog";
import connectMongo from "../../lib/mongodb";
import Link from "next/link";
import { useRouter } from "next/router";
export async function getServerSideProps({ params }) {
  const { id } = params;
  console.log("Received ID in [id].js:", id); // Log the ID

  try {
    await connectMongo();
    const blog = await Blog.findById(params.id).lean(); // Fetch blog details by ID

    if (!blog) {
      return { notFound: true };
      console.log("not getting the blog data ");
      // Return 404 if no blog found
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)), // Serialize blog for the page
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { notFound: true }; // Handle errors with a 404
  }
}

export default function BlogDetails({ blog }) {
  const router = useRouter();
  const isCurrentPost = router.query.id === blog._id;
  return (
    <div>
      {isCurrentPost ? (
        <>
          <span> {blog.title}</span>
          <p>{blog.content}</p>
          <small>Author: {blog.author}</small>
        </>
      ) : (
        <>
          <Link href={isCurrentPost ? "#" : `/blogs/${blog._id}`}>
            {" "}
            {blog.title}
          </Link>
          <p>{blog.content}</p>
          <small>Author: {blog.author}</small>
        </>
      )}
    </div>
  );
}
