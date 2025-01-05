import Link from "next/link";
import connectMongo from "../lib/mongodb";
import Blog from "../models/Blog";

export async function getServerSideProps() {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch all blogs and convert to plain JavaScript objects using .lean()
    const blogs = await Blog.find({}).lean();

    const serialize = JSON.parse(JSON.stringify(blogs))


    return {
      props: {
        blogsData: serialize,
      },
    };
  } catch (error) {
    console.log('Error fetching blogs: ', error);
    return {
      props: {
        blogsData: [], // Return an empty array on error
      },
    };
  }
}


export default function AllBlogs({ blogsData }) {
  return (
    <div>
      <h1>All Blogs</h1>
      <ol className='list-none'>
        {blogsData.length > 0 ? (
          blogsData.map(({ _id, title }) => (
            <li className="" key={_id}>
              
              <Link href={`blogs/${_id}`}><h2>{title}</h2></Link>
            </li>
          ))
        ) : (
          <p>No blogs available</p>
        )}
      </ol>
    </div>
  );
}
