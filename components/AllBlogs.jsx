import {useState,useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function AllblogsData({ blogsData }) {
  const [blogs,setBlogs] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalPages,setTotalPages] = useState(1);
  const limit = 6;
  
  useEffect(()=>{
    const fetchBlogs = async ()=>{
      const res = await fetch(`/api/blogs?page=${currentPage}&limit=${limit}`);
      const data = await res.json();
      setBlogs(data.blogs);
      console.log("Setted blogs : ", data.blogs);
      console.log("Total Blogs : ",data.Blogs);
      setTotalPages(Math.ceil(data.totalBlogs / limit ));
}
fetchBlogs();
},[currentPage]);

const handleNextPage=()=>{
  if(currentPage < totalPages){
    setCurrentPage(currentPage + 1);
  }
};

const handlePreviousPage =()=>{
  if(currentPage > 1){
    setCurrentPage(currentPage - 1)
  }
}
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          All Blogs
        </h1>

        {Array.isArray(blogs) && blogs.length > 0 ? (
          <ul className="space-y-4">
            {blogs.map(({ _id, title,content, file }) => (
              <li
                key={_id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-all flex items-center  space-x-4 h-[200px]"
              >
                <div className="w-[200px] h-full overflow-hidden rounded">
                  <Image
                    src={`/uploads/${file}`}
                    alt={title}
                    width={200}
                    height={150}
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>

                <div className="flex-1">
                  <Link href={`/blogs/${_id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                    {title}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 text-lg">No blogsData available</p>
        )};

        {/* Pagination controls */}
        <div>
          <button 
          onClick={handlePreviousPage}
          disabled={currentPage===1}
          className='px-4 py-2 bg-blue-500'
          >
            Previous Page
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button                           
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className='px-4 py-2 bg-blue-500'
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
}
