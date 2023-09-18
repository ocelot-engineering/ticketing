# Install doctl
cd ~

wget https://github.com/digitalocean/doctl/releases/download/v1.98.1/doctl-1.98.1-linux-amd64.tar.gz

tar xf ~/doctl-1.98.1-linux-amd64.tar.gz

sudo mv ~/doctl /usr/local/bin

cd /workspaces/ticketing

# Initalise doctl
doctl auth init --context ticketing-prod
doctl auth switch --context ticketing-prod