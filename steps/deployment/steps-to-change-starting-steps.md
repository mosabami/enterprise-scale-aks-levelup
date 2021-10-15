``` bash
az aks create -g fibcalculator -n fibcluster --no-ssh-key
```

### Create secret

enter the command below to create the secret

```
kubectl create secret generic pgpassword --from-literal PGPASSWORD=12345ASDf
```

move to the proper folder

```
cd complex_k8s/k8s
```

Create ingress controller

```bash
# https://kubernetes.github.io/ingress-nginx/deploy/#azure
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.3/deploy/static/provider/cloud/deploy.yaml
```

```
ACR_NAME=acr15591
sudo docker build -t $ACR_NAME.azurecr.io/multi-client . 
```

```
sudo docker build -t $ACR_NAME.azurecr.io/multi-worker . 
```

```
sudo docker build -t $ACR_NAME.azurecr.io/multi-server:v2 .
```

```
sudo docker push $ACR_NAME.azurecr.io/multi-worker
sudo docker push $ACR_NAME.azurecr.io/multi-client
sudo docker push $ACR_NAME.azurecr.io/multi-server:v2
acr15591.azurecr.io/multi-server:v2
```

```
KV_NAME=kv15591-akscs
az keyvault secret set --name pgpassword --vault-name $KV_NAME --value "12345ASDf"
```



```
docker image push mosabami/multi-server:v2
```

```
az network vnet check-ip-address --name vnet-contoso-lz01 -g contoso-lz01-rg --ip-address 10.1.16.240
helm install nginx-ingress ingress-nginx/ingress-nginx \
    --namespace default \
    -f internal-ingress.yaml \
    --set controller.replicaCount=2 \
    --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux \
    --set controller.admissionWebhooks.patch.nodeSelector."beta\.kubernetes\.io/os"=linux
    
kubectl get services -o wide -w nginx-ingress-ingress-nginx-controller
```



```
REDIS_KEY=I6IY6innfZF46Koi+vaspuHAJiBIC2fq54tmCiOXmI8
```

```
az storage account keys list \
  --resource-group $TFSTATE_RG \
  --account-name $STORAGEACCOUNTNAME

az aks get-credentials -n fibcluster -g fibcalculator
az aks get-credentials -n $AKSCLUSTERNAME -g $AKSRESOURCEGROUP
```

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -out aks-ingress-tls.crt -keyout aks-ingress-tls.key -subj "/CN=fibcalculator.eastus.cloudapp.azure.com/O=AKS-INGRESS-TLS"

openssl pkcs12 -export -out aks-ingress-tls.pfx -in aks-ingress-tls.crt -inkey aks-ingress-tls.key -passout pass:

az keyvault certificate import -f aks-ingress-tls.pfx -n aks-ingress-tls --vault-name $KV_NAME
```

