"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Maximize2, Activity, Brain, Map } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const demos = [
  {
    id: "apollo",
    name: "Apollo Healthcare Connect",
    url: "https://apollohealthcareconnect.com",
    description: "Multi-modal AI healthcare triage system with deep learning models for intelligent patient routing",
    icon: Brain,
    technologies: ["PyTorch", "DistilBERT", "Flask", "AWS", "Multi-modal AI"],
    stats: {
      accuracy: "93.8%",
      users: "Live Production",
      models: "2 AI Models"
    },
    allowsIframe: true
  },
  {
    id: "thompson",
    name: "Thompson PMC Analytics Platform",
    url: "https://business-analytics-ai-platform-production.up.railway.app/",
    description: "AI-powered Excel analytics with natural language queries and automated chart generation",
    icon: Activity,
    technologies: ["Next.js", "Azure OpenAI", "Excel Processing", "Business Intelligence"],
    stats: {
      formats: "Excel, CSV, PDF",
      charts: "Auto-Generated",
      privacy: "Enterprise Grade"
    },
    allowsIframe: true
  },
  {
    id: "blue-zones",
    name: "Blue Zones Longevity Analysis",
    url: "https://xxremsteelexx-blue-zones-longevity--blue-zones-dashboard-xgbvew.streamlit.app/",
    description: "Gravitational physics and longevity machine learning research with interactive visualizations",
    icon: Activity,
    technologies: ["Streamlit", "Machine Learning", "Statistical Analysis", "Plotly"],
    stats: {
      regions: "5 Blue Zones",
      factors: "15+ Analysis Points",
      models: "Ensemble Methods"
    },
    allowsIframe: false
  },
  {
    id: "missing-persons",
    name: "Missing Persons Outlier Detection",
    url: "https://xxremsteelexx-missing-persons-outlier-dete-streamlit-app-dwe4j4.streamlit.app/",
    description: "Statistical analysis of 41K cases to detect serial crime patterns and trafficking corridors",
    icon: Map,
    technologies: ["Streamlit", "Statistical Analysis", "Geospatial", "Time Series"],
    stats: {
      cases: "41,200 Cases",
      alerts: "269 Counties Flagged",
      years: "101 Years Data"
    },
    allowsIframe: false
  }
];

export default function LiveDemosPage() {
  const [activeDemo, setActiveDemo] = useState(demos[0].id);

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 gradient-text">Live Demos</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore interactive demonstrations of my deployed AI and data science applications.
            All projects are live and fully functional.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeDemo} onValueChange={setActiveDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <TabsTrigger key={demo.id} value={demo.id} className="flex items-center space-x-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{demo.name}</span>
                  <span className="sm:hidden">
                    {demo.id === 'apollo' ? 'Apollo' :
                     demo.id === 'thompson' ? 'Thompson' :
                     demo.id === 'blue-zones' ? 'Blue Zones' :
                     'Missing Persons'}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <TabsContent key={demo.id} value={demo.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  {/* Info Card */}
                  <Card className="p-6 glass-effect">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{demo.name}</h2>
                          <p className="text-muted-foreground">{demo.description}</p>
                        </div>
                      </div>
                      <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Full Screen
                        </Button>
                      </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(demo.stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-muted/50 rounded-lg">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {demo.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>

                  {/* Live Preview */}
                  <Card className="p-6 glass-effect">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-green-500 animate-pulse" />
                        <span className="font-semibold">Live Application</span>
                      </div>
                      <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                        <Button size="lg">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open Live Demo
                        </Button>
                      </Link>
                    </div>

                    {/* Iframe Container - Only for apps that allow embedding (not Streamlit) */}
                    {demo.allowsIframe ? (
                      <>
                        <div className="relative w-full bg-white rounded-lg overflow-hidden border-2 border-primary/20" style={{ height: "70vh" }}>
                          <iframe
                            src={demo.url}
                            className="w-full h-full"
                            title={demo.name}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 text-center">
                          Interactive live demo - click elements to explore. Open fullscreen for best experience.
                        </p>
                      </>
                    ) : (
                      <div className="relative w-full rounded-lg overflow-hidden border-2 border-primary/20 bg-muted/20 flex items-center justify-center" style={{ height: "70vh" }}>
                        <div className="text-center p-8">
                          <ExternalLink className="w-16 h-16 mx-auto mb-4 text-primary" />
                          <h3 className="text-2xl font-bold mb-2">Streamlit Cloud Application</h3>
                          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                            This app uses Streamlit Cloud and cannot be embedded. Click the button above to open the full interactive dashboard in a new tab.
                          </p>
                          <Link href={demo.url} target="_blank" rel="noopener noreferrer">
                            <Button size="lg">
                              <ExternalLink className="w-5 h-5 mr-2" />
                              Launch {demo.name}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>

        {/* Back to Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/#projects">
            <Button variant="outline" size="lg">
              ← Back to Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
