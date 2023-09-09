# Ticketing Application

A marketplace for users to buy and sell tickets.

## Dev container

-   There are 2 configurations, on-prem and cloud.
-   Choose cloud if GCP has already been configured and running a cluster, load balancer, etc.
-   Otherwise, choose on-prem.
-   When running on-prem, make sure to replace the infra/k8s folder with that in the .devcontainer directory.

## Common commands

### Kubernetes

```
kubectl get pods
kubectl port-forward <pod-name> <machine-port>:<pod-port>
kubectl -it exec <pod name with mongo db> -- mongosh
kubectl config get-contexts
kubectl config current-context
kubectl config set-context <contextname>
```

### K8s secrets

```
kubectl create secret generic jwt-secret --from-literal <eg. JWT_KEY=secret>
kubectl create secret generic stripe-secret --from-literal <eg. STRIPE_KEY=secret>
kubectl get secrets
```

### NPM

```
npm init -y
npm login
npm publish --access public
npm version patch
npm run pub
```

### gcloud

```
gcloud init
gcloud container clusters get-credentials <cluster-name>
```

## Deployment

### Local

```
minikube start
minikube addons enable ingress
skaffold dev --trigger polling
```

#### Local deployment with devcontainer

1. Make sure all images in `infra/k8s/*.-depl.yaml` point to a docker hub image. (e.g. `parrot7910/auth`)
2. Then run the following:

```
minikube delete --all --purge

minikube start
minikube addons enable ingress
kubectl create secret generic jwt-secret --from-literal <eg. JWT_KEY=secret>
skaffold dev --trigger polling

# make sure devcontainer ports are forwarded
minikube ip
kubectl get service --all-namespaces
# update devcontainer port forwarding via vs code
```

### Cloud

This assumes a cluster is already available on GCP, and that all configurations are appropriate.

1. Follow the steps of `gcloud init` which is triggered in the post create of the devcontainer.
2. Install Ingress Nginx on the cluster
3. Set up secrets with kubectl
4. run skaffold

```
skaffold dev
```

#### Cloud notes

-   Must go to `ticketing.dev` rather than the ip directly as it is defined as the host in `ingress-srv.yaml`.

## Troubleshooting

### Local deployment issues

If not a typo, then usually a minikube problem. Run below then try again:

```
minikube delete --all --purge
```

### Cloud deployment issues

Assuming GCP configuration is correct, cloud issues can usually be resolved by rebuilding the devcontainer.
