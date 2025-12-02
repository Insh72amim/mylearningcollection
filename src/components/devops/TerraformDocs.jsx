import React from "react";
import { MarkerType } from "reactflow";
import InteractiveDiagram from "../common/InteractiveDiagram";
import CodeBlock from "../common/CodeBlock";

const TerraformDocs = () => {
  const workflowNodes = [
    {
      id: "hcl",
      position: { x: 40, y: 140 },
      data: { label: "HCL Config" },
      style: {
        width: 150,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "cli",
      position: { x: 220, y: 140 },
      data: { label: "Terraform CLI" },
      style: {
        width: 160,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "state",
      position: { x: 420, y: 60 },
      data: { label: "State Backend" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
    {
      id: "plan",
      position: { x: 420, y: 220 },
      data: { label: "Plan Graph" },
      style: {
        width: 160,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "providers",
      position: { x: 620, y: 140 },
      data: { label: "Providers" },
      style: {
        width: 160,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "cloud",
      position: { x: 800, y: 140 },
      data: { label: "Target Cloud" },
      style: {
        width: 170,
        background: "#065f46",
        color: "white",
        border: "1px solid #34d399",
      },
    },
  ];

  const workflowEdges = [
    {
      id: "w1",
      source: "hcl",
      target: "cli",
      label: "init/plan/apply",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "w2",
      source: "cli",
      target: "state",
      label: "read/write state",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
    {
      id: "w3",
      source: "cli",
      target: "plan",
      label: "dependency graph",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "w4",
      source: "cli",
      target: "providers",
      label: "RPC",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "w5",
      source: "providers",
      target: "cloud",
      label: "create/update",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399" },
    },
    {
      id: "w6",
      source: "cloud",
      target: "state",
      label: "refresh",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#34d399", strokeDasharray: "6 4" },
    },
  ];

  const moduleNodes = [
    {
      id: "root",
      position: { x: 60, y: 120 },
      data: { label: "Root Module" },
      style: {
        width: 150,
        background: "#1f2937",
        color: "white",
        border: "1px solid #374151",
      },
    },
    {
      id: "network",
      position: { x: 260, y: 40 },
      data: { label: "vpc module" },
      style: {
        width: 150,
        background: "#1e3a8a",
        color: "white",
        border: "1px solid #3b82f6",
      },
    },
    {
      id: "compute",
      position: { x: 260, y: 200 },
      data: { label: "asg module" },
      style: {
        width: 150,
        background: "#7c3aed",
        color: "white",
        border: "1px solid #a855f7",
      },
    },
    {
      id: "outputs",
      position: { x: 460, y: 120 },
      data: { label: "shared outputs" },
      style: {
        width: 160,
        background: "#064e3b",
        color: "white",
        border: "1px solid #10b981",
      },
    },
    {
      id: "remote",
      position: { x: 640, y: 120 },
      data: { label: "remote module" },
      style: {
        width: 160,
        background: "#78350f",
        color: "white",
        border: "1px solid #f59e0b",
      },
    },
  ];

  const moduleEdges = [
    {
      id: "m1",
      source: "root",
      target: "network",
      label: "source=./modules/vpc",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#3b82f6" },
    },
    {
      id: "m2",
      source: "root",
      target: "compute",
      label: "source=git::",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#a855f7" },
    },
    {
      id: "m3",
      source: "network",
      target: "outputs",
      label: "outputs.vpc_id",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981" },
    },
    {
      id: "m4",
      source: "outputs",
      target: "compute",
      label: "inputs",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#10b981", strokeDasharray: "6 4" },
    },
    {
      id: "m5",
      source: "root",
      target: "remote",
      label: "terraform registry",
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { stroke: "#f59e0b" },
    },
  ];

  return (
    <div className="max-w-4xl text-gray-300 space-y-12">
      <header className="border-b border-gray-700 pb-6">
        <h1 className="text-4xl font-bold text-white mb-3">Terraform Guide</h1>
        <p className="text-lg text-gray-400">
          Terraform is an infrastructure-as-code tool that compiles declarative
          HashiCorp Configuration Language (HCL) into provider API calls,
          producing reproducible infrastructure plans and auditable state.
        </p>
      </header>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Execution Workflow
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Every run follows init → plan → apply. Terraform stores the
              current reality inside state (local, S3, Terraform Cloud). The
              plan graph orders resources via implicit and explicit
              dependencies, ensuring safe creation, updates, or destruction.
            </p>
            <ul className="space-y-2 text-sm">
              <li>`terraform init` downloads providers and modules.</li>
              <li>`terraform plan` shows proposed drift + changes.</li>
              <li>`terraform apply` executes provider RPCs and locks state.</li>
            </ul>
          </div>
          <InteractiveDiagram
            initialNodes={workflowNodes}
            initialEdges={workflowEdges}
            title="Plan & Apply"
            height="360px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Module Composition
        </h2>
        <div className="space-y-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <p className="mb-4">
              Organize infrastructure by composing reusable modules. Each module
              exposes inputs/outputs that pass IDs and metadata to peers,
              enabling layered platforms (network, compute, observability).
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  Module Tips
                </h3>
                <ul className="text-xs space-y-1">
                  <li>Keep root modules thin; push logic into versions.</li>
                  <li>Use `terraform-docs` to document inputs/outputs.</li>
                  <li>Version lock modules + providers.</li>
                </ul>
              </div>
              <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2 text-sm">
                  State Hygiene
                </h3>
                <ul className="text-xs space-y-1">
                  <li>Enable state locking (DynamoDB, GCS).</li>
                  <li>Rotate backend credentials; prefer OIDC.</li>
                  <li>Use `terraform state rm` only as last resort.</li>
                </ul>
              </div>
            </div>
          </div>
          <InteractiveDiagram
            initialNodes={moduleNodes}
            initialEdges={moduleEdges}
            title="Module Wiring"
            height="320px"
          />
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-blue-400 mb-4">
          Sample Stack
        </h2>
        <CodeBlock
          language="hcl"
          title="main.tf"
          code={`terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  backend "s3" {
    bucket = "iac-prod-state"
    key    = "app/terraform.tfstate"
    region = "us-east-1"
    dynamodb_table = "iac-state-lock"
  }
}

provider "aws" {
  region = "us-east-1"
}

module "network" {
  source  = "./modules/network"
  cidr_block = "10.20.0.0/16"
}

module "service" {
  source  = "git::https://github.com/org/terraform-modules.git//service?ref=v3.2.1"
  vpc_id  = module.network.vpc_id
  image   = "ghcr.io/org/api:1.4.2"
  replicas = 3
}

output "alb_dns" {
  value = module.service.alb_dns
}`}
        />
      </section>
    </div>
  );
};

export default TerraformDocs;
