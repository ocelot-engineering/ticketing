# Ticketing Application

A marketplace for users to buy and sell tickets.

## Deployment

```
minikube start
minikube addons enable ingress
skaffold dev --trigger polling
```

### Kubernetes

```
kubectl get pods
kubectl port-forward <pod-name> <machine-port>:<pod-port>
kubectl -it exec <pod name with mongo db> -- mongosh
kubectl config get-contexts
kubectl config current-context
kubectl config set-context <contextname>
```

### Secret

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

### Local deployment with devcontainer

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

### gcloud

This assumes a cluster is already available on GCP, and that all configurations are appropriate.

1. Follow the steps of `gcloud init` which is triggered in the post create of the devcontainer.
2. Install Ingress Nginx on the cluster
3. Run the following to connect to cluster:

```
gcloud container clusters get-credentials <cluster-name>
```

4. Set up secrets with kubectl
5. run skaffold

```
skaffold dev --trigger polling
```
