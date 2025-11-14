import { useState } from 'react';
import { Cloud, Database, Server, Shield, Globe, HardDrive, Network, Cpu, Box, Workflow, BarChart3, Zap, GitBranch, Key } from 'lucide-react';

interface ServiceNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  x: number;
  y: number;
}

interface Connection {
  from: string;
  to: string;
}

export function GCPArchitecture() {
  const [services] = useState<ServiceNode[]>([
    // Security & Identity Layer
    { id: 'user', name: 'Users', icon: <Globe className="w-6 h-6" />, color: 'bg-blue-500', x: 80, y: 30 },
    { id: 'iam', name: 'Cloud IAM', icon: <Key className="w-6 h-6" />, color: 'bg-red-600', x: 80, y: 150 },
    
    // Network & Frontend Layer
    { id: 'cdn', name: 'Cloud CDN', icon: <Network className="w-6 h-6" />, color: 'bg-cyan-500', x: 280, y: 30 },
    { id: 'lb', name: 'Cloud Load Balancer', icon: <Workflow className="w-6 h-6" />, color: 'bg-green-500', x: 280, y: 150 },
    { id: 'armor', name: 'Cloud Armor', icon: <Shield className="w-6 h-6" />, color: 'bg-purple-500', x: 280, y: 270 },
    
    // Application/Compute Layer
    { id: 'gke', name: 'Google Kubernetes Engine', icon: <Box className="w-6 h-6" />, color: 'bg-blue-600', x: 480, y: 30 },
    { id: 'compute', name: 'Compute Engine', icon: <Server className="w-6 h-6" />, color: 'bg-orange-500', x: 480, y: 150 },
    { id: 'run', name: 'Cloud Run', icon: <Cpu className="w-6 h-6" />, color: 'bg-indigo-500', x: 480, y: 270 },
    { id: 'functions', name: 'Cloud Functions', icon: <Zap className="w-6 h-6" />, color: 'bg-yellow-500', x: 480, y: 390 },
    
    // Data & Analytics Layer
    { id: 'sql', name: 'Cloud SQL', icon: <Database className="w-6 h-6" />, color: 'bg-sky-500', x: 680, y: 30 },
    { id: 'storage', name: 'Cloud Storage', icon: <HardDrive className="w-6 h-6" />, color: 'bg-emerald-500', x: 680, y: 150 },
    { id: 'firestore', name: 'Firestore', icon: <Database className="w-6 h-6" />, color: 'bg-amber-500', x: 680, y: 270 },
    { id: 'bigquery', name: 'BigQuery', icon: <BarChart3 className="w-6 h-6" />, color: 'bg-blue-700', x: 680, y: 390 },
    
    // Orchestration Layer
    { id: 'composer', name: 'Cloud Composer', icon: <GitBranch className="w-6 h-6" />, color: 'bg-teal-500', x: 480, y: 510 },
  ]);

  const [connections] = useState<Connection[]>([
    // User flow
    { from: 'user', to: 'cdn' },
    { from: 'user', to: 'iam' },
    { from: 'cdn', to: 'lb' },
    { from: 'iam', to: 'lb' },
    
    // Network to security
    { from: 'lb', to: 'armor' },
    
    // Load balancer to compute services
    { from: 'armor', to: 'gke' },
    { from: 'armor', to: 'compute' },
    { from: 'armor', to: 'run' },
    { from: 'armor', to: 'functions' },
    
    // Compute to data layer
    { from: 'gke', to: 'sql' },
    { from: 'gke', to: 'storage' },
    { from: 'compute', to: 'sql' },
    { from: 'compute', to: 'storage' },
    { from: 'run', to: 'firestore' },
    { from: 'run', to: 'storage' },
    { from: 'functions', to: 'firestore' },
    { from: 'functions', to: 'storage' },
    
    // Analytics connections
    { from: 'storage', to: 'bigquery' },
    { from: 'sql', to: 'bigquery' },
    { from: 'firestore', to: 'bigquery' },
    
    // Orchestration
    { from: 'composer', to: 'gke' },
    { from: 'composer', to: 'functions' },
    { from: 'composer', to: 'bigquery' },
  ]);

  const getNodePosition = (id: string) => {
    const node = services.find(s => s.id === id);
    return node ? { x: node.x + 60, y: node.y + 60 } : { x: 0, y: 0 };
  };

  return (
    <div className="w-full min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-10 h-10 text-blue-600" />
            <h1 className="text-slate-900">Arquitetura Google Cloud Platform</h1>
          </div>
          <p className="text-slate-600">Modelo de referência para aplicações escaláveis e seguras</p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="relative w-full h-[700px]">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const from = getNodePosition(conn.from);
                const to = getNodePosition(conn.to);
                return (
                  <line
                    key={idx}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#94a3b8"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>

            {/* Service nodes */}
            {services.map((service) => (
              <div
                key={service.id}
                className="absolute transition-transform hover:scale-105"
                style={{
                  left: `${service.x}px`,
                  top: `${service.y}px`,
                  zIndex: 10,
                }}
              >
                <div className="flex flex-col items-center gap-2 w-32">
                  <div className={`${service.color} text-white p-4 rounded-lg shadow-lg border-2 border-white`}>
                    {service.icon}
                  </div>
                  <span className="text-center text-slate-700 text-sm px-2 py-1 bg-white rounded shadow-sm border border-slate-200">
                    {service.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Region labels */}
            <div className="absolute top-4 right-4 bg-slate-100 px-4 py-2 rounded-lg border border-slate-300">
              <p className="text-slate-700 text-sm">Region: us-central1</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-slate-900 mb-3">Security & Identity</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-600 rounded"></div>
                Cloud IAM - Identidade e acesso
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                Cloud Armor - Proteção DDoS
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-slate-900 mb-3">Network & Frontend</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                Cloud CDN - Cache global
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                Load Balancer - Distribuição
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-slate-900 mb-3">Compute & Apps</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                GKE - Kubernetes
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                Cloud Run - Containers serverless
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                Cloud Functions - Funções serverless
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-teal-500 rounded"></div>
                Cloud Composer - Orquestração
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border border-slate-200">
            <h3 className="text-slate-900 mb-3">Data & Analytics</h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-sky-500 rounded"></div>
                Cloud SQL - Dados relacionais
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded"></div>
                Cloud Storage - Armazenamento objetos
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded"></div>
                Firestore - NoSQL
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-700 rounded"></div>
                BigQuery - Data warehouse
              </li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-slate-900 mb-4">Características da Arquitetura</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 text-sm">Segurança</p>
                <p className="text-slate-600 text-xs">IAM + Cloud Armor</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Workflow className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 text-sm">Escalabilidade</p>
                <p className="text-slate-600 text-xs">Auto-scaling em todas camadas</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 text-sm">Global</p>
                <p className="text-slate-600 text-xs">CDN distribuído mundialmente</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 text-sm">Analytics</p>
                <p className="text-slate-600 text-xs">BigQuery para insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GitBranch className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="text-slate-900 text-sm">Orquestração</p>
                <p className="text-slate-600 text-xs">Cloud Composer workflows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
