import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts'; // Corrected function
import Link from 'next/link';
import Date from '../components/date';
export async function getStaticProps() {
  const allPostsData = getSortedPostsData(); // Fetch metadata for all posts
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hy, I am a passionate Software Engineer with expertise in frontend development using{' '}
          <i>Javascript</i>, <i>React.js</i>, and <i>Next.js</i>. I strive to build user-friendly
          applications and grow into a <b>Full Stack Developer</b>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              {Date !== 'No date' && ( // Only render the Date component if the date is valid
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
