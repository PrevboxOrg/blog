import s from './../styles/components/cta.module.scss';

export default function CTARequest () {
  return (
    <div className={s['cta']}>
      <p className={s['cta__title']}>Quer ter seu artigo publicado?</p>

      <form className={s['cta__form']}>
        <a className={s['cta__form__submit']} href={'/escrever-artigo'}>Escreva seu artigo agora</a>
      </form>
    </div>
  );
}
