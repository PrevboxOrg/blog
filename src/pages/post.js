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

export default function PostPage ({ post, lastPosts }) {
  const breadcrumps = [
    {
      text: c.HOME,
      href: '/'
    },
    ...(post.categories || []).map(category => {
      return {
        text: category.title,
        href: `/posts?categoria=${category.slug}`
      };
    }),
    {
      text: post.title,
      href: `/posts/${post.slug}`
    }
  ];

  return (
    <MainLayout contents={post}>
      <div className={`${s['post']} main-wrapper`}>
        <div className={s['post__head']} style={{
          backgroundImage: `url(${post.imageUrl})`
        }}>
          <h1 className={s['post__head__title']}>
            {post.title}
          </h1>

          <div className={s['post-social']}>
            <div className={s['post-social__wrapper']}>
              <img
                className={s['post-social__author-image']}
                src={post.author.image || '/default-user-image.png'}
                alt={post.author.name} />

              <div className={s['post-social__post-info']}>
                <span className={s['post-social__author-name']}>
                  {post.author.name}
                </span>
                <span className={s['post-social__updated_at']}>
                  {dayjs(post.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
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
          <div className={s['post__content']} dangerouslySetInnerHTML={{ __html: post.content}}></div>

          <div className={s['post__sidebar']}>
            <h4 className={s['post__sidebar__title']}>
              {c.LAST_POSTS}
            </h4>

            <div className={s['post__sidebar__posts']}>
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
