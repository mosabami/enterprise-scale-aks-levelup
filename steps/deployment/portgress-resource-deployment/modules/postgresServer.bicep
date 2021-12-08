param location string
param administrator_login string
param administrator_login_password string
param auto_grow_enabled string
param backup_retention_days int
param geo_redundant_backup_enabled string
param sku_name string
param ssl_enforcement_enabled string
param storage_mb int
param publicNetworkAccess string
param name string

resource postgresql_server 'Microsoft.DBforPostgreSQL/servers@2017-12-01' = {
  location: location
  name: name
  sku: {
    name: sku_name
  }
  properties: {
    createMode: 'Default'
    administratorLogin: administrator_login
    administratorLoginPassword: administrator_login_password
    publicNetworkAccess: publicNetworkAccess
    sslEnforcement: ssl_enforcement_enabled
    storageProfile: {
      backupRetentionDays: backup_retention_days
      geoRedundantBackup: geo_redundant_backup_enabled
      storageAutogrow: auto_grow_enabled
      storageMB: storage_mb
    }
  }
}

output postgressid string = postgresql_server.id
