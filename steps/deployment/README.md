1. Deploy postgress database into your landing zone using the instructions [here](./portgress-resource-deployment/README.md). Make the password "12345ASDf" and username postgres

2. SSH into the jumpbox you created using Visual Studio code using the instructions at the bottom of  [this page](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/04-network-hub.md). All the steps below need to be done from the jumpbox because your AKS, Key vault and ACR resources can only be accessed from within the same virtual network. We are using visual studio code because it is easy to manipulate files in your virtual machine using it.

3. Install the required tools in your new virtual machine using the instructions [here](./portgress-resource-deployment/setupVM.md)

4. Clone this repository and cd to the folder

   ```
   git clone https://github.com/mosabami/enterprise-scale-aks-levelup
   cd enterprise-scale-aks-levelup
   ```

5. Copy the content of the steps/starting-point folder in your cloned repo in the vm into the steps/deployment

6. Get your ACR name and replace the placeholder below with your ACR name

   ```
   ACR_NAME=<ACR name>
   ```

7. Switch to the server folder (steps/deployment/server) and open the index.js file 

   ```
   cd steps/deployment/server
   code index.js
   ```

8. Add "/api" to the begining of the paths in line 39,43,49,55. This is because AGIC does not have the nginx ingress controller feature that allows you to rewrite target path. Save it

9. Build the image for the server into the container registry you just created using the tag "v2"

   ```
   sudo az acr login 
   sudo docker build -t $ACR_NAME.azurecr.io/multi-server:v2 .
   ```

10. Build image of the fib calculator microservice

   ```
   cd ../worker
   sudo docker build -t $ACR_NAME.azurecr.io/multi-worker . 
   ```

11. Build the image of the front end microservice

    ```
    cd ../client
    sudo docker build -t $ACR_NAME.azurecr.io/multi-client . 
    ```

12. Push the built images into your private container registry

    ```
    sudo docker push $ACR_NAME.azurecr.io/multi-worker
    sudo docker push $ACR_NAME.azurecr.io/multi-client
    sudo docker push $ACR_NAME.azurecr.io/multi-server:v2
    ```

13. Get the name of the Key vault you created and replace the placeholder below with it. Then create the postgres database password as a secret in keyvault

    ```
    KV_NAME=<key vault name>
    az keyvault secret set --name pgpassword --vault-name $KV_NAME --value "12345ASDf"
    ```

14. 

