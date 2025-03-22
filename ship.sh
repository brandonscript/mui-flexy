#!/bin/bash

yarn add -P "@mui/material@^5 || ^6"
npm run build && if [ $? -eq 0 ]; then npm whoami && npm publish; else echo 'Build failed'; fi
