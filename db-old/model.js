const db = require('./db.js');
const database = 'item_preview_checkout';

class Model {

  addItem(name, brand, avg_rating, num_ratings) {
    let values = [name, brand, avg_rating, num_ratings];
    let queryString = `
      INSERT INTO items (name, brand, avg_rating, num_ratings)
      VALUES (?, ?, ?, ?)
    `;
    return db.queryAsync(queryString, values);
  }

  getItem(item_id) {
    let queryString = `SELECT * FROM items WHERE id = ?`;
    return db.queryAsync(queryString, item_id);
  }

  addStyle(color, price, item_id) {
    let values = [color, price, item_id];
    let queryString = `
      INSERT INTO styles (color, price, item_id)
      VALUES (?, ?, ?)
    `;
    return db.queryAsync(queryString, values);
  }

  getStyles(item_id) {
    let queryString = `SELECT * FROM styles WHERE item_id = ?`;
    return db.queryAsync(queryString, item_id);
  }

  addSize(size, style_id, item_id) {
    let values = [size, style_id, item_id];
    let queryString = `
      INSERT INTO sizes (size, style_id, item_id)
      VALUES (?, ?, ?)
    `;
    return db.queryAsync(queryString, values);
  }

  getSizes(item_id) {
    let queryString = `SELECT * FROM sizes WHERE item_id = ?`
    return db.queryAsync(queryString, item_id);
  }

  addPhoto(url_thumbnail, url_regular, url_full, c_i, style_id, item_id) {
    let values = [url_thumbnail, url_regular, url_full, c_i, style_id, item_id];
    let queryString = `
      INSERT INTO photos (url_thumbnail, url_regular, url_full, c_i, style_id, item_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    return db.queryAsync(queryString, values);
  }

  getPhotos(item_id) {
    let queryString = `SELECT * FROM photos WHERE item_id = ?`
    return db.queryAsync(queryString, item_id);
  }

  dropDatabase() {
    return db.queryAsync(`DROP DATABASE ${database}`);
  }

  createSchema() {
    return db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`)
      .then(() => db.queryAsync(`USE ${database}`))
      .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS items (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          brand VARCHAR(50),
          avg_rating CHAR(2),
          num_ratings INT
        )
      `))
      .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS styles (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          color VARCHAR(20),
          price INT,
          item_id INT,
          FOREIGN KEY (item_id) REFERENCES items(id)
        )
      `))
      .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS sizes (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          size VARCHAR(10),
          style_id INT,
          item_id INT,
          FOREIGN KEY (style_id) REFERENCES styles(id),
          FOREIGN KEY (item_id) REFERENCES items(id)
        )
      `))
      .then(() => db.queryAsync(`
        CREATE TABLE IF NOT EXISTS photos (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          url_thumbnail VARCHAR(255),
          url_regular VARCHAR(255),
          url_full VARCHAR(255),
          c_i INT,
          style_id INT,
          item_id INT,
          FOREIGN KEY (style_id) REFERENCES styles(id),
          FOREIGN KEY (item_id) REFERENCES items(id)
        )
      `))
  }

  useDB() {
    return db.queryAsync(`USE ${database}`);
  }

  connect() {
    return db.connectAsync()
      .then(result => {
        console.log('MySQL: connected as id' + db.threadId);
      })
      .catch(err => {
        console.log(err);
      });
  }

  endConnection() {
    return db.endAsync();
  }
}

module.exports = Model;