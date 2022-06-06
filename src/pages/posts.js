import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MainLayout from './../layout/main';
import dayjs from 'dayjs';
import s from './../styles/pages/posts.module.scss';
import c from './../contents/pages/posts.json';

import { debounce } from './../core/debounce';

import Breadcrumps from './../components/breadcrumps';
import Input from './../components/input';
import SidebarPost from './../components/sidebar-post';

export default function PostsPage ({ query, posts, lastPosts }) {
  const router = useRouter();
  query = query || {};

  const breadcrumps = [
    {
      text: c.HOME,
      href: '/'
    }
  ];

  if (query['categoria']) {
    breadcrumps.push({
      text: `Categoria: ${query['categoria']}`,
      href: '/posts?categoria=' + query['categoria']
    });
  }

  if (query['nome']) {
    breadcrumps.push({
      text: `${c.SEARCH_RESULT} ${query['nome']}`,
      href: '/posts?nome=' + query['nome']
    });
  }

  useEffect(() => {
    if (query['nome']) {
      const input = window.document.getElementById('search-input');
      input.value = query['nome'];
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchChange = debounce((event) => {
    const value = event.target.value;

    router.replace({
      pathname: '/posts',
      query: { ...query, nome: value }
    });
  }, 500);

  return (
    <MainLayout contents={c}>
      <div className={`${s['posts']} main-wrapper`}>
        <Breadcrumps breadcrumps={breadcrumps} />

        {query['nome'] &&
          <h1 className={s['posts__title']}>
            {c.SEARCH_RESULT} {query['nome']}
          </h1>
        }

        <div className={s['posts__wrapper']}>
          <div className={s['posts__list']}>
            {posts.items.map((post, index) => <Post post={post} key={`post-${index}`}></Post>)}

            {posts.pageInfo.hasNextPage &&
              <Link href={{
                pathname: '/posts',
                query: { ...query, pagina: (Number(query.pagina) || 1) + 1 }
              }} que passHref>
                <button className={s['posts__list__see-more']}>
                  {c.SEE_MORE}
                </button>
              </Link>
            }
          </div>

          <div className={s['posts__sidebar']}>
            <h4 className={s['posts__sidebar__title']}>
              {c.SEARCH}
            </h4>

            <Input
              icon={'/icons/search.svg'}
              id="search-input"
              placeholder={c.SEARCH_PLACEHOLDER}
              onChange={onSearchChange}>
            </Input>

            <h4 className={`${s['posts__sidebar__title']} hide-mobile`}>
              {c.LAST_POSTS}
            </h4>

            <div className={`${s['posts__sidebar__posts']} hide-mobile`}>
              <SidebarPost post={lastPosts[0]}></SidebarPost>
              <SidebarPost post={lastPosts[1]}></SidebarPost>
              <SidebarPost post={lastPosts[2]}></SidebarPost>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

function Post ({ post }) {
  return (
    <div className={s['post']}>
      <Link href={`/posts/${post.slug}`}>
        <a className={s['post__title']}>
          {post.title}
        </a>
      </Link>

      <div className={s['post__footer']}>
        <div className={s['post__footer__wrapper']}>
          <img
            className={s['post__footer__author-image']}
            src={post.author.imageUrl || '/default-user-image.png'}
            alt={post.author.name} />

          <div className={s['post__footer__post-info']}>
            <span className={s['post__footer__author-name']}>
              {post.author.name}
            </span>
            <span className={s['post__footer__updated_at']}>
              {dayjs(post.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
