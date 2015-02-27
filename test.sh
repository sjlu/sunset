#!/bin/bash
mysql -u root -e "drop database if exists sunset_test; create database sunset_test;"
NODE_ENV=test npm run migrate
NODE_ENV=test mocha
