# enterprise-scale-aks-levelup
Repository for the Enterprise Scale for AKS LevelUp training.

**Your Prerequisites:**

- Have a      L200 AKS knowledge of AKS 

  OR 

- Review the     AKS Workshop here: [Azure      Kubernetes Service Workshop - Learn | Microsoft Docs](https://na01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Flearn%2Fmodules%2Faks-workshop%2F&data=04|01|aayodeji%40microsoft.com|e163daa4ec874e77015a08d98c7a7e9b|72f988bf86f141af91ab2d7cd011db47|1|0|637695280019065547|Unknown|TWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D|1000&sdata=AJKROZgjZ0LiIhWpOuCvaBA7SGAjsFt6M%2BHnnlEJrl4%3D&reserved=0)

- Visual     studio code with Remote Development extension installed

- Azure tenant     where you have user access admin and contributor role at the AAD level     (you will need this for parts of the workshop to follow along or you can     just attend and watch)

 

**Customer scenario:**

During the levelup, you are a Microsoft Cloud solutions Architect assigned to help Contoso International deploy a secure AKS cluster for their workload.

Contoso International is an organization with multiple divisions. One of the divisions, Contoso R&D has business units that needs a web application that calculates the Fibonacci value of any number and keep track of all numbers that have been calculated in a secure and persistent manner. This is important for the business units because they use it in their engineering work.

This project has been assigned to their development and software consulting division, Contoso developers. Contoso developers has extensive experience developing on Kubernetes and deploying to AWS and terraform but has no experience with Azure. They have been instructed by Corporate that all new workloads must be deployed on Azure. 

One of their software developers has been assigned to begin development of this application by creating a quick POC that can be used to test out the value of the product and ensure they are going in the right direction. Being experienced with React and Node JaveScript frameworks, he has created a very simple AKS cluster with no security or persistence and has developed a simple application to use for the POC that can calculate the numbers from 1 to 40. This used NGINX ingress controller because that is what the team has been familiar with. His team has contacted you to help create a more secure cluster.

 

**Requirements for the POC (and concepts that will be learned during the workshop):**

1. Very simple version of     the react app which has already been developed (Microservices,MVP,POC)
2. Use a consistent development environment (.devcontainers)
3. Needs to store data persistently so that they can track historical numbers that have been requested by the business unit to analyze trends(PVC, managed databases)
4. Cluster needs to be private and secure (Private link)
5. The cluster should only allow images from a private registry (SW Development, Docker, Azure     policies for AKS)
6. Should only allow https connections into the cluster and use AGIC (AGIC with TLS)
7. Should store all secrets securely (CSI driver for Keyvault secret provider)
8. Use Terraform because that is what the team is familiar with (Terraform)

 

**Outline of workshop:**

1. Quick introduction to Enterprise scale for AKS and why we have it
2. Go over the customer scenario and their requirements
3. Simulate ES for AKS workshop to gather customer requirements and make architectural decisions
4. Build Enterprise scale for AKS hub, landingzone and supporting services (including ACR and KV) and private cluster using terraform
5. Create a policy so the cluster can only pull images from ACR
6. Make changes to the Node server code to accommodate the limitations of AGIC
7. Build the images required using docker build and push them to ACR
8. Copy redis image from dockerhub to acr
9. Create postgres database only accessible via private link
10. Modify the current manifest files as required and create new ones for PVC (for redis), Secret     providers and TLS AGIC
11. Test the deployment
12. Wrap up

**Some Important concepts that are not covered:**

1. DevOps
2. Advanced cluster hardening like network policies, etc
3. Container insights (metrics)
4. Helm charts
5. Service Mesh
6. Connection to onprem resources

:arrow_forward: [Simulate ES for AKS workshop to gather customer requirements and make architectural decisions](./steps/ES-for-AKS)