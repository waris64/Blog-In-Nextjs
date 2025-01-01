import Link from 'next/link';

export default function Home({ allPostsData }) {
  return (
    <div>
      <h1>Blog List</h1>
      {allPostsData.length > 0 ? (
        <ul>
          {allPostsData.map(({ _id, title }) => (
            <li key={_id}>
              <Link href={`/blog/${_id}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}
