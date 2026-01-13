import React from 'react';
import styles from './CustomRadioButton.module.css';

const CustomRadioButton = ({ colors, color, handleColor }) => {
  const inputId = `radio-${colors?.name}`;

  return (
    <div className={styles.radiobuttonDiv}>
      <label htmlFor={inputId} className={styles.radioLabel}>
        <input
          id={inputId}
          type="radio"
          className={styles.radioInput}
          name="color-selection"
          value={colors?.name}
          checked={color === colors?.name}
          onChange={handleColor}
        />
        <span
          className={styles.customRadio}
          style={{ '--color': colors?.code }}
        />
        {colors?.name}
      </label>
    </div>
  );
};

export default CustomRadioButton;
