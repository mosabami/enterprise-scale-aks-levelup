Install the following applications:

1. AZ CLI 

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

2. Docker

```bash
sudo apt install docker.io -y
```

3. [Kubernetes CLI](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

Once connected, install the Azure CLI and log into Azure. You must be a member of the appropriate
group (AKS App Dev Users, AKS Operations) to access the cluster. 

```
az login -t  <tenant id>
```

ensure you are connected to the correct subscription

```
az account set --subscription <subscription id>
```

:arrow_forward:[Return to deployment steps](../README.md)