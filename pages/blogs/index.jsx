// import connectMongo from "../../lib/mongodb";
// import Blog from "../../models/Blog";
// import Image from 'next/image';
// import Link from 'next/link'
// export default function AllBlogs({ blogs }) {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center gap-4 overflow-hidden">
//       {blogs && blogs.length > 0 ? (
//         blogs.map((blog) => (
//           <div key={blog._id} className="shadow-lg rounded-lg p-6 max-w-sm w-full  ">
//             <Link href={`/blogs/${blog._id}`} className="decoration-none">
//               <div className="w-full h-[200px]  overflow-hidden  bg-red-400 mx-auto mb-4"> 
//                 <Image src={`/uploads/${blog.file}`} width={200} height={200} alt='Blog Image ' className="object-cover w-full h-full transform transition-transform ease-in-out duration-400 hover:scale-110" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h1> 
//               <small className="block text-gray-500">{blog.author}</small>
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>Error in blogs rendering in pages/blogs/index</p>
//       )}
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   try {
//     await connectMongo();
//     const blogs = await Blog.find().lean();
//     const serialize = JSON.parse(JSON.stringify(blogs));
//     return {
//       props: {
//         blogs: serialize || [],
//       },
//     };
//   } catch (error) {
//     console.log("Error fetching blogs: ", error);
//     return {
//       props: {
//         blogs: [],
//       },
//     };
//   }
// }
