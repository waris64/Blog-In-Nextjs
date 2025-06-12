import React, { useState,useEffect } from 'react';
const BlogData = ()=>{
    const [blogsData , setBlogsData] = useState(null);
    useEffect(  ()=>{
        const fetchData = async ()=>{ 
            const response = await fetch('/api/blogs/');
            const data = await response.json();
            setBlogsData(data);
            console.log("Data fetched : ",  data);
        }
        fetchData();
        },[])
return (
    <div>
        {
        blogsData ? (
        <div>
            <h1>Here is the blog data</h1>
            {/* {
            blogsData.map((blog,index)=>{
                <div key={index}>
                    {blog}
                    </div>
            })
            } */}
            </div>
        ):(
        <div>No data </div>
        )
}
    </div>

)
}
export default BlogData;