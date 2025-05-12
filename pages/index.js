import Link from "next/link";
import connectMongo from "../lib/mongodb";
import Blog from "../models/Blog";
import Header from '../components/Header';
export async function getServerSideProps() {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch all blogs and convert to plain JavaScript objects using .lean()
    const blogs = await Blog.find({}).lean();

    const serialize = JSON.parse(JSON.stringify(blogs));

    return {
      props: {
        blogsData: serialize,
      },
    };
  } catch (error) {
    console.log("Error fetching blogs : ", error);
    return {
      props: {
        blogsData: [], // Return an empty array on error
      },
    };
  }
}

export default function AllBlogs({ blogsData }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center ">
      <Header image='https://www.w3schools.com/favicon.ico'/>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          All Blogs
        </h1>
        <ol className="space-y-4">
          {blogsData.length > 0 ? (
            blogsData.map(({ _id, title }) => (
              <li
                key={_id}
                className="border-b pb-4 last:border-none hover:bg-gray-50 transition-all text-lg font-medium text-blue-600 hover:underline"
              >
                <Link href={`blogs/${_id}`} className="decoration-none">
                  {title}
                </Link>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No blogs available
            </p>
          )}
        </ol>
      </div>
    </div>
  );
}
