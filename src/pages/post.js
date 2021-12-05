import Link from 'next/link';
import MainLayout from './../layout/main';
import dayjs from 'dayjs';
import s from './../styles/pages/post.module.scss';
import c from './../contents/pages/post.json';

import Breadcrumps from './../components/breadcrumps';
import SidebarPost from './../components/sidebar-post';

import FacebookSVG from './../../public/social/facebook.svg';
import TwitterSVG from './../../public/social/twitter.svg';
import LinkedinSVG from './../../public/social/linkedin.svg';
import InstagramSVG from './../../public/social/instagram.svg';

export default function PostPage ({ post }) {
  const breadcrumps = [
    {
      text: c.HOME,
      href: '/'
    },
    ...post.CATEGORIES.map(category => {
      return {
        text: category.TITLE,
        href: `/posts?categoria=${category.SLUG}`
      };
    }),
    {
      text: post.TITLE,
      href: `/posts/${post.SLUG}`
    }
  ];

  return (
    <MainLayout contents={post}>
      <div className={`${s['post']} main-wrapper`}>
        <div className={s['post__head']} style={{
          backgroundImage: `url(/${post.IMAGE})`
        }}>
          <h1 className={s['post__head__title']}>
            {post.TITLE}
          </h1>

          <div className={s['post-social']}>
            <div className={s['post-social__wrapper']}>
              <img
                className={s['post-social__author-image']}
                src={post.AUTHOR.IMAGE || '/default-user-image.png'}
                alt={post.AUTHOR.NAME} />

              <div className={s['post-social__post-info']}>
                <span className={s['post-social__author-name']}>
                  {post.AUTHOR.NAME}
                </span>
                <span className={s['post-social__updated_at']}>
                  {dayjs(post.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
                </span>
              </div>
            </div>

            <div className={s['post-social__wrapper']}>
              <Link href={'https://facebook.com'}>
                <a className={s['post-social__social-link']}>
                  <FacebookSVG />
                </a>
              </Link>

              <Link href={'https://twitter.com'}>
                <a className={s['post-social__social-link']}>
                  <TwitterSVG />
                </a>
              </Link>

              <Link href={'https://linkedin.com'}>
                <a className={s['post-social__social-link']}>
                  <LinkedinSVG />
                </a>
              </Link>

              <Link href={'https://instagram.com'}>
                <a className={s['post-social__social-link']}>
                  <InstagramSVG />
                </a>
              </Link>
            </div>
          </div>
        </div>

        <Breadcrumps breadcrumps={breadcrumps} top />

        <div className={s['post__wrapper']}>
          <div className={s['post__content']} dangerouslySetInnerHTML={{ __html: post.CONTENT}}></div>

          <div className={s['post__sidebar']}>
            <h4 className={s['post__sidebar__title']}>
              {c.LAST_POSTS}
            </h4>

            <div className={s['post__sidebar__posts']}>
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
