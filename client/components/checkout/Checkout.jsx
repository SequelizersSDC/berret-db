import React from 'react';
import styles from '../../styles/checkout/Checkout.module.css';

import Preview from '../preview/Preview.jsx';

import ItemInfo from './ItemInfo.jsx';
import StyleList from './StyleList.jsx';
import SizeList from './SizeList.jsx';
import Quantity from './Quantity.jsx';
import Add from './Add.jsx';

const Checkout = (props) => {
  return (
    <div className={styles.container}>

      <Preview photos={props.photos} c_i={props.c_i} current_style={props.current_style} preview={props.preview} posX={props.posX} posY={props.posY}/>

      <ItemInfo info={props.info} avg_rating={props.avg_rating} num_ratings={props.num_ratings} styles={props.styles}/>

      <div className={styles.item_selector}>
        <StyleList current_style={props.current_style} styles={props.styles} clickStyle={props.clickStyle} info={props.info}/>
        <SizeList current_style={props.current_style} current_size={props.current_size} sizes={props.sizes} clickSize={props.clickSize}/>
        <Quantity quantity={props.quantity} decQuantity={props.decQuantity} incQuantity={props.incQuantity} changeQuantity={props.changeQuantity}/>
      </div>

      <hr className={styles.hr}/>

      <Add current_style={props.current_style}/>

      <div className={styles.return_policy}>REI return policy</div>
    </div>
  );
}

export default Checkout;