import Link from 'next/link';
import { useState } from 'react';
import cn from 'classnames';
import s from './../styles/components/header.module.scss';
import c from './../contents/components/header.json';

export default function Header () {
  const [active, setActive] = useState(false);

  return (
    <div className={cn({
      [s['header']]: true,
      [s['header--active']]: active
    })}>
      <img
        className={s['header__logo']}
        src={c['LOGO']} alt={c['LOGO_ALT']} />

      <ul className={s['header__menu']}>
        {c['MENU'].map((menuItem, index) => {
          return (
            <li key={`header-menu-item-${index}`}>
              <Link href={menuItem.LINK}>
                <a className={s['header__menu__item']} target={menuItem.EXTERNAL ? '_blank' : '_self'}>
                  {menuItem.TEXT}
                </a>
              </Link>
            </li>
          );
        })}

        <li>
          <button className={s['header__menu__login-button']}>
            {c['LOGIN_BUTTON']}
          </button>
        </li>
      </ul>

      <button className={s['header__mobile-button']} onClick={() => setActive(!active)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>
  );
}
