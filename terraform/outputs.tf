output "mongo_deployment_name" {
  value = kubernetes_manifest.mongo_deployment.manifest["metadata"]["name"]
}

output "mongo_service_name" {
  value = kubernetes_manifest.mongo_service.manifest["metadata"]["name"]
}

output "backend_deployment_name" {
  value = kubernetes_manifest.backend_deployment.manifest["metadata"]["name"]
}

output "backend_service_name" {
  value = kubernetes_manifest.backend_service.manifest["metadata"]["name"]
}

output "frontend_deployment_name" {
  value = kubernetes_manifest.frontend_deployment.manifest["metadata"]["name"]
}

output "frontend_service_name" {
  value = kubernetes_manifest.frontend_service.manifest["metadata"]["name"]
}
