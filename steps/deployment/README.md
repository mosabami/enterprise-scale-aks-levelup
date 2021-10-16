1. Deploy postgress database into your landing zone using the instructions [here](./portgress-resource-deployment/README.md). Make the password "12345ASDf" and username postgres

2. SSH into the jumpbox you created using Visual Studio code using the instructions [here](steps-to-log-into-vm.md). All the steps below need to be done from the jumpbox because your AKS, Key vault and ACR resources can only be accessed from within the same virtual network. We are using visual studio code because it is easy to manipulate files in your virtual machine using it.

3. Clone this repository and cd to the folder

   ```
   git clone https://github.com/mosabami/enterprise-scale-aks-levelup
   cd enterprise-scale-aks-levelup
   ```

4. Copy the content of the steps/starting-point folder into the steps/deployment

5. Get your ACR name and replace the placeholder below with your ACR name

   ```
   ACR_NAME=<ACR name>
   ```

6. Switch to the server folder (steps/deployment/server) and open the index.js file 

   ```
   cd steps/deployment/server
   code index.js
   ```

7. Add "/api" to the begining of the paths in line 39,43,49,55. This is because AGIC does not have the nginx ingress controller feature that allows you to rewrite target path. Save it

8. Build the image for the server into the container registry you just created using the tag "v2"

   ```
   sudo az acr login 
   sudo docker build -t $ACR_NAME.azurecr.io/multi-server:v2 .
   ```

9. Build image of the fib calculator microservice

   ```
   cd ../worker
   sudo docker build -t $ACR_NAME.azurecr.io/multi-worker . 
   ```

10. Build the image of the front end microservice

    ```
    cd ../client
    sudo docker build -t $ACR_NAME.azurecr.io/multi-client . 
    ```

11. Push the built images into your private container registry

    ```
    sudo docker push $ACR_NAME.azurecr.io/multi-worker
    sudo docker push $ACR_NAME.azurecr.io/multi-client
    sudo docker push $ACR_NAME.azurecr.io/multi-server:v2
    ```

12. Get the name of the Key vault you created and replace the placeholder below with it. Then create the postgres database password as a secret in keyvault

    ```
    KV_NAME=<key vault name>
    az keyvault secret set --name pgpassword --vault-name $KV_NAME --value "12345ASDf"
    ```

13. 

