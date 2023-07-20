// Copyright 2022 Takanori Fujiwara.
// Released under the BSD 3-Clause 'New' or 'Revised' License

import {
  barChartRace
} from './chart.js';

const dataSet = async function getData() {
  return await axios.get('/api/data/brands', {
    baseURL: 'http://127.0.0.1:3000'
  });
};

var apidata = JSON.parse(JSON.stringify((await dataSet()).data));

const data = apidata.map(({
  result,
  table,
  time,
  name,
  category,
  value
}) => ({
  date: new Date(time),
  name,
  category,
  value
}));

const play = () => {
  const chart = barChartRace(data, {
    svgId: 'bar-chart-race'
  });
  d3.select('#bar-chart-race').remove();
  d3.select('body').append(() => chart);
  chart.play();
}

const button = d3.select('body').append('div').append('button')
  .attr('type', 'button').text('Replay');

// initial play
play();

// replay
button.on('click', () => {
  play();
});