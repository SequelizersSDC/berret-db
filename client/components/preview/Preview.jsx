import React from 'react';
import styles from '../../styles/preview/Preview.module.css';

const Preview = (props) => {
  let current_photos = props.photos.filter(photo => photo.style_id === props.current_style.id);

  let photo = current_photos[props.c_i] || {url_regular: 'https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg'};

  return (
    <div
      className={styles.preview}
      style={{
        backgroundImage: `url(${photo.url_regular})`,
        visibility: props.preview,
        backgroundPosition: `-${props.posX}px -${props.posY}px`
      }}
    ></div>
  )
}

export default Preview;