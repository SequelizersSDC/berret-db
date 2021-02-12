import React from 'react';
import styles from '../../styles/checkout/Stars.module.css';
import empty_star from '../../assets/empty_star.png';
import full_star from '../../assets/full_star.png';

const Stars = (props) => {
  let rating = props.avg_rating;
  let fills = [];
  let fill;
  while (rating > 0) {
    if (rating > 1) {
      rating--;
      fill = 1;
    } else {
      fill = rating;
      rating--;
    }
    fills.push(fill);
  }

  return (
    <span className={styles.star_wrapper}>
      {[1, 2, 3, 4, 5].map(n => {
        let fill = fills.shift();
        if (fill === 1) {
          return (
            <img className={styles.full_star} src={full_star} key={n + "f"}/>
          )
        } else if (fill === undefined) {
          return (
            <img className={styles.empty_star} src={empty_star} key={n + "e"}/>
          )
        } else if (fill < 1) {
          let width = fill * 18;
          return (
            <div className={styles.partial_star_container} key={n + "p"}>
              <img className={styles.partial_star_empty} src={empty_star}/>
              <div className={styles.fill_container} style={{width: width + 'px'}}>
                <img className={styles.partial_star_fill} src={full_star}/>
              </div>
            </div>
          )
        }

      })}
    </span>
  );
}

export default Stars;