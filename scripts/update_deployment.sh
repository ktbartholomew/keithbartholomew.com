#!/bin/bash

set -ueo pipefail

echo "Unpacking kubeconfig from environment"
mkdir -p ~/.kube
echo -n $CI_DEPLOYER_KUBECONFIG | base64 -d > ~/.kube/config

kubectl get deployment keithbartholomew -o yaml -n keithbartholomew
