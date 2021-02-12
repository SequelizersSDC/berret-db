import React from 'react';
import styles from '../../styles/checkout/Style.module.css';

const Style = (props) => {
  let priceArr = props.info.price.split('$');
  let price = priceArr[1]
  // price = parseFloat(price.slice(0, price.length - 2) + '.' + price.slice(price.length - 2, price.length)).toFixed(2);

  let square_style;
  if (props.style.id === props.current_style.id) {
    square_style = styles.square_selected;
  } else {
    square_style = styles.square_unselected;
  }

  return (
    <span className={styles.style_container}>
      <span className={styles.price_text}>${price}</span>
      <div className={square_style} style={{background: props.style.color}} onClick={() => props.clickStyle(props.style)}></div>
    </span>
  );
}

export default Style;