import Blog from "../../models/Blog";
import connectMongo from "../../lib/mongodb";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps({ params }) {
  const { id } = params;
  console.log("Received ID in [id].js:", id);

  try {
    await connectMongo();
    const blog = await Blog.findById(params.id).lean();

    if (!blog) {
      return { notFound: true };
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)),
      },
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return { notFound: true };
  }
}

export default function BlogDetails({ blog }) {
  const router = useRouter();
  const isCurrentPost = router.query.id === blog._id;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        {isCurrentPost ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-600 mb-6">{blog.content}</p>
            <small className="block text-gray-500">
              Author: <span className="font-medium">{blog.author}</span>
            </small>
          </>
        ) : (
          <div>
            <Link href={`/blogs/${blog._id}`}>
              <a className="text-blue-500 hover:underline text-xl font-semibold">
                {blog.title}
              </a>
            </Link>
            <p className="text-gray-600 mt-2">{blog.content}</p>
            <small className="block text-gray-500 mt-2">
              Author: <span className="font-medium">{blog.author}</span>
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
