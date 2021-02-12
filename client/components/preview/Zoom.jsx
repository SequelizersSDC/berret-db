import React from 'react';
import styles from '../../styles/preview/Zoom.module.css';

const Zoom = (props) => {
  let photo = props.photo || {url_regular: 'https://media.wired.com/photos/5f87340d114b38fa1f8339f9/master/w_1600%2Cc_limit/Ideas_Surprised_Pikachu_HD.jpg'};

  return (
      <div className={styles.container}>
        <img
          className={styles.image}
          src={photo.url_regular}
          onMouseMove={(e) => props.zoomIn(e)}
          onMouseOut={(e) => props.zoomOut(e)}
        />
      </div>
  );
}

export default Zoom;