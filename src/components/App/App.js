import React, { useState } from 'react';

import Input from '../Input';

import style from './App.module.css';

function App() {
  const [phoneNumbers, setPhoneNumbers] = useState([
    '9012345678',
    '9876543210',
    '9555555555',
    '9876555555',
  ]);

  const [value, setValue] = useState('');

  const handleChangeInput = value => {
    setValue(value);
  };

  const handleAdd = () => {
    const newValue = value.replace(/\D/g, '');

    setPhoneNumbers([...phoneNumbers, newValue]);
    setValue('');
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <Input
          mask="999-999-99-99"
          name="phone"
          phoneArray={phoneNumbers}
          value={value}
          onAdd={handleAdd}
          onChangeInput={handleChangeInput}
        />
      </form>
    </div>
  );
}

export default App;
