import axios from 'axios';
import PostsPage from '../src/pages/posts';
import { config } from '../src/config';

export default function Index ({ query, posts, lastPosts }) {
  return <PostsPage query={query} posts={posts} lastPosts={lastPosts} />;
}

export async function getServerSideProps({ query }) {
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
          author {
            name
            image
          }
          updatedAt
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `;

  const where = {
    draft: false,
    archived: false
  };
  let take = 3;
  let orderBy = 'createdAt_desc';

  if (query['categoria']) {
    where.categorySlug = query['categoria'];
  }

  if (query['nome']) {
    where.title = query['nome'];
  }

  if (query['pagina']) {
    take = 3 * (query['pagina'] || 1);
  }

  if (query['tipo']) {
    const types = {
      'mais-vistos': 'views_desc'
    };

    orderBy = types[query['tipo']];
  }

  const postsResponse = await axios.post(config.baseUrl, {
    query: postsQuery,
    variables: {
      where,
      take,
      orderBy
    }
  });

  const lastsPostResponse = await axios.post(config.baseUrl, {
    query: postsQuery,
    variables: {
      where: {
        draft: false,
        archived: false
      },
      take: 3
    }
  });

  return {
    props: {
      query,
      posts: (
        postsResponse.data &&
        postsResponse.data.data &&
        postsResponse.data.data.posts
      ),
      lastPosts: (
        lastsPostResponse.data &&
        lastsPostResponse.data.data &&
        lastsPostResponse.data.data.posts &&
        lastsPostResponse.data.data.posts.items
      )
    }
  };
}