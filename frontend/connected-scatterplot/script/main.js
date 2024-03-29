// Copyright 2022 Takanori Fujiwara.
// Released under the BSD 3-Clause 'New' or 'Revised' License

import {
  connectedScatterplot
} from './chart.js';

const dataSet = async function getData() {
  return await axios.get('/api/data/driving', {
    baseURL: 'http://127.0.0.1:3000'
  });
};

const data = JSON.parse(JSON.stringify((await dataSet()).data));

const driving = data.map(({
  result,
  table,
  time,
  gas,
  miles,
  side
}) => ({
  year: new Date(time).getFullYear(),
  miles,
  gas,
  side
}));

driving.sort((a, b) => { return a.year - b.year });

const button = d3.select('body').append('div').append('button').attr('type', 'button').text('Replay');

const play = () => {
  const chart = connectedScatterplot(driving, {
    svgId: 'connected-scatterplot',
    x: d => d.miles,
    y: d => d.gas,
    title: d => d.year,
    orient: d => d.side,
    yFormat: '.2f',
    xLabel: 'Miles driven (per capita per year) →',
    yLabel: '↑ Price of gas (per gallon, adjusted average $)',
    width: 1000,
    height: 720,
    duration: 5000 // for the intro animation; 0 to disable
  });
  d3.select('#connected-scatterplot').remove();
  d3.select('body').append(() => chart);
}

play();

// replay
button.on('click', () => {
  play();
});