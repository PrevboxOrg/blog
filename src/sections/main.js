import Link from 'next/link';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import dayjs from 'dayjs';
import s from './../styles/sections/main.module.scss';
import c from './../contents/sections/main.json';

SwiperCore.use([Pagination]);

import FacebookSVG from './../../public/social/facebook.svg';
import TwitterSVG from './../../public/social/twitter.svg';
import LinkedinSVG from './../../public/social/linkedin.svg';
import InstagramSVG from './../../public/social/instagram.svg';

export default function MainSection () {
  const slideInfoRef = useRef();
  const [activeSlide, setActiveSlide] = useState(c.MAIN_POSTS[0]);

  function onSlideChange (swiper) {
    setActiveSlide(c.MAIN_POSTS[swiper.activeIndex]);
  }

  function onTouchStart () {
    slideInfoRef.current.style.opacity = '0';
  }

  function onTouchEnd () {
    slideInfoRef.current.style.opacity = '1';
  }

  return (
    <div className={`${s['main-section']} main-slider`}>
      <Swiper
        className={s['main-section__slider']}
        slidesPerView={1}
        slidesPerGroup={1}
        grabCursor={true}
        autoplay={{
          delay: 4000
        }}
        resistanceRatio={0}
        pagination={{ clickable: true }}
        onSlideChange={onSlideChange}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {c.MAIN_POSTS.map((item, index) => {
          return (
            <SwiperSlide key={`main-section-item-${index}`}>
              <div
                className={s['slide']}
                style={{ backgroundImage: `url('/${item.IMAGE}')` }}>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={s['slide-info']} ref={slideInfoRef}>
        <p className={s['slide-info__categories']}>
          {activeSlide.CATEGORIES.map((category, categoryIndex) => {
            return (
              <Link
                href={`/pesquisa?categoria=${category.SLUG}`}
                key={`main-section-item-category-${categoryIndex}`}>
                <a className={s['slide-info__categories__category']}>
                  {category.TITLE}
                </a>
              </Link>
            );
          })}
        </p>

        <Link href={`/posts/${activeSlide.SLUG}`}>
          <a className={s['slide-info__title']}>
            {activeSlide.TITLE}
          </a>
        </Link>

        <div className={s['slide-info__footer']}>
          <img
            className={s['slide-info__footer__author-image']}
            src={activeSlide.AUTHOR.IMAGE || '/default-user-image.png'}
            alt={activeSlide.AUTHOR.NAME} />

          <div className={s['slide-info__footer__post-info']}>
            <span className={s['slide-info__footer__author-name']}>
              {activeSlide.AUTHOR.NAME}
            </span>
            <span className={s['slide-info__footer__updated_at']}>
              {dayjs(activeSlide.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
            </span>
          </div>

          <Link href={'https://facebook.com'}>
            <a className={s['slide-info__footer__social-link']}>
              <FacebookSVG />
            </a>
          </Link>

          <Link href={'https://twitter.com'}>
            <a className={s['slide-info__footer__social-link']}>
              <TwitterSVG />
            </a>
          </Link>

          <Link href={'https://linkedin.com'}>
            <a className={s['slide-info__footer__social-link']}>
              <LinkedinSVG />
            </a>
          </Link>

          <Link href={'https://instagram.com'}>
            <a className={s['slide-info__footer__social-link']}>
              <InstagramSVG />
            </a>
          </Link>
        </div>

        <Link href={`/posts/${activeSlide.SLUG}`}>
          <a className={s['slide-info__know-more']}>
            {c.KNOW_MORE}
          </a>
        </Link>
      </div>
    </div>
  );
}
