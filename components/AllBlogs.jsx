import Link from 'next/link';
export default  function AllblogsData({ blogsData }) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center ">  
        <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            All Blogs
          </h1>
          <ol className="space-y-4">
            {Array.isArray(blogsData) && blogsData.length > 0 ? (
              blogsData.map(({ _id, title }) => (
                <li
                  key={_id}
                  className="border-b pb-4 last:border-none hover:bg-gray-50 transition-all text-lg font-medium text-blue-600 hover:underline"
                >
                                    <Link href={`blogsData/${_id}`} className="decoration-none">
                                        {title}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-lg">
                                No blogsData available
                            </p>
                        )}
                    </ol>
                </div>
            </div>
        
    );
}