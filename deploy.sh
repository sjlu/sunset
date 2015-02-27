#!/bin/bash
if [ -e "naught-$1.pid" ]; then
  npm run "restart $1"
else
  npm run "start $1"
fi