#!/bin/bash

set -ueo pipefail

handlers=$(find infra-support -type f -name 'index.ts')

for handler in $handlers; do
  d=$(dirname $(dirname $handler))
  npx esbuild --bundle --platform=node --minify --outdir=$d/dist $handler
  zip -j $d/dist/$(basename $d).zip $d/dist/index.js

  aws s3 cp $d/dist/$(basename $d).zip s3://keithbartholomew-com-artifacts/$(git rev-parse HEAD)/$(basename $d).zip
done