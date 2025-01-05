import { useRouter } from 'next/router';
import Blog from '../../../models/Blog';
import connectMongo from '../../../lib/mongodb';

// Fetch the blog data based on the `id` parameter
export async function getServerSideProps({ params }) {
  const { id } = params;
  console.log("Received ID speaking from /api/blogs/id.js:", id); // Debugging log

  try {
    await connectMongo();
    const blog = await Blog.findById(id).lean(); // Fetch the blog document by its ID

    if (!blog) {
      console.log('Blog not found');
      return { notFound: true }; // Return 404 if no blog is found
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blog)), // Serialize the blog object
      },
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return {
      notFound: true // Return 404 on error
    };
  }
}

export default function BlogDetails({ blog }) {
  const router = useRouter();

  if (!blog) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <small>Author: {blog.author}</small>
      <br />
      <button onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );
}
