import React from 'react';
import styles from '../../styles/checkout/Add.module.css';

const Add = (props) => {
  let price = props.current_style.price || '';
  price = price.toString();
  price = parseFloat(price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2, price.length)).toFixed(2);

  return (
    <div>
      <div className={styles.fulfillment_container}>
        <div className={styles.fulfillment_option}>
          <input className={styles.radio} type="radio" id="fulfillment1" name="fulfillment"></input>
          <label className={styles.fulfillment_text} htmlFor="fulfillment1">Ship to address</label>
        </div>
        <div className={styles.fulfillment_option}>
          <input className={styles.radio} type="radio" id="fulfillment2" name="fulfillment"></input>
          <label className={styles.fulfillment_text} htmlFor="fulfillment2">Pick up at store</label>
        </div>
        <span className={styles.find_store}>Find a store near you</span>
      </div>

      <div className={styles.add_to_list_container}>
        <button className={styles.cart_button}>Add to cart - ${price}</button>
        <div className={styles.wish_registry_container}>
          <button className={styles.wish_registry_button}>Add to wish list</button>
          &nbsp;&nbsp;
          <button className={styles.wish_registry_button}>Add to registry</button>
        </div>
      </div>
    </div>
  );
}

export default Add;