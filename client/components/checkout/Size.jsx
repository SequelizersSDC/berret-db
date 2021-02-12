import React from 'react';
import styles from '../../styles/checkout/Size.module.css';

const Size = (props) => {
  let size_style;
  if (props.size === props.current_size) {
    size_style = styles.size_selected;
  } else {
    size_style = styles.size_unselected;
  }

  if (props.available) {
    return (
      <div className={size_style} style={{background: "white", cursor: "pointer"}} onClick={() => props.clickSize(props.size)}>{props.size}</div>
    )
  } else {
    return (
      <div className={size_style} style={{background: "lightgrey"}}>{props.size}</div>
    );
  }
}

export default Size;