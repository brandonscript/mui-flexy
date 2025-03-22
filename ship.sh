#!/bin/bash

npm run build && if [ $? -eq 0 ]; then npm whoami && npm publish; else echo 'Build failed'; fi
