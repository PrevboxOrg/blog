import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import cn from 'classnames';
import s from './../styles/components/header.module.scss';

import CloseSVG from './../../public/icons/close.svg';

export default function Header () {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const onSearchKeyDown = (event) => {
    if (event.key === 'Enter') {
      router.push({
        pathname: '/posts',
        query: { nome: event.target.value }
      });
    }
  };

  return <>
    <div className={cn({
      [s['header']]: true,
      [s['header--active']]: active
    })}>
      <Link href={'/'} passHref>
        <img
          className={s['header__logo']}
          src={'/logo.png'} alt={'Prevbox'} />
      </Link>

      <ul className={s['header__menu']}>
        <li>
          <a className={s['header__menu__item']} href={'/#principais'}>
            Principais
          </a>
        </li>

        <li>
          <a className={s['header__menu__item']} href={'/#mais-vistos'}>
            Mais vistos
          </a>
        </li>

        <li>
          <a className={s['header__menu__item']} href={'/escrever-artigo'}>
            Escrever artigo
          </a>
        </li>

        <li>
          <a className={s['header__menu__item']} onClick={() => setSearchActive(!searchActive)}>
            Pesquisar
          </a>
        </li>
      </ul>

      <button className={s['header__mobile-button']} onClick={() => setActive(!active)}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    </div>

    <div className={cn({
      [s['search']]: true,
      [s['search--active']]: searchActive
    })}>
      <div className={s['search__wrapper']}>
        <input className={s['search__input']} type="text" placeholder='Pesquisar' onKeyDown={onSearchKeyDown} />

        <button className={s['search__close']} onClick={() => setSearchActive(!searchActive)}>
          <CloseSVG />
        </button>
      </div>

      <div className={s['search__background']} onClick={() => setSearchActive(!searchActive)}></div>
    </div>
  </>;
}
