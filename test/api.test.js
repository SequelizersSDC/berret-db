const axios = require('axios');
jest.mock('../server/server.js');


beforeEach(() => {
// tried spinning up server instances but unreturned promises and async callbacks made it impossible
});


test('sanity check', () => {
  expect(1).toBe(1);
});