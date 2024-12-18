import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';


const postsDirectory = path.join(process.cwd(), 'posts');

// Get metadata for all posts
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, ''); // Remove the .md extension

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
      id,
      title:matterResult.data.title || 'Not getting title ',
      date:matterResult.data.date || 'Not getting date',
      ...matterResult.data, // Includes title and date from front-matter
    };
  });

  return allPostsData.filter(post=>post.date).sort((a, b) => (a.date < b.date ? 1 : -1)); // Sort by date
}
// Get dynamic paths for posts
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''), // Remove the .md extension
      },
    };
  });
}

// Get data for a single post
export async function getPostData(id) {
  if (!id) {
    throw new Error(`Invalid id: ${id}`);
  }

  const fullPath = path.join(postsDirectory, `${id}.md`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${fullPath}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  // Using remark to converting markdown data to string 
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
