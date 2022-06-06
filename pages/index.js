import axios from 'axios';
import IndexPage from '../src/pages/index';
import { config } from '../src/config';

export default function Index ({ mainPosts, mostViewedPosts, categories }) {
  return <IndexPage mainPosts={mainPosts} mostViewedPosts={mostViewedPosts} categories={categories} />;
}

export async function getServerSideProps() {
  const postQuery = `
    query postsQuery (
      $where: PostsWhereInput
      $orderBy: PostsOrderByEnum
      $take: Int
      $skip: Int
    ) {
      mainPosts: posts (
        where: $where
        take: $take
        skip: $skip
      ) {
        items {
          title
          slug
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
          updatedAt
        }
      }

      mostViewed: posts (
        where: $where
        orderBy: $orderBy
        take: $take
        skip: $skip
      ) {
        items {
          title
          slug
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
          updatedAt
        }
      }

      categories {
        id
        title
        slug
        position
        archived
      }
    }
  `;

  const postsResponse = await axios.post(config.baseUrl, {
    query: postQuery,
    variables: {
      where: {
        archived: false,
        draft: false
      },
      take: 3,
      orderBy: 'views_desc'
    }
  });

  return {
    props: {
      mainPosts: (
        postsResponse.data &&
        postsResponse.data.data &&
        postsResponse.data.data.mainPosts &&
        postsResponse.data.data.mainPosts.items
      ),
      mostViewedPosts: (
        postsResponse.data &&
        postsResponse.data.data &&
        postsResponse.data.data.mostViewed &&
        postsResponse.data.data.mostViewed.items
      ),
      categories: (
        postsResponse.data &&
        postsResponse.data.data &&
        postsResponse.data.data.categories
      )
    }
  };
}