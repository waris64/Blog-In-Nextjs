export const deleteBlog = async (id) => {
  if (!id) {
    console.error("No blog found !");
    return;
  }
  const confirmation = confirm('Are you sure ? ');
  if (confirmation) {
    try {
      const blogData = await fetch(`/api/blogs/delete?id=${id}`, {
        method: "DELETE"
      });
      return true;
    } catch (error) {
      console.error("Error: ", error);
    }
  } else {
    return false;
  }
}