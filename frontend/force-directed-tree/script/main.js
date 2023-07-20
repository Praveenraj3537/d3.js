// Copyright 2022 Takanori Fujiwara.
// Released under the BSD 3-Clause 'New' or 'Revised' License

import {
  forceDirectedTree
} from './chart.js';

const dataSet = async function getData() {
  return await axios.get('/api/data/flare', {
    baseURL: 'http://127.0.0.1:3000'
  });
};

const data = JSON.parse(JSON.stringify((await dataSet()).data));

const chart = forceDirectedTree(data[0]);

d3.select('body').append(() => chart);