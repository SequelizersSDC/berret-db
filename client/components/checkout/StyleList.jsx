import React from 'react';
import styles from '../../styles/checkout/Style.module.css';

import Style from './Style.jsx';

const StyleList = (props) => {
  let color = props.current_style.color || "";
  color = color.split(" ").map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(" ");

  return (
    <div className={styles.style_list}>
      <span className={styles.style_text}>Color : {color}</span>
      {props.styles.map(style => {
        return (
          <Style style={style} current_style={props.current_style} key={style.id} clickStyle={props.clickStyle} info={props.info}/>
        );
      })}
    </div>
  );
}

export default StyleList;