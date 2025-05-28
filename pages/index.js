import React, { useEffect } from 'react';
import Header from '../components/Header'
import AllBlogs from '../components/AllBlogs';
import connectMongo from '../lib/mongodb';
import Blog from '../models/Blog';

export async function getServerSideProps(){
  await connectMongo();
  const blogs = await Blog.find().lean();
  return {
    props:{
      blogsData:JSON.parse(JSON.stringify(blogs))
    }
  }
}
const App = ({blogsData}) => {
  return (
    <div>
      <Header image='https://www.w3schools.com/favicon.ico' />
      <AllBlogs blogsData={blogsData}/>
    </div>
  )
}

export default App