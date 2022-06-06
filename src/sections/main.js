import Link from 'next/link';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import dayjs from 'dayjs';
import s from './../styles/sections/main.module.scss';
import c from './../contents/sections/main.json';

SwiperCore.use([Pagination, Autoplay]);

export default function MainSection ({ mainPosts }) {
  const slideInfoRef = useRef();
  const [activeSlide, setActiveSlide] = useState(mainPosts[0]);

  function onSlideChange (swiper) {
    setActiveSlide(mainPosts[swiper.activeIndex]);
  }

  function onTouchStart () {
    slideInfoRef.current.style.opacity = '0';
  }

  function onTouchEnd () {
    slideInfoRef.current.style.opacity = '1';
  }

  return (
    <div className={`${s['main-section']} main-slider`} id="principais">
      <Swiper
        className={s['main-section__slider']}
        slidesPerView={1}
        slidesPerGroup={1}
        grabCursor={true}
        autoplay={{
          disableOnInteraction: false,
          delay: 5000
        }}
        resistanceRatio={0}
        pagination={{ clickable: true }}
        onSlideChange={onSlideChange}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {mainPosts.map((item, index) => {
          return (
            <SwiperSlide key={`main-section-item-${index}`}>
              <div
                className={s['slide']}
                style={{ backgroundImage: `url('${item.imageUrl}')` }}>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className={s['slide-info']} ref={slideInfoRef}>
        <p className={s['slide-info__categories']}>
          {activeSlide.categories.map((category, categoryIndex) => {
            return (
              <Link
                href={`/pesquisa?categoria=${category.slug}`}
                key={`main-section-item-category-${categoryIndex}`}>
                <a className={s['slide-info__categories__category']}>
                  {category.title}
                </a>
              </Link>
            );
          })}
        </p>

        <Link href={`/posts/${activeSlide.slug}`}>
          <a className={s['slide-info__title']}>
            {activeSlide.title}
          </a>
        </Link>

        <div className={s['slide-info__footer']}>
          <img
            className={s['slide-info__footer__author-image']}
            src={activeSlide.author.image || '/default-user-image.png'}
            alt={activeSlide.author.name} />

          <div className={s['slide-info__footer__post-info']}>
            <span className={s['slide-info__footer__author-name']}>
              {activeSlide.author.name}
            </span>
            <span className={s['slide-info__footer__updated_at']}>
              {dayjs(activeSlide.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
            </span>
          </div>
        </div>

        <Link href={`/posts/${activeSlide.slug}`}>
          <a className={s['slide-info__know-more']}>
            {c.KNOW_MORE}
          </a>
        </Link>
      </div>
    </div>
  );
}
