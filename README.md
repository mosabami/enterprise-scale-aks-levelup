# Enterprise-scale for AKS LevelUp

Repository for the Enterprise Scale for AKS LevelUp training.

1. During this workshop, attendees will be learning about the following topics around containers and AKS.

   1. Microservices
   2. Persistent volume claims and using Managed databases on Azure in your microservice
   3. Private AKS clusters
   4. Docker
   5. Azure policies for AKS
   6. App Gateway Ingress Controller with TLS
   7. CSI driver for Keyvault secret provider
   8. Terraform
   9. .devcontainers

   **Outline of workshop:**

   1. Quick introduction to Enterprise scale for AKS and why we have it
   2. Go over the customer scenario and their requirements
   3. Quickly Simulate ES for AKS workshop to gather customer requirements and make architectural decisions
   4. Build Enterprise scale for AKS hub, landing zone and supporting services (including ACR and KV) and private cluster using Terraform
   5. Create a Policy so the cluster can only pull images from ACR
   6. Make slight changes to the Node server JavaScript code to accommodate the limitations of AGIC
   7. Build the images required using docker build and push them to ACR
   8. Copy Redis image from Docker hub to ACR
   9. Create Postgres database only accessible via private link using Terraform
   10. Modify the current manifest files as required and create new ones for PVC (for Redis), Secret providers and TLS AGIC
   11. Test the deployment
   12. Wrap up

   **Prerequisites**

   To follow along, you will need to have access to an Azure tenant where you have user admin role in AAD to be able to complete some of the steps and User access admin & Contributor role to the subscription you are using. This is why it would be best to use your MSDN subscription if possible. If not, you can still join and watch as I go through the ensure process step by step.

   1. You will also need

   - Have a L200 AKS knowledge of AKS

   ​ OR

   - Review the AKS Workshop here: [Azure Kubernetes Service Workshop - Learn | Microsoft Docs](https://docs.microsoft.com/en-us/learn/modules/aks-workshop)

   2. Basic knowledge of IaC would also be helpful (Terraform, ARM or Bicep)

   3. Visual Studio code with Remote Development package installed

   4. Docker desktop or similar installed

   5. Optional: [WSL](https://docs.microsoft.com/en-us/windows/wsl/install)

   We will be using a Linux terminal for this workshop

   **Customer scenario:**

   During the LevelUp, you are acting CSA assigned to help ContosAI International deploy a secure AKS cluster for their workload

   ContosAI is an artificial intelligence (AI) startup that specializes in computer vision and uses machine learning and deep neural networks to identify and analyze images and videos. The company offers its solution via API, mobile SDK, and on-premise solutions. To showcase their cutting edge ML models, they are developing a customer facing application whereby customers can sign-up, provide URL to images and watch ContosAI's face detection model detect the faces in the model. This app is gamified by storing the number of times a user has used the face detector and providing their rank compared with other users. ContosAI is planning to use this to showcase some of their capabilities and are looking to host this new workload on AKS.

   One of their software developers has been assigned to begin development of this application by creating an MVP that can be used to test out the value of the product and ensure they are going in the right direction. Being experienced with React and Node JaveScript frameworks, he has created a very simple AKS cluster with no security or persistent storage and has deployed the first version of the app into it. He used NGINX ingress controller because that is what the team is familiar with. His team has contacted you to help create a more secure cluster to host the workload.

   Below is a picture of what the POC of the app the developer created looks like.
   ![image-20211026151029007](./steps/deployment/media/smartbrain.png)

   Below is a picture of the starting cluster the developer made

   ![image-20211026151029007](./steps/deployment/media/starting-state.png)

By the end of the workshop, we would have used Enterprise-scale for AKS to create a more secure cluster that looks like this

![image-20211026151029007](./steps/deployment/media/finish-state.png)

:arrow_forward: [Simulate ES for AKS workshop to gather customer requirements and make architectural decisions](./steps/ES-for-AKS.md)
