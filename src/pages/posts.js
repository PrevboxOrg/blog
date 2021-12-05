import Link from 'next/link';
import MainLayout from './../layout/main';
import dayjs from 'dayjs';
import s from './../styles/pages/posts.module.scss';
import c from './../contents/pages/posts.json';

import Breadcrumps from './../components/breadcrumps';
import Input from './../components/input';
import SidebarPost from './../components/sidebar-post';

import FacebookSVG from './../../public/social/facebook.svg';
import TwitterSVG from './../../public/social/twitter.svg';
import LinkedinSVG from './../../public/social/linkedin.svg';
import InstagramSVG from './../../public/social/instagram.svg';

export default function PostsPage () {
  const breadcrumps = [
    {
      text: c.HOME,
      href: '/'
    },
    {
      text: `${c.SEARCH_RESULT} benefícios`,
      href: '/posts/nome=beneficios'
    },
  ];

  return (
    <MainLayout contents={c}>
      <div className={`${s['posts']} main-wrapper`}>
        <Breadcrumps breadcrumps={breadcrumps} />

        <h1 className={s['posts__title']}>
          {c.SEARCH_RESULT} benefícios
        </h1>

        <div className={s['posts__wrapper']}>
          <div className={s['posts__list']}>
            <Post post={c.POSTS[0]}></Post>
            <Post post={c.POSTS[1]}></Post>
            <Post post={c.POSTS[2]}></Post>

            <button className={s['posts__list__see-more']}>
              {c.SEE_MORE}
            </button>
          </div>

          <div className={s['posts__sidebar']}>
            <h4 className={s['posts__sidebar__title']}>
              {c.SEARCH}
            </h4>

            <Input icon={'/icons/search.svg'} placeholder={c.SEARCH_PLACEHOLDER}></Input>

            <h4 className={`${s['posts__sidebar__title']} hide-mobile`}>
              {c.LAST_POSTS}
            </h4>

            <div className={`${s['posts__sidebar__posts']} hide-mobile`}>
              <SidebarPost post={c.POSTS[0]}></SidebarPost>
              <SidebarPost post={c.POSTS[1]}></SidebarPost>
              <SidebarPost post={c.POSTS[2]}></SidebarPost>
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
      <Link href={`/posts/${post.SLUG}`}>
        <a className={s['post__title']}>
          {post.TITLE}
        </a>
      </Link>

      <div className={s['post__footer']}>
        <div className={s['post__footer__wrapper']}>
          <img
            className={s['post__footer__author-image']}
            src={post.AUTHOR.IMAGE || '/default-user-image.png'}
            alt={post.AUTHOR.NAME} />

          <div className={s['post__footer__post-info']}>
            <span className={s['post__footer__author-name']}>
              {post.AUTHOR.NAME}
            </span>
            <span className={s['post__footer__updated_at']}>
              {dayjs(post.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
            </span>
          </div>
        </div>

        <div className={s['post__footer__wrapper']}>
          <Link href={'https://facebook.com'}>
            <a className={s['post__footer__social-link']}>
              <FacebookSVG />
            </a>
          </Link>

          <Link href={'https://twitter.com'}>
            <a className={s['post__footer__social-link']}>
              <TwitterSVG />
            </a>
          </Link>

          <Link href={'https://linkedin.com'}>
            <a className={s['post__footer__social-link']}>
              <LinkedinSVG />
            </a>
          </Link>

          <Link href={'https://instagram.com'}>
            <a className={s['post__footer__social-link']}>
              <InstagramSVG />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
