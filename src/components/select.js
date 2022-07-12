import s from './../styles/components/select.module.scss';

import ArrowSVG from './../../public/components/select/arrow.svg';
import { useState } from 'react';

export default function Select ({ placeholder, items, onSelectClick }) {
  const [selected, setSelected] = useState(null);

  function select (item) {
    setSelected(item);
    if (onSelectClick) { onSelectClick(item); }
  }

  return (
    <div className={s['select']}>
      <div className={s['select__placeholder']}>
        <span className={s['select__placeholder__text']}>
          {selected ? selected.TEXT : placeholder}
        </span>
        <ArrowSVG />
      </div>

      <ul className={s['select__items']}>
        <li
          className={s['select__items__item']}
          onClick={() => select(null)}>
          Nenhum/a
        </li>

        {items.map((item, index) => {
          return (
            <li
              key={`select-item-${item.VALUE}-${index}`}
              className={s['select__items__item']}
              onClick={() => select(item)}>
              {item.TEXT}
            </li>
          );
        })}
      </ul>
    </div>
  );
}