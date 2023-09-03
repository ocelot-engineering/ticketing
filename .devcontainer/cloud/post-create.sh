# Install Skaffold
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
rm skaffold


# Install Google Cloud CLI - steps from https://cloud.google.com/sdk/docs/install#deb

# 0. Update package list
sudo apt-get update
# sudo apt-get install apt-transport-https ca-certificates gnupg curl sudo

# 1. Add the gcloud CLI distribution URI as a package source
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

# 2. Import the Google Cloud public key.
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

# 3. Update and install the gcloud CLI:
sudo apt-get update && sudo apt-get install google-cloud-cli

# 4. Install components
sudo apt-get install kubectl
sudo apt-get install google-cloud-sdk-gke-gcloud-auth-plugin

# 5. Init gcloud - requires user inputs
gcloud init