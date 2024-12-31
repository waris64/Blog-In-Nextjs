import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Date from '../components/date';

// Fetch blog posts dynamically from the API in `getStaticProps`.
export async function getStaticProps() {

  try {
    const res = await fetch('http://localhost:3000/api/blogs');
    const allPostsData = await res.json()
    console.log('posts data fetched:' , allPostsData)
    return {
      props: {
        allPostsData, // Data from the API
      },
      revalidate: 60, // Revalidate every 60 seconds (you can adjust this as needed)
    };
    console.log('sai ga rha ha ')
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return {
      props: {
        allPostsData: [],
      },
    };
  }
}
export default function Home({ allPostsData }) {

  return (
    <Layout >
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, I am a passionate Software Engineer with expertise in frontend development using{' '}
          <i>Javascript</i>, <i>React.js</i>, and <i>Next.js</i>. I strive to build user-friendly
          applications and grow into a <b>Full Stack Developer</b>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        {allPostsData.length > 0 ? (
          <ul className={utilStyles.list}>
            {allPostsData.map(({ _id, title, content, author, createdAt }) => (
              <li className={utilStyles.listItem} key={_id}>
                <Link href={`/blog/${_id}`}>{title}</Link>
                <br />
                {createdAt && (
                  <small className={utilStyles.lightText}>
                    <Date dateString={createdAt} />
                  </small>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No blog posts available.</p>
        )}
      </section>
    </Layout>
  );
}
