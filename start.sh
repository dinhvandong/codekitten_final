#!/bin/bash
#pm2 start start.sh --name appNameYouLike
npm run build
cd build
npm start