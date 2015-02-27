#!/bin/bash
mysql -u root -e "drop database if exists abacus_test; create database abacus_test;"
mocha