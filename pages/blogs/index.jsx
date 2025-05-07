import connectMongo from "../../lib/mongodb";
import Blog from "../../models/Blog";

export default function AllBlogs({ blogs }) {
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
        <p>Error in blogs rendering in pages/blogs/index</p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await connectMongo();
    const blogs = await Blog.find().lean();
    const serialize = JSON.parse(JSON.stringify(blogs));
    return {
      props: {
        blogs:  serialize || [],
      },
    };
  } catch (error) {
    console.log("Error fetching blogs: ", error);
    return {
      props: {
        blogs: [],
      },
    };
  }
}
