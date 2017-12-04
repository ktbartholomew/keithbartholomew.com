#!/bin/bash

set -ueo pipefail

scriptroot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

mkdir -p ${scriptroot}/../dist
cp ${scriptroot}/../index.html ${scriptroot}/../dist/index.html
node ${scriptroot}/lib/webpack.js
node ${scriptroot}/lib/sass.js

mkdir -p ${scriptroot}/../dist/img
cp -a ${scriptroot}/../src/img ${scriptroot}/../dist/
