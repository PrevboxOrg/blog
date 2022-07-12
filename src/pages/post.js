import Link from 'next/link';
import MainLayout from './../layout/main';
import dayjs from 'dayjs';
import s from './../styles/pages/post.module.scss';

import Breadcrumps from './../components/breadcrumps';
import SidebarPost from './../components/sidebar-post';

import FacebookSVG from './../../public/social/facebook.svg';
import TwitterSVG from './../../public/social/twitter.svg';
import LinkedinSVG from './../../public/social/linkedin.svg';
import InstagramSVG from './../../public/social/instagram.svg';

export default function PostPage ({ post, lastPosts }) {
  const breadcrumps = [
    {
      text: 'Home',
      href: '/'
    },
    ...(post.categories || []).map(category => ({
      text: category.title,
      href: `/posts?categoria=${category.slug}`
    })),
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
          <Breadcrumps
            breadcrumps={(post.categories || []).map(category => ({ text: category.title, href: `/posts?categoria=${category.slug}` }))}
            color={'background'}
          />

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
          </div>
        </div>

        <Breadcrumps breadcrumps={breadcrumps} top />

        <div className={s['post__wrapper']}>
          <div className={s['post__content']} dangerouslySetInnerHTML={{ __html: post.content}}></div>

          <div className={s['post__sidebar']}>
            <h4 className={s['post__sidebar__title']}>
              Ultimos posts
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
