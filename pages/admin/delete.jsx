export const deleteBlog = async (id) => {
  if (!id) {
    console.error("No blog found !");
    return false;
  }
  const confirmation = confirm('Are you sure ? ');
  if (!confirmation) return false;
  try {
    const response   = await fetch(`/api/blogs/delete?id=${id}`, {
      method: "DELETE"
    });
    if(response.ok){
      console.log("Blog deleted ");
      return true;
    }else{
      console.error('Blog deletion error');
      return false;
    }
  } catch (error) {
    console.error("Error: ", error);
    return false;
  }
} 
