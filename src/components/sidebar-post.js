import Link from 'next/link';
import dayjs from 'dayjs';
import s from './../styles/components/sidebar-post.module.scss';

export default function SidebarPost ({ post }) {
  return (
    <div className={s['sidebar-post']}>
      <img className={s['sidebar-post__image']} src={`/${post.IMAGE}`} alt={post.TITLE} />

      <div className={s['sidebar-post__info']}>
        <Link href={`/posts/${post.SLUG}`}>
          <a className={s['sidebar-post__info__title']}>
            {post.TITLE}
          </a>
        </Link>

        <br />

        <span className={s['sidebar-post__info__updated_at']}>
          {dayjs(post.UPDATED_AT).locale('pt-br').format('MMMM D, YYYY')}
        </span>
      </div>
    </div>
  );
}