targetScope = 'subscription'
param location string = deployment().location
param rgName string = 'postgressql-rg'
param administrator_login string = 'postgres'
param administrator_login_password string = '12345ASDf'
param auto_grow_enabled string = 'Enabled'
param backup_retention_days int = 7
param geo_redundant_backup_enabled string = 'Disabled'
param sku_name string = 'GP_Gen5_2'
param ssl_enforcement_enabled string = 'Disabled'
param storage_mb int = 51200
param publicNetworkAccess string = 'Disabled'
param name string = 'postgresql-00000001'
param privateEndpointPostgressName string = 'postgres-pe'
param vnetName string
param subnetName string


module rg 'modules/resource_group.bicep' = {
  name: rgName
  params: {
    rgName: rgName
    location: deployment().location
  }
}

module postgressql_server 'modules/protgresServer.bicep' = {
  scope: resourceGroup(rg.name)
  name: name
  params: {
    administrator_login: administrator_login
    administrator_login_password: administrator_login_password
    auto_grow_enabled: auto_grow_enabled
    backup_retention_days: backup_retention_days
    geo_redundant_backup_enabled: geo_redundant_backup_enabled
    location: location
    name: name
    privateEndpointPostgressName: privateEndpointPostgressName
    publicNetworkAccess: publicNetworkAccess
    sku_name: sku_name
    ssl_enforcement_enabled: ssl_enforcement_enabled
    storage_mb: storage_mb
    subnetName: subnetName
    vnetName: vnetName
  }
}
