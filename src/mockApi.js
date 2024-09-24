// mockApi.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Mock a GET request to fetch the list of items
mock.onGet('/api/muddamaal').reply(200, [
  {
    id: 1,
    crimeNo: 'Guj.C.C.68/15',
    crimeDate: '27-02-2015',
    muddamaalNo: '32/15',
    category: 'Other',
    quantity: 2,
    value: 0,
    status: 'In Police Custody',
    custodyDate: '03/02/2024 13:17',
  },
  {
    id: 2,
    crimeNo: 'Guj.C.C.44/15',
    crimeDate: '27-02-2015',
    muddamaalNo: '31/15',
    category: 'Other',
    quantity: 2,
    value: 0,
    status: 'In Police Custody',
    custodyDate: '03/02/2024 13:14',
  },
]);

// Mock a POST request to add a new item
mock.onPost('/api/muddamaal').reply(config => {
  const newRecord = JSON.parse(config.data);
  return [200, newRecord];
});

export default axios;
