#!/bin/bash

set -ueo pipefail

scriptroot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

node ${scriptroot}/lib/webpack.js
node ${scriptroot}/lib/sass.js

mkdir -p ${scriptroot}/../dist/img
rsync -a ${scriptroot}/../src/img/ ${scriptroot}/../dist/img/
