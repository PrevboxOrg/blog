import Link from 'next/link';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import cn from 'classnames';
import s from './../styles/sections/most-viewed.module.scss';

import Select from './../components/select';

export default function MostViewedSection ({ mostViewedPosts, categories }) {
  const router = useRouter();
  const selectItems = categories.map((category) => {
    return {
      TEXT: category.title,
      VALUE: category.slug
    };
  });

  const onCategoryClick = (item) => {
    if (!item) {
      return;
    }

    router.push({ pathname: '/posts', query: { categoria: item.VALUE }});
  };

  return (
    <div className={`${s['most-viewed-section']} main-wrapper`}>
      <div className={s['most-viewed-section__header']}>
        <h3 className={s['most-viewed-section__header__title']}>
          Mais vistos
        </h3>

        <Select
          placeholder={'Explore por categoria'}
          items={selectItems}
          onSelectClick={onCategoryClick}/>
      </div>

      <div className={s['most-viewed-section__posts-main']}>
        <Post post={mostViewedPosts[0]} full={true} />
        <Post post={mostViewedPosts[1]} />
        <Post post={mostViewedPosts[2]} />
      </div>

      <Link href={'/posts?tipo=mais-vistos'}>
        <a className={s['most-viewed-section__see-more']}>
          Veja mais
        </a>
      </Link>
    </div>
  );
}

function Post ({ post, full }) {
  return (
    <div className={s['most-viewed-post']} style={{
      backgroundImage: `url('${post.imageUrl}')`
    }} id="mais-vistos">
      <div className={cn({
        [s['most-viewed-post-info']]: true,
        [s['most-viewed-post-info--full']]: full
      })}>
        <p className={s['most-viewed-post-info__categories']}>
          {post.categories.map((category, categoryIndex) => {
            return (
              <Link
                href={`/pesquisa?categoria=${category.slug}`}
                key={`main-section-item-category-${categoryIndex}`}>
                <a className={s['most-viewed-post-info__categories__category']}>
                  {category.title}
                </a>
              </Link>
            );
          })}
        </p>

        <Link href={`/posts/${post.slug}`}>
          <a className={s['most-viewed-post-info__title']}>
            {post.title}
          </a>
        </Link>

        <div className={s['most-viewed-post-info__footer']}>
          <img
            className={s['most-viewed-post-info__footer__author-image']}
            src={post.author.image || '/default-user-image.png'}
            alt={post.author.name} />

          <div className={s['most-viewed-post-info__footer__post-info']}>
            <span className={s['most-viewed-post-info__footer__author-name']}>
              {post.author.name}
            </span>
            <span className={s['most-viewed-post-info__footer__updated_at']}>
              {dayjs(post.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
