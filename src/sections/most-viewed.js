import Link from 'next/link';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './../styles/sections/most-viewed.module.scss';
import c from '../contents/sections/most-viewed.json';

import FacebookSVG from './../../public/social/facebook.svg';
import TwitterSVG from './../../public/social/twitter.svg';
import LinkedinSVG from './../../public/social/linkedin.svg';
import InstagramSVG from './../../public/social/instagram.svg';

export default function MostViewedSection () {
  const posts = [ ...c.MOST_VIEWED_POSTS ];
  const firstPost = posts.shift();
  const secondPost = posts.shift();
  const thirdPost = posts.shift();

  return (
    <div className={`${s['most-viewed-section']} main-wrapper`}>
      <h3 className={s['most-viewed-section__title']}>
        {c.MOST_VIEWED}
      </h3>

      <div className={s['most-viewed-section__posts-main']}>
        <Post post={firstPost} full={true} />
        <Post post={secondPost} />
        <Post post={thirdPost} />
      </div>
    </div>
  );
}

function Post ({ post, full }) {
  return (
    <div className={s['most-viewed-post']} style={{
      backgroundImage: `url('/${post.IMAGE}')`
    }}>
      <div className={cn({
        [s['most-viewed-post-info']]: true,
        [s['most-viewed-post-info--full']]: full
      })}>
        <p className={s['most-viewed-post-info__categories']}>
          {post.CATEGORIES.map((category, categoryIndex) => {
            return (
              <Link
                href={`/categorias/${category.SLUG}`}
                key={`main-section-item-category-${categoryIndex}`}>
                <a className={s['most-viewed-post-info__categories__category']}>
                  {category.TITLE}
                </a>
              </Link>
            );
          })}
        </p>

        <Link href={`/posts/${post.SLUG}`}>
          <a className={s['most-viewed-post-info__title']}>
            {post.TITLE}
          </a>
        </Link>

        {full && (
          <div className={s['most-viewed-post-info__footer']}>
            <img
              className={s['most-viewed-post-info__footer__author-image']}
              src={post.AUTHOR.IMAGE || '/default-user-image.png'}
              alt={post.AUTHOR.NAME} />

            <div className={s['most-viewed-post-info__footer__post-info']}>
              <span className={s['most-viewed-post-info__footer__author-name']}>
                {post.AUTHOR.NAME}
              </span>
              <span className={s['most-viewed-post-info__footer__updated_at']}>
                {dayjs(post.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
              </span>
            </div>

            <Link href={'https://facebook.com'}>
              <a className={s['most-viewed-post-info__footer__social-link']}>
                <FacebookSVG />
              </a>
            </Link>

            <Link href={'https://twitter.com'}>
              <a className={s['most-viewed-post-info__footer__social-link']}>
                <TwitterSVG />
              </a>
            </Link>

            <Link href={'https://linkedin.com'}>
              <a className={s['most-viewed-post-info__footer__social-link']}>
                <LinkedinSVG />
              </a>
            </Link>

            <Link href={'https://instagram.com'}>
              <a className={s['most-viewed-post-info__footer__social-link']}>
                <InstagramSVG />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
