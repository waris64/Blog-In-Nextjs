import Blog from '../models';
import connectMongo from './mongodb';


export async function data() {
  await connectMongo();
  if (connectMongo) {
    console.log('mongo conneected');
  } else {
    console.log('mongo not connected');
  }
  const posts = Blog.find({},'_id');
  posts.map((post)=>({
params:{id:post._id.toString()}
  }))
}

export async function getPostData(id){
  await connectMongo();
  const post = await Blog.findById(id);
  if(!post){
throw new Error()
  }
}