# Install Skaffold
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
rm skaffold

# Copy skaffold config
cp -p ./.devcontainer/cloud/skaffold.yaml skaffold.yaml


# Install Google Cloud CLI - steps from https://cloud.google.com/sdk/docs/install#deb

# 0. Update package list
sudo apt-get update
# sudo apt-get install apt-transport-https ca-certificates gnupg curl sudo

# 1. Add the gcloud CLI distribution URI as a package source
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# 2. Import the Google Cloud public key.
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

# 3. Update and install the gcloud CLI:
sudo apt-get update && sudo apt-get install google-cloud-cli

# 4. Install components
sudo apt-get install kubectl
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin

# 5. Init gcloud - requires user inputs
gcloud init

# 6. Fetch credentials  for a running cluster
gcloud container clusters get-credentials ticketing-dev


# Install Ingress Nginx on remote cluster - https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke
# NOTE: this also creates a load balancer (must be done after cluster is created).

# 1. Get cluster admin permissions on the cluster
kubectl create clusterrolebinding cluster-admin-binding \
  --clusterrole cluster-admin \
  --user $(gcloud config get-value account)

# 2. Install ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

# Waits for ingress-nginx pods to be running 
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout=120s