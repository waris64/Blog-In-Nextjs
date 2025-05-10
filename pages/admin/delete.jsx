import { useRouter } from "next/router";
import { useState } from "react";
export const handleDelete=async (id)=>{
  const router = useRouter();
  const [blogs,setBlogs] = useState();
  const fetchBlogs = await fetch('/api/blogs');
  setBlogs(fetchBlogs);
  try {
    if(confirm("You are deleting ? ")){
      const response = await fetch(`/api/delete/${id}`,{
        method:'DELETE',
      });
      if(response.ok){
       const deltedBlog = blogs.filter((blog)=>blog._id !== id);
        console.log(`blog with id : ${deltedBlog} deleted .`);
      }else{
        console.error('blog deletion error ')
      }
    }else{
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}


export default handleDelete;