# Install Skaffold
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64 && \
sudo install skaffold /usr/local/bin/
rm skaffold

# Copy skaffold config
cp -p ./.devcontainer/on-prem/skaffold.yaml skaffold.yaml