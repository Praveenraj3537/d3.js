#!/usr/bin/env sh

# import penguins
mongoimport \
    --username=asyin \
    --password=asyin \
    --file=penguins.csv \
    --type=csv \
    --headerline \
    --authenticationDatabase admin

# import flare
mongoimport \
    --username=asyin \
    --password=asyin \
    --file=flare.json \
    --type=json \
    --authenticationDatabase admin