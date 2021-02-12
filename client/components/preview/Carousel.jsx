import React from 'react';
import styles from '../../styles/preview/Carousel.module.css';

const Carousel = (props) => {
  return (
    <div className={styles.grid}>
      <button className={styles.button} onClick={props.carouselScrollLeft}>{'<'}</button>
      <div id="carousel" className={styles.wrapper}>
        {props.photos.map((photo, index) => {
        let image_container_style;
        if (index == props.c_i) {
          image_container_style = styles.image_container_selected;
        } else {
          image_container_style = styles.image_container_unselected;
        }
          return (
            <div className={image_container_style} key={index} onClick={() => props.clickCarouselImage(index)}>
              <img className={styles.image} src={photo.url_thumbnail}/>
            </div>
          )
        }
        )}
      </div>
      <button className={styles.button} onClick={props.carouselScrollRight}>{'>'}</button>
    </div>
  );
}

export default Carousel;