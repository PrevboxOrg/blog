import s from './../styles/components/footer.module.scss';

export default function Footer () {
  return (
    <div className={`${s['footer']} main-wrapper`}>
      <div className={s['footer__wrapper']}>
        <img
          className={s['footer__logo']}
          src={'/logo.png'} alt={'Prevbox'} />

        <p className={s['footer__info']}>
          Copyright © 2021 Prevbox. Todos os direitos reservados.
        </p>
      </div>

      <div className={s['footer__wrapper']}>
        <ul className={s['footer__menu']}>
          <li>
            <a className={s['footer__menu__item']} href={'/#principais'}>
              Principais
            </a>
          </li>
          <li>
            <a className={s['footer__menu__item']} href={'/#mais-vistos'}>
              Mais vistos
            </a>
          </li>
        </ul>

        <div className={s['footer__social']}>
          <a className={s['footer__social__item']} href={'https://www.facebook.com/prevbox'} target={'_blank'} rel={'noreferrer'} >
            <img src={'/footer/facebook.svg'} alt={'Facebook'} />
          </a>
          <a className={s['footer__social__item']} href={'https://www.instagram.com/prevbox/'} target={'_blank'} rel={'noreferrer'} >
            <img src={'/footer/instagram.svg'} alt={'Instagram'} />
          </a>
          <a className={s['footer__social__item']} href={'https://www.youtube.com/channel/UCYtOIsYSkjklUAECq2Nmg1Q'} target={'_blank'} rel={'noreferrer'} >
            <img src={'/footer/youtube.svg'} alt={'Youtube'} />
          </a>
        </div>
      </div>
    </div>
  );
}
