data "terraform_remote_state" "existing-lz" {
  backend = "azurerm"

  config = {
    storage_account_name = var.state_sa_name
    container_name       = var.container_name
    key                  = "lz-net"
    access_key = var.access_key
  }
}

data "azurerm_client_config" "current" {}

resource "azurerm_resource_group" "postgressql_rg" {
  name     = "postgressql-rg"
  location = var.location #eastus make default
}

resource "azurerm_postgresql_server" "postgresql_server" {
  name                = "postgresql-00000001"
  location            = azurerm_resource_group.postgressql_rg.location
  resource_group_name = azurerm_resource_group.postgressql_rg.name

  administrator_login          = var.administrator_login
  administrator_login_password = var.administrator_login_password
  auto_grow_enabled            = var.auto_grow_enabled
  backup_retention_days        = var.backup_retention_days
  geo_redundant_backup_enabled = var.geo_redundant_backup_enabled
  sku_name                     = var.sku_name
  ssl_enforcement_enabled      = var.ssl_enforcement_enabled
  storage_mb                   = var.storage_mb
  version                      = 11
}

resource "azurerm_private_endpoint" "postgressql_pe" {
  name                = "postgres-pe"
  location            = azurerm_resource_group.postgressql_rg.location
  resource_group_name = azurerm_resource_group.postgressql_rg.name
  subnet_id           = data.terraform_remote_state.existing-lz.outputs.aks_subnet_id #Needs subnet to already be deployed

  private_service_connection {
    name                           = "postgresql-connection"
    is_manual_connection           = false
    private_connection_resource_id = azurerm_postgresql_server.postgresql_server.id
    subresource_names              = ["postgresqlServer"]
  }
}

#########################################################################################

variable "location" {
    default = "EastUS"
}

variable "administrator_login" {
    default = "postgres"
}

variable "administrator_login_password" {
    default = "12345ASDf"
}

variable "auto_grow_enabled" {
    default = true
}

variable "backup_retention_days" {
    default = 7
}

variable "geo_redundant_backup_enabled" {
    default = false
}

variable "sku_name" {
    default = "GP_Gen5_2"
}

variable "ssl_enforcement_enabled" {
    default = true
}

variable "storage_mb" {
    default = 51200
}

variable "access_key" {

}

variable "state_sa_name" {

}

variable "container_name" {

}