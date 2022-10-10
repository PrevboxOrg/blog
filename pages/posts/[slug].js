import axios from 'axios';
import PostPage from './../../src/pages/post';
import { config } from './../../src/config';

export default function ProjectsPage ({ post, lastPosts }) {
  return (
    <PostPage post={post} lastPosts={lastPosts} />
  );
}

export async function getServerSideProps({ params }) {
  const postQuery = `
    query postQuery (
      $slug: String!
    ) {
      postBySlug (slug: $slug) {
        id
        title
        slug
        meta {
          type
          value
        }
        imageUrl
        categories {
          id
          title
          slug
        }
        author {
          name
          image
        }
        comments {
          author {
            name
            company
          }
          content
          archived
        }
        content
        createdAt
        updatedAt
        draft
      }
    }
  `;

  const postsQuery = `
    query postsQuery (
      $where: PostsWhereInput
      $orderBy: PostsOrderByEnum
      $take: Int
      $skip: Int
    ) {
      posts (
        where: $where
        orderBy: $orderBy
        take: $take
        skip: $skip
      ) {
        items {
          id
          title
          slug
          imageUrl
          updatedAt
        }
      }
    }
  `;

  const updatePostViewsMutation = `
    mutation updatePostViews (
      $id: ID!
    ) {
      updatePostViews (id: $id) {
        id
      }
    }
  `;

  const postResponse = await axios.post(config.baseUrl, {
    query: postQuery,
    variables: {
      slug: params.slug
    }
  });

  const lastsPostResponse = await axios.post(config.baseUrl, {
    query: postsQuery,
    variables: {
      where: {
        draft: false,
        archived: false,
        request: false
      },
      take: 3
    }
  });

  const post = (postResponse.data && postResponse.data.data && postResponse.data.data.postBySlug);
  const lastPosts = (lastsPostResponse.data && lastsPostResponse.data.data && lastsPostResponse.data.data.posts && lastsPostResponse.data.data.posts.items);

  if (post && post.id) {
    await axios.post(config.baseUrl, {
      query: updatePostViewsMutation,
      variables: { id: post.id }
    });
  }

  return {
    props: { post, lastPosts }
  };
}
