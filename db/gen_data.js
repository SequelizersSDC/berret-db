const fs = require('fs')
const faker = require('faker')
const argv = require('yargs')
const path = require('path')
const Sequelize = require('sequelize')

const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const lines = argv.lines || 10000000
const prodStream = fs.createWriteStream(path.join(__dirname, 'data', 'products.csv'))
const picStream = fs.createWriteStream(path.join(__dirname, 'data', 'photos.csv'))
const sizeStream = fs.createWriteStream(path.join(__dirname, 'data', 'size.csv'))
const colorStream = fs.createWriteStream(path.join(__dirname, 'data', 'color.csv'))
const cJoinStream = fs.createWriteStream(path.join(__dirname, 'data', 'color_joins.csv'))
const sJoinStream = fs.createWriteStream(path.join(__dirname, 'data', 'size_joins.csv'))

const createProduct = (prodNum) => {
  const name = faker.commerce.productName();
  const item_num = prodNum;
  const avg_rating = randomNum(1, 5);
  const brand = faker.company.companyName(1);
  const num_ratings = randomNum(1, 2000);
  const price = faker.commerce.price(20, 200, 2, '$')

  return `${name},${brand},${item_num},${avg_rating},${num_ratings},${price}\n`
}

const createColors = () => {
  let colors = ['orange', 'white', 'tan', 'violet', 'plum', 'gold', 'grey', 'indigo', 'silver', 'purple']
  let colorSeed = ''
  for (var i = 0; i < colors.length; i++) {
    let price_diff = randomNum(5, 50)
    let color = colors[i]
    colorSeed += `${color},${price_diff}\n`
  }
  return colorSeed
}

const createSizes = () => {
  const sizes = ['5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
  let sizesSeed = ''
  for (var i = 0; i < sizes.length; i++) {
    let size = sizes[i]
    sizesSeed += `${size}\n`
  }
  return sizesSeed
}

const createPhotos = (prodNum) => {
  let thumb = faker.image.fashion(200, null, true);
  let small = faker.image.fashion(400, null, true);
  let regular = faker.image.fashion(1080, null, true);
  let raw = faker.image.fashion(null, null, true);
  let prod_id = prodNum

  return `${prod_id},${thumb},${small},${regular},${raw}\n`
}

const color_join_table = (prodNum) => {
  let table = ''
  let colorOpt = randomNum(1, 5);
  for (var i = 1; i < colorOpt; i++) {
    var color_id = randomNum(1, 10);
    var prod_id = prodNum
    table += `${color_id},${prod_id}\n`
  }
  return table
}

const size_join_table = (prodNum) => {
  let table = ''
  let sizeOpt = randomNum(1, 5);
  for (var i = 1; i < sizeOpt; i++) {
    let size_id = randomNum(1, 10);
    let prod_id = prodNum
    table += `${size_id},${prod_id}\n`
  }
  return table
}

const writeSeeds = (writeStream, table, encoding, lines, done) => {
  let entries = lines;
  let prods = 1;
  let writing = () => {
    let canWrite = true
    do {
      entries--
      let entry = table(prods)
      prods++
      if (entries === 0) {
        writeStream.write(entry, encoding, done)
      } else {
        canWrite = writeStream.write(entry, encoding)
      }
    } while(entries > 0 && canWrite)
    if (entries > 0 && !canWrite) {
      writeStream.once('drain', writing);
    }
  }
  writing()
  return
}

prodStream.write(`name,brand,item_num,avg_rating,num_ratingss,price\n`)
picStream.write(`prod_id,thumb,small,regular,raw\n`)
sizeStream.write(`size\n`)
colorStream.write(`color,price_diff\n`)
cJoinStream.write(`color_id,prod_id\n`)
sJoinStream.write(`size_id,prod_id\n`)

writeSeeds(prodStream, createProduct, 'utf-8', lines, () => {
  prodStream.end()
  console.log('Product writes complete.')
})
writeSeeds(picStream, createPhotos, 'utf-8', lines, () => {
  picStream.end()
  console.log('Photos writes complete.')
})
writeSeeds(sizeStream, createSizes, 'utf-8', 1, () => {
  sizeStream.end()
  console.log('Sizes writes complete.')
})
writeSeeds(colorStream, createColors, 'utf-8', 1, () => {
  colorStream.end()
  console.log('Colors writes complete.')
})
writeSeeds(cJoinStream, color_join_table, 'utf-8', lines, () => {
  cJoinStream.end()
  console.log('Color_join writes complete.')
})
writeSeeds(sJoinStream, size_join_table, 'utf-8', lines, () => {
  sJoinStream.end()
  console.log('size_join writes complete.')
})


// async function writeAll() {
//   await writeSeeds(prodStream, createProduct, 'utf-8', lines, () => {
//     prodStream.end()
//   })
//   await writeSeeds(picStream, createPhotos, 'utf-8', lines, () => {
//     picStream.end()
//   })
//   await writeSeeds(sizeStream, createSizes, 'utf-8', 1, () => {
//     sizeStream.end()
//   })
//   await writeSeeds(colorStream, createColors, 'utf-8', 1, () => {
//     colorStream.end()
//   })
//   await writeSeeds(cJoinStream, color_join_table, 'utf-8', lines, () => {
//     cJoinStream.end()
//   })
//   await writeSeeds(sJoinStream, size_join_table, 'utf-8', lines, () => {
//     sJoinStream.end()
//     console.log('All writes complete.')
//   })
//   return
// }

// writeAll()
