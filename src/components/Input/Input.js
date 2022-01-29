import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import style from './Input.module.css';

function Input(props) {
  const { mask, name, onAdd, onChangeInput, phoneArray, value } = props;

  const getRegexp = mask => {
    const result = new RegExp(mask.replace(/9/g, '\\d'));

    return result;
  };

  const regexp = useMemo(() => getRegexp(mask), [mask]);

  const [status, setStatus] = useState();

  const filterRange = value => {
    const newValue = value.replace(/\D/g, '');

    const filter = phoneArray.filter(item => item.startsWith(newValue));

    return filter;
  };

  const handleChange = event => {
    onChangeInput(event.target.value);

    const filter = filterRange(event.target.value);

    if (!regexp.test(event.target.value)) {
      setStatus('error');
    } else if (filter.length === 0) {
      setStatus('alert');
    } else {
      setStatus();
    }
  };

  const renderSearch = () => {
    const filter = filterRange(value);

    return filter.map((item, index) => {
      return (
        <li key={index} className={style.searchItem}>
          {item}
        </li>
      );
    });
  };

  const [listDisplay, setlistDisplay] = useState(true);

  const handleFocus = () => {
    setlistDisplay(false);
  };

  const handleBlur = () => {
    setlistDisplay(true);
  };

  const handleAdd = () => {
    onAdd();
    setStatus();
  };

  return (
    <>
      <div className={style.wrapInput}>
        <input
          autoComplete="off"
          className={classnames(style.input, {
            [style.inputError]: status === 'error',
            [style.noMatches]: status === 'alert',
          })}
          id={name}
          name={name}
          placeholder={mask}
          type="phone"
          value={value}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <ul
          className={classnames(style.searchList, {
            [style.hide]: listDisplay,
          })}
        >
          {renderSearch()}
        </ul>
      </div>
      <button
        className={style.button}
        disabled={!regexp.test(value) || !(status === 'alert')}
        type="button"
        onClick={handleAdd}
      >
        Добавить
      </button>
    </>
  );
}

Input.propTypes = {
  mask: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  phoneArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
};

Input.defaultProps = {
  value: '',
};

export default Input;
