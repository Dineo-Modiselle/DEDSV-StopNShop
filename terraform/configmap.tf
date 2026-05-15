resource "kubernetes_config_map" "app_config" {
  metadata {
    name = "terraform-config"
  }

 data = {
    APP_NAME    = "DEDSV StopNShop"
    ENVIRONMENT = "staging"
    VERSION     = "2.0.0"    
  }
}