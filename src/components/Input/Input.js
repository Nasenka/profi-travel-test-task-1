import React from 'react';

import style from './Input.module.css';

function Input() {
  return (
    <input
      className={style.input}
      list="datalistOptions"
      name="phone"
      placeholder="Телефон"
      type="phone"
    />
  );
}

export default Input;
