#!/bin/bash

set -ueo pipefail

scriptroot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

node ${scriptroot}/lib/watch.js
