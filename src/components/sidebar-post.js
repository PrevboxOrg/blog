import Link from 'next/link';
import dayjs from 'dayjs';
import s from './../styles/components/sidebar-post.module.scss';

export default function SidebarPost ({ post }) {
  return (
    <div className={s['sidebar-post']}>
      <img className={s['sidebar-post__image']} src={`${post.imageUrl}`} alt={post.title} />

      <div className={s['sidebar-post__info']}>
        <Link href={`/posts/${post.slug}`}>
          <a className={s['sidebar-post__info__title']}>
            {post.title}
          </a>
        </Link>

        <br />

        <span className={s['sidebar-post__info__updated_at']}>
          {dayjs(post.updatedAt).locale('pt-br').format('MMMM D, YYYY')}
        </span>
      </div>
    </div>
  );
}