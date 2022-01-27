import React from 'react';

import Datalist from '../Datalist/Datalist';
import Input from '../Input';

import style from './App.module.css';

function App() {
  return (
    <div className={style.container}>
      <form className={style.form}>
        <Input />
        <Datalist />
        <button className={style.button} type="button">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default App;
