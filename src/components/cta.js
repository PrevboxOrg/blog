import s from './../styles/components/cta.module.scss';
import c from './../contents/components/cta.json';

export default function CTA () {
  return (
    <div className={s['cta']}>
      <p className={s['cta__title']}>{c['TITLE']}</p>
      <span className={s['cta__subtitle']}>{c['SUBTITLE']}</span>

      <form className={s['cta__form']}>
        <input className={s['cta__form__input']} type="text" placeholder={c['INPUT_PLACEHOLDER']} />

        <button className={s['cta__form__submit']}>{c['SUBMIT_BUTTON']}</button>
      </form>
    </div>
  );
}
