import posts from './../../src/contents/posts.json';

import PostPage from './../../src/pages/post';

export default function ProjectsPage ({ post }) {
  return (
    <PostPage post={post} />
  );
}

export async function getStaticPaths () {
  const postsPaths = posts.map((post) => {
    return {
      params: {
        slug: post.SLUG
      }
    };
  });

  return {
    paths: postsPaths,
    fallback: false
  };
}

export async function getStaticProps ({ params }) {
  const post = posts.find((post) => post.SLUG === params.slug);

  return { props: { post } };
}