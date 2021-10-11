import Link from 'next/link';
import s from './../styles/components/footer.module.scss';
import c from './../contents/components/footer.json';

export default function Footer () {
  return (
    <div className={`${s['footer']} main-wrapper`}>
      <div className={s['footer__wrapper']}>
        <img
          className={s['footer__logo']}
          src={c['LOGO']} alt={c['LOGO_ALT']} />

        <p className={s['footer__info']}>
          {c['INFO_1']} <br />
          {c['INFO_2']}
        </p>
      </div>

      <div className={s['footer__wrapper']}>
        <ul className={s['footer__menu']}>
          {c['MENU'].map((menuItem, index) => {
            return (
              <li key={`footer-menu-item-${index}`}>
                <Link href={menuItem.LINK}>
                  <a className={s['footer__menu__item']} target={menuItem.EXTERNAL ? '_blank' : '_self'}>
                    {menuItem.TEXT}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={s['footer__social']}>
          {c['SOCIAL'].map((socialItem, index) => {
            return (
              <Link href={socialItem.LINK} key={`social-item-${index}`}>
                <a className={s['footer__social__item']} target={'_blank'}>
                  <img src={socialItem.IMAGE} alt={socialItem.IMAGE_ALT} />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
