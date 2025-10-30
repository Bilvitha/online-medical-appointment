########################################
# MongoDB
########################################

resource "kubernetes_manifest" "mongo_deployment" {
  manifest = yamldecode(file("${path.module}/../k8s/mongo-deployment.yml"))
}

resource "kubernetes_manifest" "mongo_service" {
  manifest = yamldecode(file("${path.module}/../k8s/mongo-service.yml"))
}

########################################
# Backend
########################################

resource "kubernetes_manifest" "backend_deployment" {
  manifest = yamldecode(file("${path.module}/../k8s/backend-deployment.yml"))
}

resource "kubernetes_manifest" "backend_service" {
  manifest = yamldecode(file("${path.module}/../k8s/backend-service.yml"))
}

########################################
# Frontend
########################################

resource "kubernetes_manifest" "frontend_deployment" {
  manifest = yamldecode(file("${path.module}/../k8s/frontend-deployment.yml"))
}

resource "kubernetes_manifest" "frontend_service" {
  manifest = yamldecode(file("${path.module}/../k8s/frontend-service.yml"))
}
