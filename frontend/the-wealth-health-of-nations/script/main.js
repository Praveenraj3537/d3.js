// Copyright 2022 Takanori Fujiwara.
// Released under the BSD 3-Clause 'New' or 'Revised' License

import {
  theWealthHealthOfNations
} from './chart.js';

import {
  scrubber
} from './scrubber.js';

import {
  swatches
} from './legend.js';

const parseSeries = series => series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);

const dataSet = async function getData() {
  return await axios.get('/api/data/nations', {
    baseURL: 'http://127.0.0.1:3000'
  });
};

const jsonData = JSON.stringify((await dataSet()).data);

const data = JSON.parse(jsonData).map(({
  name,
  region,
  income,
  population,
  lifeExpectancy
}) => ({
  name,
  region,
  income: parseSeries(income),
  population: parseSeries(population),
  lifeExpectancy: parseSeries(lifeExpectancy)
}));

const chart = theWealthHealthOfNations(data);

const dates = d3.utcMonth.range(
  d3.min(data, d => {
    return d3.min([
      d.income[0],
      d.population[0],
      d.lifeExpectancy[0]
    ], ([date]) => date);
  }),
  d3.min(data, d => {
    return d3.max([
      d.income[d.income.length - 1],
      d.population[d.population.length - 1],
      d.lifeExpectancy[d.lifeExpectancy.length - 1]
    ], ([date]) => date);
  }));

const update = (index) => {
  const date = dates[index];
  chart.update(date);
}

const scrubberForm = scrubber(dates, {
  chartUpdate: update,
  delay: 10,
  loop: false,
  format: d => d.getUTCFullYear()
});

const chartSwatches = swatches(chart.scales.color, {
  width: 400,
  nColumns: 3,
  textWidth: 150,
  marginLeft: 30
});

d3.select('body').append(() => scrubberForm.node());
d3.select('body').append(() => chart);
d3.select('body').append(() => chartSwatches);