#!/bin/bash

set -ueo pipefail

scriptroot="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

docker build -t quay.io/ktbartholomew/os:${TAG:=latest} ${scriptroot}/..
