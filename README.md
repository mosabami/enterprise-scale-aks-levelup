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
   3. Quickly Simulate ES for AKS workshop to gather customer requirements and make architectural     decisions
   4. Build Enterprise scale for AKS hub, landing zone and supporting services (including ACR and KV)     and private cluster using Terraform
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

   ​        OR 

   - Review the AKS Workshop here: [Azure Kubernetes Service Workshop - Learn | Microsoft Docs](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Flearn%2Fmodules%2Faks-workshop%2F&data=04|01|aayodeji%40microsoft.com|0bad1490cfd34ce49c7008d99835f73d|72f988bf86f141af91ab2d7cd011db47|1|0|637708179858412982|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|1000&sdata=T3MCuQTlZc61Rjnu3tjNHAauupQNqKidTUN1FGMY30Y%3D&reserved=0)

    

   2. Basic knowledge of IaC would also be helpful (Terraform, ARM or Bicep)

   3. Visual Studio code with Remote Development package installed

   4. Docker desktop or similar installed

   5. Optional: [WSL](https://nam06.safelinks.protection.outlook.com/?url=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fwindows%2Fwsl%2Finstall&data=04|01|aayodeji%40microsoft.com|0bad1490cfd34ce49c7008d99835f73d|72f988bf86f141af91ab2d7cd011db47|1|0|637708179858412982|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|1000&sdata=LWg80msToW6PoIDZi62iP9tPsaCPsxYlFCvPacHMjR4%3D&reserved=0)     

   We will be using a Linux terminal for this workshop

   **Customer scenario:**

   During the LevelUp, you are acting CSA assigned to help Contoso International deploy a secure AKS cluster for their workload

   Contoso International is an organization with multiple divisions. One of the divisions, Contoso R&D has a business units that needs a web application that provides the value in the Fibonacci sequence when an index is provided and keeps track of all numbers that have been calculated in a secure and persistent manner. This is important for the business units because they use it in their engineering work.

   This project has been assigned to their development and software consulting division, Contoso developers. Contoso developers has extensive experience using Kubernetes and deploying to AWS and terraform but has no experience with Azure. They have been instructed by Corporate that all new workloads must be deployed on Azure. 

   One of their software developers has been assigned to begin development of this application by creating a quick POC / MVP that can be used to test out the value of the product and ensure they are going in the right direction. Being experienced with React and Node JaveScript frameworks, he has created a very simple AKS cluster with no security or persistent storage and has developed a simple application to use for the POC that can calculate the numbers from 1 to 40. He used NGINX ingress controller because that is what the team is familiar with. His team has contacted you to help create a more secure cluster.

:arrow_forward: [Simulate ES for AKS workshop to gather customer requirements and make architectural decisions](./steps/ES-for-AKS.md)