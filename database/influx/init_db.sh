#!/usr/bin/env sh

influx write -b asyin -f driving.csv
influx write -b asyin -f brands.csv