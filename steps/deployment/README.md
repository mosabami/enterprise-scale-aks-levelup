## Deploy Postgres and create images

Now that you have completed creating the main Azure resources, the next step is to create postgres database and setup the virtual machine you will use to deploy the workload.

1. Deploy postgress database into your landing zone using the instructions [here](./portgress-resource-deployment/README.md). Make the password "12345ASDf" and username postgres

2. Follow the instructions [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Bicep/07-workload.md#provide-yourself-access-to-create-secrets-in-your-key-vault) to provide yourself access to create secrets in Key vault (don't deploy the workload)

3. SSH into the jumpbox vm you created, using Visual Studio code using the instructions [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/08-workload.md#option-1-connecting-into-the-server-dev-linux-vm-using-ssh-and-vs-code). All the steps below need to be done from the jumpbox because your AKS, Key vault and ACR resources can only be accessed from within the same virtual network. We are using visual studio code because it is easy to manipulate files in your virtual machine using it.

In a production environment you would have to access the jumpbox using a bastion host. But it wouldn't allow you to use Visual Studio or SSH because of the network restrictions. Follow this steps to allow external access to the jumpbox to your external IP address:

    - Create a Public IP Address.
         
    ```bash
    az network public-ip create -g ESLZ-HUB -n jumpbox-PIP --sku Basic --location CentralUS
    jumpboxpip=$(az network public-ip show -g ESLZ-HUB -n jbnic-ip --query id -o tsv)
    az network nic ip-config update --name ipconfig1 --nic-name jbnic --resource-group ESLZ-HUB --public-ip-address $jumpboxpip 
    ```    

    - Add a route to your Public IP with destination Internet.
    
    You can access the internet and check your public IP address and change the variable $homeip bellow or try to run the script to automatically do it for you.

    ```bash
    homeip=$(curl ifconfig.co -4)
    az network route-table route create -n HOME --route-table-name vm-subnet-rt -g ESLZ-HUB --next-hop-type Internet --address-prefix $homeip/32
    ```
     
    - Create a Azure Firewall rule to allow internet access to the Jumpbox.
    
    ```bash
    az network firewall network-rule create -f AZFW -g ESLZ-HUB -c AKS-Egress --protocols Any --destination-addresses '*' --destination-ports '*' --source-addresses 10.0.3.0/24 -n Allow-Jumpbox-Internet-Access
    ```
    
4. Install the required tools in your new virtual machine using the instructions [here](./portgress-resource-deployment/setupVM.md)

5. Clone this repository and cd to the folder

   ```bash
   git clone https://github.com/mosabami/enterprise-scale-aks-levelup
   cd enterprise-scale-aks-levelup
   ```

6. Copy the content of the steps/starting-point folder in your cloned repo in the vm into the steps/deployment folder.

    ```bash
    cp -R steps/starting-point/* steps/deployment/
    ```

7. Get your ACR name and replace the placeholder below with your ACR name

   ```bash
   ACR_NAME=$(az acr list -g ESLZ-SPOKE --query '[].name' -o tsv)
   KV_NAME=$(az keyvault list -g ESLZ-SPOKE --query '[].name' -o tsv)
   ```

8. Switch to the server folder (steps/deployment/server) and open the index.js file

   ```bash
   cd steps/deployment/server
   code index.js
   ```

9. Add "/api" to the beginning of the paths in line 39,43,49,55. This is because AGIC does not have the nginx ingress controller feature that allows you to rewrite target path. More details on this later. Save it.

10. Build the image for the server into the container registry you just created using the tag "v2". the original version image did not have the "/api" at the beginning of the paths.

    ```bash
    sudo az acr login -n $ACR_NAME
    sudo docker build -t $ACR_NAME.azurecr.io/multi-server:v2 .
    ```

11. Build image of the calculator microservice

    ```bash
    cd ../worker
    sudo docker build -t $ACR_NAME.azurecr.io/multi-worker .
    ```

12. Build the image of the front end microservice

    ```bash
    cd ../client
    sudo docker build -t $ACR_NAME.azurecr.io/multi-client .
    ```

13. Push the built images into your private container registry

    ```bash
    sudo docker push $ACR_NAME.azurecr.io/multi-worker
    sudo docker push $ACR_NAME.azurecr.io/multi-server:v2

    # import the client image from my repo instead of pushing your build as there is currently an error in the build process
    az acr import \
      --name $ACR_NAME \
      --source docker.io/mosabami/multi-client \
      --image multi-client
    ```

14. Get the name of the Key vault you created and replace the placeholder below with it. Then create the postgres database password as a secret in keyvault

    ```bash
    KV_NAME=<key vault name>
    az keyvault secret set --name pgpassword --vault-name $KV_NAME --value "12345ASDf"
    ```

15. Copy the redis image from Docker hub to your ACR

    ```bash
    az acr import \
      --name $ACR_NAME \
      --source docker.io/library/redis \
      --image redis
    ```

16. Ensure you have all 4 images that will be required for the rest of this workshop

    ```bash
    az acr repository list -n $ACR_NAME
    ```

    Your output should look like this:

    ```output
    [
      "multi-client",
      "multi-server",
      "multi-worker",
      "redis"
    ]
    ```

:arrow_forward:[Deploy workload](./Deploy-workload.md)
