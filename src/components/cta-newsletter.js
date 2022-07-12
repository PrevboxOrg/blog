import s from './../styles/components/cta.module.scss';

export default function CTANewsletter () {
  return (
    <div className={s['cta']}>
      <p className={s['cta__title']}>Não perca nenhum conteúdo valioso</p>
      <span className={s['cta__subtitle']}>Deixa o seu e-mail e receba notícias</span>

      <form className={s['cta__form']}>
        <input className={s['cta__form__input']} type="text" placeholder={'prevbox@email.com.br'} />

        <button className={s['cta__form__submit']}>Enviar</button>
      </form>
    </div>
  );
}
