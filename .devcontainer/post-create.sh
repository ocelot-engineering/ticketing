# Install Skaffold
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
rm skaffold

# Install Google Cloud CLI
curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-444.0.0-linux-x86_64.tar.gz
tar -xf google-cloud-cli-444.0.0-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh
rm google-cloud-cli-444.0.0-linux-x86_64.tar.gz
export PATH=$PATH:./google-cloud-sdk/bin
gcloud init
gcloud components install gke-gcloud-auth-plugin