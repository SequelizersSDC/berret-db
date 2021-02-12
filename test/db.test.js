const MySql = require('mysql');
const Promise = require('bluebird');

const connection = MySql.createConnection({
  host: 'localhost',
  user: 'student',
  password: 'student'
})

const db = Promise.promisifyAll(connection, { multiArgs: true });


beforeAll(() => {
  return db.connectAsync()
    .then(result => {
      console.log('MySQL: connected as id' + db.threadId);
    })
    .catch(err => {
      console.log(err);
    })
})

afterAll(() => {
  return db.endAsync();
})

test('sanity check', () => {
  expect(1).toBe(1);
});

test('the fec database should exist', () => {
  let queryString = `
    select * from information_schema.schemata
    where schema_name='fec'
  `;
  return db.queryAsync(queryString)
    .then(result => {
      expect(result[0].length).toBe(1);
    });
});

test('fec should have a items table', () => {
  let queryString = `
    select * from information_schema.tables
    where table_name='items'
    and table_schema='fec'
  `;
  return db.queryAsync(queryString)
    .then(result => {
      expect(result[0].length).toBe(1);
    });
});

test('fec should have a styles table', () => {
  let queryString = `
    select * from information_schema.tables
    where table_name='items'
    and table_schema='fec'
  `;
  return db.queryAsync(queryString)
    .then(result => {
      expect(result[0].length).toBe(1);
    });
});

test('fec should have a sizes table', () => {
  let queryString = `
    select * from information_schema.tables
    where table_name='sizes'
    and table_schema='fec'
  `;
  return db.queryAsync(queryString)
    .then(result => {
      expect(result[0].length).toBe(1);
    });
});

test('fec should have a photos table', () => {
  let queryString = `
    select * from information_schema.tables
    where table_name='photos'
    and table_schema='fec'
  `;
  return db.queryAsync(queryString)
    .then(result => {
      expect(result[0].length).toBe(1);
    });
});