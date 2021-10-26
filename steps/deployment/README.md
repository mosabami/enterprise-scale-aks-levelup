## Deploy Postgres and create images

Now that you have completed creating the main Azure resources, the next step is to create postgres database and setup the virtual machine you will use to deploy the workload. The virtual machine deployed during the setup hub step will be used because we are deploying onto a private cluster using keyvault and ACR that can only be accessed from within the same or peered virtual network.

1. Deploy postgress database into your landing zone using the instructions [here](./portgress-resource-deployment/README.md). Make the password "12345ASDf" and username postgres

2. Follow the instructions [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/08-workload.md#connect-the-container-registry-private-link-to-the-hub-network) to allow access from hub network where your jumpbox VM is located to your private ACR (don't deploy the workload)

3. Follow the instructions [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/08-workload.md#provide-yourself-access-to-create-secrets-in-your-key-vault) to provide yourself access to create secrets in Key vault (don't deploy the workload)

4. SSH into the jumpbox vm you created, using Visual Studio code using the instructions [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/08-workload.md#option-1-connecting-into-the-server-dev-linux-vm-using-ssh-and-vs-code). All the steps below need to be done from the jumpbox because your AKS, Key vault and ACR resources can only be accessed from within the same virtual network. We are using visual studio code because it is easy to manipulate files in your virtual machine using it.

5. Install the required tools in your new virtual machine using the instructions [here](./portgress-resource-deployment/setupVM.md)

6. Clone this repository and cd to the folder

   ```bash
   git clone https://github.com/mosabami/enterprise-scale-aks-levelup
   cd enterprise-scale-aks-levelup
   ```

7. Copy the content of the steps/starting-point folder in your cloned repo in the vm into the steps/deployment folder.

8. Get your ACR name and replace the placeholder below with your ACR name

   ```bash
   ACR_NAME=<ACR name>
   ```

9. Switch to the server folder (steps/deployment/server) and open the index.js file 

   ```bash
   cd steps/deployment/server
   code index.js
   ```

10. Add "/api" to the beginning of the paths in line 39,43,49,55. This is because AGIC does not have the nginx ingress controller feature that allows you to rewrite target path. More details on this later. Save it.

11. Build the image for the server into the container registry you just created using the tag "v2". the original version image did not have the "/api" at the beginning of the paths.

    ```bash
    sudo az acr login -n $ACR_NAME
    sudo docker build -t $ACR_NAME.azurecr.io/multi-server:v2 .
    ```

12. Build image of the calculator microservice

    ```bash
    cd ../worker
    sudo docker build -t $ACR_NAME.azurecr.io/multi-worker . 
    ```

13. Build the image of the front end microservice

    ```bash
    cd ../client
    sudo docker build -t $ACR_NAME.azurecr.io/multi-client . 
    ```

14. Push the built images into your private container registry

    ```bash
    sudo docker push $ACR_NAME.azurecr.io/multi-worker
    sudo docker push $ACR_NAME.azurecr.io/multi-server:v2
    
    # import the client image fromomy repo instead of pushing it as there is currently an error with the build process
    az acr import \
      --name $ACR_NAME \
      --source docker.io/mosabami/multi-client \
      --image multi-client
    ```

15. Get the name of the Key vault you created and replace the placeholder below with it. Then create the postgres database password as a secret in keyvault

    ```bash
    KV_NAME=<key vault name>
    az keyvault secret set --name pgpassword --vault-name $KV_NAME --value "12345ASDf"
    ```

16. Copy the redis image from Docker hub to your ACR

    ```bash
    az acr import \
      --name $ACR_NAME \
      --source docker.io/library/redis \
      --image redis
    ```

17. Ensure you have all 4 images that will be required for the rest of this workshop

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

