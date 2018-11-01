#!/bin/bash

set -ueo pipefail

mkdir -p ~/.kube
echo -n $CI_DEPLOYER_KUBECONFIG | base64 -d > ~/.kube/config

function rollout() {
    kubectl set image deployment/keithbartholomew keithbartholomew=quay.io/ktbartholomew/keithbartholomew.com:${CIRCLE_SHA1} -n keithbartholomew --record
    kubectl rollout status deployment/keithbartholomew -n keithbartholomew
}

function rollback() {
    kubectl rollout undo deployment/keithbartholomew -n keithbartholomew
    exit 1
}

rollout || rollback
