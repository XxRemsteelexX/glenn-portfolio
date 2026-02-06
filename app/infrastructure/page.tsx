"use client";

import { motion } from "framer-motion";
import {
  Server,
  Cpu,
  HardDrive,
  Network,
  Shield,
  Brain,
  Database,
  Monitor,
  Workflow,
  ArrowLeft,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function InfrastructurePage() {
  const computeNodes = [
    {
      name: "APOLLO",
      role: "Primary Training Node",
      icon: <Zap className="w-6 h-6" />,
      highlight: true,
      specs: {
        cpu: "Intel i9-14900KS",
        ram: "96GB DDR5-6800",
        gpu: ["ASUS TUF RTX 5090", "Zotac Solid OC RTX 5090"],
        storage: "24.5TB (NVMe + SSD + HDD)",
        cooling: "360mm AIO Push/Pull",
        network: "5GbE RJ45 via TB4"
      },
      description: "Dual RTX 5090 powerhouse for large-scale ML training and GPU compute"
    },
    {
      name: "GLAZARKAR",
      role: "Secondary Training Node",
      icon: <Cpu className="w-6 h-6" />,
      specs: {
        cpu: "Intel i9-14900K",
        ram: "96GB DDR5-6800",
        gpu: ["EVGA RTX 3090 Ti FTW3", "EVGA RTX 3090 Hydro Copper"],
        storage: "10TB (NVMe + SSD)",
        cooling: "2x 360mm AIO Push/Pull",
        network: "10GbE"
      },
      description: "Dual RTX 3090-class compute for parallel experimentation and inference"
    },
    {
      name: "REMSTEELE",
      role: "Mobile Workstation",
      icon: <Monitor className="w-6 h-6" />,
      specs: {
        cpu: "Intel Ultra 9 275HX",
        ram: "64GB DDR5-5600",
        gpu: ["NVIDIA RTX 5080 Mobile"],
        storage: "3TB NVMe",
        cooling: "Laptop thermal system",
        network: "WiFi 7 + Ethernet"
      },
      description: "MSI Vector 16 HX AI - Portable AI workstation for mobile compute"
    }
  ];

  const inferenceNodes = [
    {
      name: "FORTYTWO",
      role: "Primary LLM Inference + RAG Memory",
      icon: <Brain className="w-6 h-6" />,
      highlight: true,
      specs: {
        cpu: "AMD Ryzen AI Max+ 395",
        ram: "128GB Unified Memory",
        storage: "6TB NVMe",
        models: ["Kimi K2", "Qwen 3", "GLM 4.6"]
      },
      description: "Primary network LLM inference node with persistent project RAG store"
    },
    {
      name: "422",
      role: "Second Brain System",
      icon: <Brain className="w-6 h-6" />,
      specs: {
        cpu: "AMD Ryzen AI Max+ 395",
        ram: "128GB Unified Memory",
        storage: "4TB NVMe",
        models: ["Kimi K2", "Qwen 3", "GLM 4.6"]
      },
      description: "Activity tracking, weekly goals, and multi-week outcome continuity"
    },
    {
      name: "VIN",
      role: "Orchestration Brain",
      icon: <Workflow className="w-6 h-6" />,
      specs: {
        cpu: "AMD Ryzen 9 AI HX 370",
        ram: "64GB Unified Memory",
        storage: "5TB NVMe",
        services: ["n8n automation", "Data routing", "Local LLM"]
      },
      description: "Always-on orchestration engine executing automation workflows"
    }
  ];

  const infrastructureNodes = [
    {
      name: "CLOUDWRATH",
      role: "Proxmox Backbone + Storage Anchor",
      icon: <Database className="w-6 h-6" />,
      highlight: true,
      specs: {
        cpu: "Intel Ultra 9 285",
        ram: "64GB DDR5-6000",
        gpu: "Dell RTX 3090",
        storage: "48TB (NVMe + SSD + HDD + External)",
        services: ["Proxmox VE", "Tiered Storage", "VM Host"]
      },
      description: "Primary virtualization host implementing hot/warm/cold storage model"
    },
    {
      name: "HP t740",
      role: "Edge Firewall / Router",
      icon: <Shield className="w-6 h-6" />,
      specs: {
        cpu: "AMD Ryzen Embedded V1756B",
        ram: "8GB DDR4",
        storage: "128GB NVMe",
        network: "Dual Intel X550-T2 10GbE",
        services: ["pfSense", "VLAN", "VPN", "Traffic filtering"]
      },
      description: "pfSense appliance providing perimeter security and network segmentation"
    },
    {
      name: "KROSS",
      role: "Web Host + Enterprise Services",
      icon: <Server className="w-6 h-6" />,
      specs: {
        cpu: "Intel i9-13900H",
        ram: "48GB DDR5",
        storage: "6TB NVMe (RAID-1)",
        network: "2x 2.5GbE + 2x SFP+ + 2x 10GbE",
        services: ["Web hosting", "Client data", "Enterprise services"]
      },
      description: "Minisforum MS-01 serving outward-facing services and client projects"
    }
  ];

  const utilityNodes = [
    {
      name: "SSORK",
      role: "Security / Watchdog",
      icon: <Monitor className="w-6 h-6" />,
      specs: {
        cpu: "Intel N100",
        ram: "12GB",
        storage: "512GB NVMe"
      },
      description: "Security monitoring with dedicated 10\" status display"
    },
    {
      name: "TEST",
      role: "Sandbox Node",
      icon: <Server className="w-6 h-6" />,
      specs: {
        cpu: "Intel N100",
        ram: "8GB",
        storage: "256GB SSD"
      },
      description: "Minisforum S100 (PoE) for validating services and network changes"
    }
  ];

  const designPrinciples = [
    {
      title: "Separation of Concerns",
      description: "Memory, compute, and interface separated for reliability and scaling"
    },
    {
      title: "Routing Over Organizing",
      description: "Automated classification and placement beats manual file organization"
    },
    {
      title: "Small, Frequent Outputs",
      description: "Daily nudges and lightweight updates for actionable intelligence"
    },
    {
      title: "Design for Restart",
      description: "All pipelines recover cleanly after interruptions"
    },
    {
      title: "Maintainability Over Cleverness",
      description: "Modular nodes, clear roles, and scheduled transfers"
    }
  ];

  const totalStats = {
    gpuVram: "128GB+ (5090x2 + 3090Ti + 3090 + 3090 + 5080)",
    unifiedMemory: "320GB (128GB x2 + 64GB)",
    systemRam: "432GB DDR5",
    storage: "100TB+",
    network: "10Gb backbone",
    nodes: "12+ active nodes"
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background image overlay */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/infrastructure-bg-data.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
        />
      </div>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b relative">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Portfolio
                </Button>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <Server className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold">AI Homelab Infrastructure</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Homelab & Active Memory Network
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Purpose-built 10Gb AI lab with automated &quot;active memory&quot; system for
              LLM inference, orchestration, and project intelligence
            </p>
          </motion.div>

          {/* Total Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
          >
            {Object.entries(totalStats).map(([key, value], index) => (
              <div
                key={key}
                className="bg-card border rounded-lg p-4 text-center hover:border-primary/50 transition-colors"
              >
                <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Design Principles */}
      <section className="py-12 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Core Design Principles</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {designPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold text-sm mb-2">{principle.title}</h3>
                <p className="text-xs text-muted-foreground">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heavy Compute Tier */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="w-8 h-8 text-yellow-500" />
            <h2 className="text-2xl font-bold">Heavy Compute Tier</h2>
            <span className="text-sm text-muted-foreground">(GPU Training + Experiments)</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {computeNodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-all ${
                  node.highlight ? 'border-yellow-500/50 ring-1 ring-yellow-500/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${node.highlight ? 'bg-yellow-500/10 text-yellow-500' : 'bg-primary/10 text-primary'}`}>
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{node.name}</h3>
                    <p className="text-xs text-muted-foreground">{node.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{node.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium">{node.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{node.specs.ram}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">GPU:</span>
                    <div className="mt-1">
                      {node.specs.gpu.map((gpu, i) => (
                        <div key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded mb-1">
                          {gpu}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium text-xs">{node.specs.storage}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inference Tier */}
      <section className="py-12 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8">
            <Brain className="w-8 h-8 text-purple-500" />
            <h2 className="text-2xl font-bold">Inference Tier</h2>
            <span className="text-sm text-muted-foreground">(Unified Memory LLM Nodes)</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {inferenceNodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-all ${
                  node.highlight ? 'border-purple-500/50 ring-1 ring-purple-500/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${node.highlight ? 'bg-purple-500/10 text-purple-500' : 'bg-primary/10 text-primary'}`}>
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{node.name}</h3>
                    <p className="text-xs text-muted-foreground">{node.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{node.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium text-xs">{node.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Unified Memory:</span>
                    <span className="font-medium text-purple-500">{node.specs.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{node.specs.storage}</span>
                  </div>
                  {node.specs.models && (
                    <div>
                      <span className="text-muted-foreground">Models:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.specs.models.map((model, i) => (
                          <span key={i} className="text-xs bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {node.specs.services && (
                    <div>
                      <span className="text-muted-foreground">Services:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.specs.services.map((service, i) => (
                          <span key={i} className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Tier */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8">
            <Database className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold">Infrastructure Tier</h2>
            <span className="text-sm text-muted-foreground">(Storage + Networking + Services)</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {infrastructureNodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-card border rounded-lg p-6 hover:shadow-lg transition-all ${
                  node.highlight ? 'border-blue-500/50 ring-1 ring-blue-500/20' : ''
                }`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${node.highlight ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{node.name}</h3>
                    <p className="text-xs text-muted-foreground">{node.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{node.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium text-xs">{node.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{node.specs.ram}</span>
                  </div>
                  {node.specs.gpu && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GPU:</span>
                      <span className="font-medium text-xs">{node.specs.gpu}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium text-xs">{node.specs.storage}</span>
                  </div>
                  {node.specs.network && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="font-medium text-xs">{node.specs.network}</span>
                    </div>
                  )}
                  {node.specs.services && (
                    <div>
                      <span className="text-muted-foreground">Services:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {node.specs.services.map((service, i) => (
                          <span key={i} className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Utility Tier */}
      <section className="py-12 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-3 mb-8">
            <Monitor className="w-8 h-8 text-gray-500" />
            <h2 className="text-2xl font-bold">Utility Tier</h2>
            <span className="text-sm text-muted-foreground">(Security + Testing)</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
            {utilityNodes.map((node, index) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card border rounded-lg p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-gray-500/10 text-gray-500">
                    {node.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{node.name}</h3>
                    <p className="text-xs text-muted-foreground">{node.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{node.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CPU:</span>
                    <span className="font-medium">{node.specs.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RAM:</span>
                    <span className="font-medium">{node.specs.ram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Storage:</span>
                    <span className="font-medium">{node.specs.storage}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Stack */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold mb-8 text-center">Software Stack</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>Networking</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>pfSense Firewall</li>
                <li>VLAN Segmentation</li>
                <li>VPN Termination</li>
                <li>10Gb Backbone</li>
              </ul>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-500" />
                <span>Virtualization</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Proxmox VE</li>
                <li>Ubuntu Server</li>
                <li>Pop!_OS (Workstations)</li>
                <li>Windows (Dual-boot)</li>
              </ul>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <Workflow className="w-5 h-5 text-orange-500" />
                <span>Automation</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>n8n Orchestration</li>
                <li>RAG Pipeline</li>
                <li>Hot/Warm/Cold Storage</li>
                <li>Scheduled Syncs</li>
              </ul>
            </div>
            <div className="bg-card border rounded-lg p-6">
              <h3 className="font-bold mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-500" />
                <span>AI/ML</span>
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Local LLMs (Kimi K2, Qwen 3)</li>
                <li>PyTorch / TensorFlow</li>
                <li>MLflow (Coming Soon)</li>
                <li>Multi-GPU Training</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-muted/30 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold mb-4">Built for AI Research & Production</h2>
          <p className="text-muted-foreground mb-8">
            This infrastructure powers all my Kaggle competitions, deep learning research,
            and production ML systems - eliminating cloud compute costs while maintaining
            enterprise-grade reliability.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/#projects">
              <Button>View Projects</Button>
            </Link>
            <Link href="/#contact">
              <Button variant="outline">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
