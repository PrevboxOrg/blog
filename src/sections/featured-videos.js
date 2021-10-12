import Link from 'next/link';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './../styles/sections/featured-videos.module.scss';
import c from '../contents/sections/featured-videos.json';

import PlaySVG from './../../public/sections/featured-videos/play.svg';
import FacebookSVG from './../../public/social/contrast/facebook.svg';
import TwitterSVG from './../../public/social/contrast/twitter.svg';
import LinkedinSVG from './../../public/social/contrast/linkedin.svg';
import InstagramSVG from './../../public/social/contrast/instagram.svg';

export default function FeaturedVideoSection () {

  return (
    <div className={s['featured-videos-section']}>
      <div className={'main-wrapper'}>
        <h3 className={s['featured-videos-section__title']}>
          {c.TITLE}
        </h3>

        <div className={s['featured-videos-section__videos']}>
          <Video video={c.FEATURED_VIDEOS[0]} full={true} />
          <Video video={c.FEATURED_VIDEOS[1]} />
          <Video video={c.FEATURED_VIDEOS[2]} />
          <Video video={c.FEATURED_VIDEOS[3]} />
          <Video video={c.FEATURED_VIDEOS[4]} />
          <div>
            <Link href={'https://facebook.com'}>
              <a className={s['featured-videos-section__videos__see-more']}>
                {c.SEE_MORE}
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className={s['featured-videos-section__background-front']}></div>
      <div className={s['featured-videos-section__background-back']}></div>
    </div>
  );
}

function Video ({ video, full }) {
  return (
    <div className={cn({
      [s['featured-video']]: true,
      [s['featured-video--full']]: full
    })}>
      <div className={s['featured-video__image']} style={{
        backgroundImage: `url('/${video.IMAGE}')`
      }}>
        <PlaySVG />
      </div>

      <p className={s['featured-video__categories']}>
        {video.CATEGORIES.map((category, categoryIndex) => {
          return (
            <Link
              href={`/pesquisa?categoria=${category.SLUG}`}
              key={`featured-videos-item-category-${categoryIndex}`}>
              <a className={s['featured-video__categories__category']}>
                {category.TITLE}
              </a>
            </Link>
          );
        })}
      </p>

      <span className={s['featured-video__title']}>
        {video.TITLE}
      </span>

      {full && (
        <div className={s['featured-video__footer']}>
          <div className={s['featured-video__footer__author']}>
            <img
              className={s['featured-video__footer__author-image']}
              src={video.AUTHOR.IMAGE || '/default-user-image.png'}
              alt={video.AUTHOR.NAME} />

            <div className={s['featured-video__footer__post-info']}>
              <span className={s['featured-video__footer__author-name']}>
                {video.AUTHOR.NAME}
              </span>
              <span className={s['featured-video__footer__updated_at']}>
                {dayjs(video.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
              </span>
            </div>
          </div>

          <div className={s['featured-video__footer__social']}>
            <Link href={'https://facebook.com'}>
              <a className={s['featured-video__footer__social-link']}>
                <FacebookSVG />
              </a>
            </Link>

            <Link href={'https://twitter.com'}>
              <a className={s['featured-video__footer__social-link']}>
                <TwitterSVG />
              </a>
            </Link>

            <Link href={'https://linkedin.com'}>
              <a className={s['featured-video__footer__social-link']}>
                <LinkedinSVG />
              </a>
            </Link>

            <Link href={'https://instagram.com'}>
              <a className={s['featured-video__footer__social-link']}>
                <InstagramSVG />
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
