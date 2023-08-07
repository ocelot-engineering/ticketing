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
```

### Secret

```
kubectl create secret generic jwt-secret --from-literal=<eg. JWT_KEY=secret>
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
