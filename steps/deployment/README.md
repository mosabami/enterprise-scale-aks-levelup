1. Deploy postgress database into your landing zone using the instructions [here](./portgress-resource-deployment/README.md)
2. Copy the content of the steps\starting-point folder into the steps\deployment
3. Add "/api" to the begining of the paths in line 39,43,49,55. This is because AGIC does not have the nginx ingress controller feature that allows you to rewrite target path.
4. Save the file
5. Build the image into the container registry you just created using the tag "v2"