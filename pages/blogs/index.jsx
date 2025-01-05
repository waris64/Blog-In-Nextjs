import connectMongo from "../../lib/mongodb";
import Blog from "../../models/Blog";

export default async function AllBlogs({ blogs }) {
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id}>
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <small>{blog.author}</small>
          </div>
        ))
      ) : (
        <p>Error in blogs rendering in pages/blogs/index </p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await connectMongo();
    const serialized = await Blog.find().lean();
    return {
      props: {
        blogs: serialized || [],
      },
    };
  } catch (error) {
    console.log("Error fetching blogs : ", error);
    return {
      props: {
        blogs: [],
      },
    };
  }
}
