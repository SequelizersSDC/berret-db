import React from 'react';
import styles from '../../styles/checkout/Quantity.module.css';

const Quantity = (props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>Quantity</span>
      <div className={styles.selector_container}>
        <button className={styles.button} onClick={() => props.decQuantity()}>-</button>
        <input className={styles.input} onChange={props.changeQuantity} value={props.quantity}></input>
        <button className={styles.button} onClick={() => props.incQuantity()}>+</button>
      </div>
    </div>
  );
}

export default Quantity;