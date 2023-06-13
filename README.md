# Ticketing Application

A marketplace for users to buy and sell tickets.

## Deployment

```
minikube start
minikube addons enable ingress
skaffold dev --trigger polling
```

### Secret

```
kubectl create secret generic jwt-secret --from-literal=<eg. JWT_KEY=secret>
kubectl get secrets
```
