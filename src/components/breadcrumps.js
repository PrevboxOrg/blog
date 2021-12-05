import Link from 'next/link';
import cn from 'classnames';
import s from './../styles/components/breadcrumps.module.scss';

export default function Breadcrumps ({ breadcrumps, top }) {
  return (
    <div className={cn({
      [s['breadcrumps']]: true,
      [s['breadcrumps--top']]: top
    })}>
      {breadcrumps.map((breadcrump, index) => {
        return (
          <Link href={breadcrump.href} key={`breadcrumps-item-${index}`}>
            <a className={s['breadcrumps__item']}>
              {breadcrump.text}
            </a>
          </Link>
        );
      })}
    </div>
  );
}