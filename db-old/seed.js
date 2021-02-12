const faker = require('faker');
const Model = require('./model.js');
const photoBank = require('./data/photos.json');

const NUM_ITEMS = 100;

function rI(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateItems = (numItems) => {
  let items = [];
  for (let item_id = 0; item_id < NUM_ITEMS; item_id++) {
    let item = {
      item_id: item_id + 1,
      name: faker.commerce.productName(),
      brand: faker.company.companyName(),
      avg_rating: rI(25, 50),
      num_ratings: rI(10, 200)
    }
    items.push(item);
  }
  return items;
}

const generateStyles = (items) => {
  let styles = [];
  let style_id = 0;
  for (let item of items) {
    let numStyles = rI(1, 5);
    for (let i = 0; i < numStyles; i++) {
      style_id++;
      let style = {
        style_id: style_id,
        color: faker.commerce.color(),
        price: rI(2000, 20000),
        item_id: item.item_id
      };
      styles.push(style);
    }
  }
  return styles;
}

const generatePhotos = (styles) => {
  let photos = [];
  let photo_id = 0;
  for (let style of styles) {
    let numPhotos = rI(4, 12);
    for (let i = 0; i < numPhotos; i++) {
      photo_id++;
      let randomPhoto = photoBank[rI(0, 37)];
      let photo = {
        photo_id: photo_id,
        url_thumbnail: randomPhoto.urls.thumb,
        url_regular: randomPhoto.urls.regular,
        url_full: randomPhoto.urls.full,
        c_i: i,
        style_id: style.style_id,
        item_id: style.item_id
      }
      photos.push(photo);
    }
  }
  return photos;
}

const generateSizes = (styles) => {
  let sizes = [];
  let size_id = 0;
  for (let style of styles) {
    let numSizes = rI(5, 9);
    let sizeSet = new Set();
    for (let i = 0; i < numSizes; i++) {
      sizeSet.add(rI(7, 14));
    }
    for (let s of sizeSet) {
      size_id++;
      let size = {
        size_id: size_id,
        size: s,
        style_id: style.style_id,
        item_id: style.item_id
      }
      sizes.push(size);
    }
  }
  return sizes;
}

const m = new Model();

const addItems = (items) => {
  let iP = [];
  for (let item of items) {
    iP.push(m.addItem(item.name, item.brand, item.avg_rating, item.num_ratings));
  }
  return Promise.all(iP);
}

const addStyles = (styles) => {
  let sP = [];
  for (let style of styles) {
    sP.push(m.addStyle(style.color, style.price, style.item_id));
  }
  return Promise.all(sP);
}

const addPhotos = (photos) => {
  let pP = [];
  for (let photo of photos) {
    pP.push(m.addPhoto(photo.url_thumbnail, photo.url_regular, photo.url_full, photo.c_i, photo.style_id, photo.item_id));
  }
  return Promise.all(pP);
}

const addSizes = (sizes) => {
  let sP = [];
  for (let size of sizes) {
    sP.push(m.addSize(size.size, size.style_id, size.item_id));
  }
  return Promise.all(sP);
}

const randomItems = generateItems(NUM_ITEMS);
const randomStyles = generateStyles(randomItems);
const randomPhotos = generatePhotos(randomStyles);
const randomSizes = generateSizes(randomStyles);

  m.connect()
  .then(() => m.dropDatabase())
  .then(() => m.createSchema())
  .catch(() => m.createSchema())
  .then(() => addItems(randomItems))
  .then(() => addStyles(randomStyles))
  .then(() => addPhotos(randomPhotos))
  .then(() => addSizes(randomSizes))
  .then(() => m.endConnection());

