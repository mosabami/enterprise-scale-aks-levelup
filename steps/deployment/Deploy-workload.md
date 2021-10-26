## Deploy the workload

Now that our environment is all setup, we will begin the steps required to deploy our fib calculator

### Deploy worker, client and Redis

1. If you havent yet, ensure your VM has all the environment variables your had in your local computer terminal. Log into your newly created AKS cluster

   ```
   az aks get-credentials -n $AKSCLUSTERNAME -g $AKSRESOURCEGROUP
   ```

2. Complete the sign in process and check the nodes

   ```
   kubectl get nodes
   ```

3. Switch to the folder that has the kubernetes manifest files

   ```
   cd ../k8s
   ```

4. Expand the k8s folder within the deployment folder. There you will find the files the developer used to create the initial deployments. Open the worker-deployment.yaml file

   ```
   code  worker-deployment.yaml
   ```

5. Replace the `mosabami` (developer's Docker hub username) with the name of your ACR for the image parameter. Your result should look similar to this: `acr87082.azurecr.io/multi-worker`. Your ACR needs to be used because your policy wont allow images be pulled from container registries outside ACR. Apply the worker deployment

   ```
   kubectl apply -f worker-deployment.yaml
   ```

6. Worker does not need a service since all it does is run the calculations and pass the result back to redis. Open the client deployment file and replace the `mosabami` in the image parameter like you did in the previous step.

   ```
   code client-deployment.yaml
   ```

7. Change the client deployment code so that it points to your ACR

   ```yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: client-deployment
   spec:
     replicas: 2
     selector: 
       matchLabels:
         component: web
     template:
       metadata:
         labels: 
           component: web
       spec:
         containers:
           - name: client
             image: acr87082.azurecr.io/multi-client
             ports: 
               - containerPort: 3000
             readinessProbe: # is the container ready to receive traffic?
               initialDelaySeconds: 10
               httpGet:
                 port: 3000
                 path: /healthz
             livenessProbe: # is the container healthy?
               initialDelaySeconds: 2
               periodSeconds: 5
               httpGet:
                 port: 3000
                 path: /healthz
   ```

   

8. Deploy the client pod and the client service

   ```
   kubectl apply -f client-deployment.yaml
   kubectl apply -f client-service.yaml
   ```

9. Create a new file for the redis deployment persistent volume claim. This will allow the data stored in redis cache to persist even after the pod has been deleted or restarted.

   ```
   code redis-persistent-volume-claim.yaml
   ```

10. Copy the code below into that file and save it

    ```yaml
    apiVersion: v1
    kind: PersistentVolumeClaim
    metadata:
      name: redis-persistent-volume-claim
    spec:
      accessModes:
      - ReadWriteOnce
      storageClassName: managed-premium
      resources:
        requests:
          storage: 1Gi
    ```

11. Deploy the persistent volume claim

    ```
    kubectl apply -f redis-persistent-volume-claim.yaml 
    ```

12. Open the redis deployment file and update it so that it now uses your image and the persistent volume claim you just created. The result should look like the code below. Save it.

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: redis-deployment
    spec:
      replicas: 1
      selector: 
        matchLabels:
          component: redis
      template:
        metadata:
          labels: 
            component: redis
        spec: 
          volumes:
            - name: redis-storage
              persistentVolumeClaim:
                claimName: redis-persistent-volume-claim
          containers:
            - name: redis
              image: acr87082.azurecr.io/redis
              resources:
                limits:
                  memory: "128Mi"
                  cpu: "500m"
              ports:
                - containerPort: 6379
              volumeMounts:
                - name: redis-storage
                  mountPath:  "/data"
    ```

13. Deploy the redis pod

    ```
    kubectl apply -f redis-deployment.yaml
    ```

    If you check the AKS infrastructure resource group on Azure you will notice that a managed premium disk has now been dynamically provisioned for you by the persistent volume claim

    ![Location of private link for keyvault](./media/persistent-premium-disk.png)

    

14. Deploy the redis service

    ```
    kubectl apply -f redis-service.yaml
    ```

### Deploy http ingress and server 

We will begin by deploying the ingress without TLS. To do this we need to temporarily allow access to application gateway via port 80. This option is disabled during our infrastructure deployment because that is more secure. For now, we want to test the application without having to deploy TLS so we will open it up at the NSG. You can find instructions on how to do that [here](https://github.com/Azure/Enterprise-Scale-for-AKS/blob/main/Scenarios/AKS-Secure-Baseline-PrivateCluster/Terraform/08-workload.md#allow-access-to-the-application-gateway-via-port-80-will-be-updated-to-https-soon)

Now that the NSG has been opened up, we begin by deploying the ingress. We are using AGIC. The developer used nginx. We need to update the ingress service to use AGIC. AGIC does not allow the use or regex and does not allow us to rewrite target. The original server deployment used NGINX which has these features. So when it receives requests with "/api" in the url, it removes the "/api" (rewrite target) form the url and sends the request to the server. Since AGIC doesnt have that feature, we had to change the server code to now expect "/api" in the url to make up for the limitations of AGIC. We decided to use AGIC in this deployment because it has lots of useful features for AKS deployments like the fact that we dont need an additional loadbalancer in front of the ingress controller. NGINX would have deployed one. 

1. Create a new http ingress file 

   ```
   code http-ingress.yaml
   ```

2. Copy the code below into the new file and save it. Take a minute to compare this new file with the previous nginx ingress file ingress-service.yaml. One of the big differences is that you'll notice that in the nginx ingress, we didnt have to list out every path. We used regex to take care of that as well as rewrite target to remove the /api so that this ingress can work with the original server deployment. Since AGIC doesnt have the regex feature, we have to spell out each individual path.

   ```yaml
   apiVersion: networking.k8s.io/v1
   # UPDATE API
   kind: Ingress
   metadata:
     name: ingress-service
     annotations:
       kubernetes.io/ingress.class: 'azure/application-gateway'
       # appgw.ingress.kubernetes.io/backend-path-prefix: "/"
       # nginx.ingress.kubernetes.io/use-regex: 'true'
       # ADD ANNOTATION
       # nginx.ingress.kubernetes.io/rewrite-target: /$1
       # UPDATE ANNOTATION
   spec:
     rules:
       - http:
           paths:
             - path: /
               # UPDATE PATH
               pathType: Prefix
               # ADD PATHTYPE
               backend:
                 service:
                   # UPDATE SERVICE FIELDS
                   name: client-service
                   port:
                     number: 3000
             - path: /api/values/all
               # UPDATE PATH
               pathType: Prefix
               # ADD PATHTYPE
               backend:
                 service:
                   # UPDATE SERVICE FIELDS
                   name: server-service
                   port:
                     number: 5000
             - path: /api/values
               # UPDATE PATH
               pathType: Prefix
               # ADD PATHTYPE
               backend:
                 service:
                   # UPDATE SERVICE FIELDS
                   name: server-service
                   port:
                     number: 5000
             - path: /api/values/current
               # UPDATE PATH
               pathType: Prefix
               # ADD PATHTYPE
               backend:
                 service:
                   # UPDATE SERVICE FIELDS
                   name: server-service
                   port:
                     number: 5000
   ```

   

3. Deploy the ingress controller

   ```
   kubectl apply -f http-ingress.yaml
   ```

   Enter the command below and wait until the IP addresss of the ingress shows then cancel with ctrl+c

   ```
   kubectl get ingress -w
   ```

   with the IP address you should now be able to view the web page. Note that the web page wont work properly because the server isnt running yet. We will deploy the server next

4. Create a new file for the secret provider class that will be used to pull the postgres database password from keyvault for the server

   ```
   code server-secret-provider-class.yaml
   ```

5. Copy the code below and paste it into the file. Replace the placeholder userAssignedIdentityID with the client ID you saved earlier. Also replace the placeholder tenantId and the keyvault name

   ```
   apiVersion: secrets-store.csi.x-k8s.io/v1alpha1
   kind: SecretProviderClass
   metadata:
     name: postgres-secret-csi
   spec:
     provider: azure
     secretObjects:
       - secretName: pgpassword    
         type: Opaque              
         data:
         - objectName: PGPASSWORD
           key: PGPASSWORD
     parameters:
       keyvaultName: <keyvault name> 
       useVMManagedIdentity: "true"         
       userAssignedIdentityID: "<client id>" # the client ID of the MSI  
       cloudName: ""                         
       objects:   |
         array:
           - |
             objectName: PGPASSWORD       
             objectType: secret              
             objectVersion: ""               
       tenantId: "<tenant id>"
     
   ```

   

6. 

   

:arrow_forward:[Return to deployment steps](../README.md)