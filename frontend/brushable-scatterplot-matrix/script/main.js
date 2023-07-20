// Copyright 2022 Takanori Fujiwara.
// Released under the BSD 3-Clause 'New' or 'Revised' License

import {
  brushableScatterplotMatrix
} from './chart.js';

const dataSet = async function getData() {
  return await axios.get('/api/data/penguins', {
    baseURL: 'http://127.0.0.1:3000'
  });
};

var data = JSON.parse(JSON.stringify((await dataSet()).data));

const chart = brushableScatterplotMatrix(data);

d3.select('body').append(() => chart);