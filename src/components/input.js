import s from './../styles/components/input.module.scss';

export default function Input ({ placeholder, icon, onChange }) {
  return (
    <div className={s['input']}>
      {icon && <img src={icon} alt={'Icon'} />}

      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
}