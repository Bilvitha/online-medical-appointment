terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.29.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "kubernetes" {
  # Path to your kubeconfig file (Docker Desktop K8s)
  config_path = "${pathexpand("~/.kube/config")}"
}
