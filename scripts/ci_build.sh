#!/bin/bash

set -ueo pipefail

scriptroot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

NODE_ENV=production ${scriptroot}/build-frontend.sh
# docker build -t quay.io/ktbartholomew/os:${TAG:=latest} ${scriptroot}/..
