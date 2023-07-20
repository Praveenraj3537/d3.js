const fs = require('fs');

const express = require('express');
const app = express();
const port = 3000;

const { Pool } = require('pg')
const pool = new Pool({
    user: 'asyin',
    database: 'asyin',
    password: 'asyin',
    port: 5432,
    host: '10.5.0.4',
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb://asyin:asyin@10.5.0.5:27017";
const client = new MongoClient(uri);

const url = "http://10.5.0.6:8086/";
const token = "asyin";
const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const queryApi = new InfluxDB({ url, token }).getQueryApi('asyin');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/data/nations', (req, res) => {
    const data = require('./static/nations.json');
    res.json(data);
});

app.get('/api/data/politifact', (req, res) => {
    async function retrieveData() {
        try {
            const data = await pool.query("SELECT * FROM politifact");
            res.json(data.rows);
        } catch (error) {
            console.error(error);
        }
    }
    retrieveData();
});

app.get('/api/data/penguins', (req, res) => {
    async function retrieveData() {
        try {
            var data = await client.db("test")
                .collection("penguins")
                .find()
                .project({ _id: 0 })
                .toArray();
            res.json(data);
        } catch (error) {
            console.error(error);
        }
    }
    retrieveData();
});

app.get('/api/data/flare', (req, res) => {
    async function retrieveData() {
        try {
            var data = await client.db("test")
                .collection("flare")
                .find()
                .project({ _id: 0 })
                .toArray();
            res.json(data);
        } catch (error) {
            console.error(error);
        }
    }
    retrieveData();
});

app.get('/api/data/driving', (req, res) => {
    async function retrieveData() {
        try {
            const fluxQuery = `from(bucket:"asyin")
            |> range(start: 1955-01-01T00:00:00Z, stop: 2011-01-01T12:00:00Z)
            |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
            |> map(fn: (r) => ({time:r._time, miles:r.miles, gas:r.gas, side:r.side}))
            |> sort(columns: ["time"])`;
            var data = await queryApi.collectRows(fluxQuery);
            res.json(data);
        } catch (error) {
            console.error(error);
        }
    }
    retrieveData();
});

app.get('/api/data/brands', (req, res) => {
    async function retrieveData() {
        try {
            const fluxQuery = `from(bucket:"asyin")
            |> range(start: 1999-01-01T00:00:00Z, stop: 2020-01-01T12:00:00Z)
            |> pivot(rowKey: ["_time"], columnKey: ["_field"], valueColumn: "_value")
            |> filter(fn: (r) => exists r.value)
            |> map(fn: (r) => ({time:r._time, category:r.category, name:r.name, value:r.value}))
            |> sort(columns: ["time", "value"])`;
            var data = await queryApi.collectRows(fluxQuery);
            res.json(data);
        } catch (error) {
            console.error(error);
        }
    }
    retrieveData();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
