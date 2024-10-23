// mockApi.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create a mock instance
const mock = new MockAdapter(axios, { delayResponse: 500 });

// Initialize an array to store all muddamaal items
let muddamaalData = [
  {
    id: 1,
    foldNo: 'Gu.2.No.S.-68/15',                  // Changed from crimeNo to foldNo
    dateOfSeizure: '27-02-2015',                  // Changed from crimeDate to dateOfSeizure
    subjectNo: '32/15',                           // Changed from muddamaalNo to subjectNo
    quantity: 2,
    price: '0',                               // New price field
    presentStatusOfIssue: 'P.O. Stay. at',       // New presentStatusOfIssue field
    policeStation: 'Station A',                   // New policeStation field
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:17',
    subjectType: 'Currency',                      // Changed from muddamaal type to subject type
    details: '1. A bamboo stick 2. A captured washer',
  },
  {
    id: 2,
    foldNo: 'Gu.2.No.E.-44/15',
    dateOfSeizure: '27-02-2015',
    subjectNo: '31/15',
    quantity: 2,
    price: '0',
    presentStatusOfIssue: 'P.O. Stay. at',
    reasonOfImpounding:'', 
    policeStation: 'Station B',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:17',
    subjectType: 'Currency',
    details: '1. A bamboo stick 2. An iron poly pipe',
  },
  {
    id: 3,
    foldNo: 'Gu.2.No.S.-64/15',
    dateOfSeizure: '25-02-2015',
    subjectNo: '30/15',
    subjectType: 'vehicle',
    quantity: 1,
    price: '25000',
    reasonOfImpounding:'Crime Work',
    presentStatusOfIssue: 'has been returned',
    policeStation: 'Station C',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:14',
    details: 'One white color access car GJ-18-Shirikaya-4678',
  },
  {
    id: 4,
    foldNo: 'Gu.2.No.S.-29/15',
    dateOfSeizure: '24-02-2015',
    subjectNo: '29/15',
    subjectType: 'other',
    quantity: 2,
    price: '2',
    reasonOfImpounding:'', 
    presentStatusOfIssue: 'P.O. Stay. at',
    policeStation: 'Station D',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:14',
    details: '1. A torn book written for a cricket betting deal 2. A ballpoint pen',
  },
  {
    id: 5,
    foldNo: 'Gu.2.No.S.-29/15',
    dateOfSeizure: '24-02-2015',
    subjectNo: '29/15',
    subjectType: 'Currency',
    quantity: 2,
    price: '400',
    reasonOfImpounding:'', 
    presentStatusOfIssue: 'P.O. Stay. at',
    policeStation: 'Station E',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:14',
    details: 'Three notes of 10, 2. Three notes of 100, 1 note of 50 and 2 notes of 10',
  },
  {
    id: 6,
    foldNo: 'Gu.2.No.S.-29/15',
    dateOfSeizure: '24-02-2015',
    subjectNo: '29/15',
    subjectType: 'Mobile and Electronic Equipment',
    quantity: 8,
    price: '55500',
    reasonOfImpounding:'', 
    presentStatusOfIssue: 'has been returned',
    policeStation: 'Station F',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:14',
    details: `1. A phone of Samsung 2. A phone of Intel 3. A phone of Intelco 
              4. A phone of Intel 5. A phone of Nokia 6. A phone of Nokia 
              7. A phone of Nokia 8. A TV of Panasonic company`,
  },
  {
    id: 7,
    foldNo: 'Gu.2.No.E.-231/14',
    dateOfSeizure: '22-02-2015',
    subjectNo: '28/15',
    subjectType: 'vehicle',
    quantity: 1,
    price: '20000',
    presentStatusOfIssue: 'has been returned',
    policeStation: 'Station G',
    custodyLog: 'Custody Log',
    custodyDate: '03/02/2024 13:07',
    details: 'A Mo. Cycle GJ-18-AD-6162',
    officerName:'Ramesh Singh',
    reasonOfImpounding:'Crime Work'
  }
];

// Mock the GET request to fetch the list of items
mock.onGet('/api/muddamaal').reply(200, muddamaalData);

// Mock a POST request to add a new item
mock.onPost('/api/muddamaal').reply(config => {
  const newRecord = JSON.parse(config.data);
  newRecord.id = muddamaalData.length + 1; // Automatically assign a new ID
  muddamaalData.push(newRecord); // Append the new record to the existing data

  return [200, newRecord]; // Respond with the newly added record
});

export default axios;
