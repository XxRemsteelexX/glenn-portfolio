
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, Zap, Eye, Construction } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  stars: number;
  forks: number;
  language?: string;
  createdAt: string;
  status?: 'completed' | 'in-progress';
}

const fallbackProjects: Project[] = [
  {
    id: "p0",
    name: "OceanEterna",
    description: "High-performance local RAG system built in C++17. Indexes 2.45 billion tokens across 5M+ text chunks with 0-96ms search latency and 11-second cold startup. 100% accuracy on test suite, zero external dependencies, and zero per-query costs. Single-binary deployment — no Docker, database, or cloud required.",
    technologies: ["C++17", "Information Retrieval", "RAG", "Search Engine", "Compression", "Memory-Mapped I/O"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "C++",
    createdAt: new Date().toISOString(),
    status: "in-progress"
  },
  {
    id: "p1",
    name: "NFL_Big_Data_Bowl_2026",
    description: "Kaggle Bronze Medal (Top 8% of 1,134 teams) - Deep learning solution for predicting NFL player trajectories from tracking data. Explored 15+ architectures across 847+ experiments with systematic hyperparameter optimization.",
    githubUrl: "https://github.com/XxRemsteelexX/NFL-Big-Data-Bowl-2026-",
    technologies: ["Python", "PyTorch", "Spatial-Temporal Transformers", "GRU/RNN", "Multi-scale CNN", "Geometric Attention", "Perceiver IO", "Mixed Precision Training", "Multi-GPU Training", "Test-Time Augmentation", "Kaggle Competition"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Python",
    createdAt: new Date().toISOString()
  },
  {
    id: "p2",
    name: "RSNA_Intracranial_Aneurysm_Detection",
    description: "Comprehensive 3D deep learning solution for detecting and localizing intracranial aneurysms from CT angiography scans. First Kaggle competition with systematic exploration of 21 architectures across 5-fold cross-validation.",
    githubUrl: "https://github.com/XxRemsteelexX/RSNA-Intracranial-Aneurysm-Detection-Kaggle",
    technologies: ["Python", "PyTorch", "3D CNNs", "SE-ResNet", "DenseNet", "EfficientNet", "Medical Imaging", "DICOM/NIfTI", "Multi-GPU Training", "Kaggle"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Python",
    createdAt: new Date().toISOString()
  },
  {
    id: "p3",
    name: "missing-persons-outlier-detection",
    description: "Statistical analysis of 41K missing persons cases to detect serial crime patterns and trafficking corridors",
    githubUrl: "https://github.com/XxRemsteelexX/missing-persons-outlier-detection",
    liveUrl: "https://xxremsteelexx-missing-persons-outlier-dete-streamlit-app-dwe4j4.streamlit.app/",
    technologies: ["Python", "Streamlit", "Plotly", "Statistical Analysis", "Geospatial Analysis", "Time Series Forecasting", "Crime Analytics", "Data Visualization"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Python",
    createdAt: new Date().toISOString()
  },
  {
    id: "p4",
    name: "Kaggle_House_Prices_Advanced_Regression",
    description: "Comprehensive machine learning solution for Kaggle House Prices competition featuring advanced feature engineering, ensemble methods, and modern AutoML techniques",
    githubUrl: "https://github.com/XxRemsteelexX/Kaggle--House-Prices---Advanced-Regression-Techniques",
    technologies: ["Python", "Jupyter Notebook", "XGBoost", "LightGBM", "CatBoost", "TabPFN", "AutoGluon", "scikit-learn", "GPU Acceleration", "Feature Engineering", "Ensemble Learning", "Kaggle"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Jupyter Notebook",
    createdAt: new Date().toISOString()
  },
  {
    id: "p5",
    name: "Blue-Zones-Longevity-Analysis",
    description: "Independent research investigating gravitational variations and longevity in Blue Zones. Advanced ML ensemble, statistical analysis, and actionable policy recommendations for extending life expectancy.",
    githubUrl: "https://github.com/XxRemsteelexX/Blue-Zones-Longevity-Analysis",
    liveUrl: "https://xxremsteelexx-blue-zones-longevity--blue-zones-dashboard-xgbvew.streamlit.app/",
    technologies: ["Jupyter Notebook", "Machine Learning", "Statistical Analysis", "Research", "Data Science", "Ensemble Methods", "Streamlit"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Jupyter Notebook",
    createdAt: new Date().toISOString()
  },
  {
    id: "p6",
    name: "business-analytics-AI-platform",
    description: "AI-powered Excel analytics platform for Thompson Parking & Mobility Consultants. Upload Excel files, get instant business insights, generate professional charts, and chat with your data using natural language queries.",
    githubUrl: "https://github.com/XxRemsteelexX/business-analytics-AI-platform",
    liveUrl: "https://business-analytics-ai-platform-production.up.railway.app/",
    technologies: ["TypeScript", "Next.js", "AI", "Excel Processing", "Business Intelligence", "Natural Language Processing"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "TypeScript",
    createdAt: new Date().toISOString()
  },
  {
    id: "p7",
    name: "TandemAI",
    description: "Local-First LLM Ensemble Orchestration Platform. Let your AI models work together: relay, debate, verify. Support for Ollama, LM Studio, OpenAI, Anthropic, Groq and more.",
    githubUrl: "https://github.com/XxRemsteelexX/TandemAI",
    technologies: ["TypeScript", "React", "Node.js", "AI Orchestration", "LLM Integration", "Privacy-First"],
    featured: false,
    stars: 0,
    forks: 0,
    language: "TypeScript",
    createdAt: new Date().toISOString()
  },
  {
    id: "p8",
    name: "Ml-Model-Recommender",
    description: "Automated ML model selection for tabular data. Analyzes datasets, compares preprocessing strategies, trains baselines, and provides actionable recommendations.",
    githubUrl: "https://github.com/XxRemsteelexX/Ml-Model-Recommender",
    technologies: ["Jupyter Notebook", "Python", "Machine Learning", "AutoML", "Data Analysis", "scikit-learn", "Model Selection"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Jupyter Notebook",
    createdAt: new Date().toISOString()
  },
  {
    id: "p9",
    name: "Computer-Vision-Portfolio",
    description: "Advanced computer vision portfolio featuring GAN face generation and CNN landmark classification with production-ready implementations",
    githubUrl: "https://github.com/XxRemsteelexX/Computer-Vision-Portfolio",
    technologies: ["HTML", "Computer Vision", "GANs", "CNNs", "Deep Learning", "Production Ready"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "HTML",
    createdAt: new Date().toISOString()
  },
  {
    id: "p10",
    name: "Apollo_Healthcare_Connect",
    description: "Multi-modal AI healthcare triage system with deep learning models for intelligent patient routing and provider preparation",
    githubUrl: "https://github.com/XxRemsteelexX/Apollo_Healthcare_Connect",
    liveUrl: "https://apollohealthcareconnect.com",
    technologies: ["HTML", "Python", "PyTorch", "TensorFlow", "DistilBERT", "Flask", "AWS", "Multi-modal AI", "Healthcare AI"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "HTML",
    createdAt: new Date().toISOString()
  },
  {
    id: "p11",
    name: "NFL_Rookie_WR_1K_Analysis",
    description: "Capstone project for Master's in Data Science - using previous years rookie statistics to determine future WR production",
    githubUrl: "https://github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis",
    technologies: ["Jupyter Notebook", "Python", "scikit-learn", "XGBoost", "Sports Analytics", "Machine Learning", "Feature Engineering"],
    featured: true,
    stars: 0,
    forks: 0,
    language: "Jupyter Notebook",
    createdAt: new Date().toISOString()
  },
  {
    id: "p12",
    name: "YouTube_Video_Analyzer",
    description: "GPU-accelerated multimodal AI for YouTube video analysis with transcription, visual frame analysis, and comprehensive summaries",
    githubUrl: "https://github.com/XxRemsteelexX/XxRemsteelexX-YouTube_Video_text_-_Description_Analyzer",
    technologies: ["Python", "FastAPI", "Streamlit", "PyTorch", "Whisper", "BLIP", "BART", "Multi-modal AI", "Computer Vision", "NLP", "GPU Acceleration"],
    featured: false,
    stars: 0,
    forks: 0,
    language: "Python",
    createdAt: new Date().toISOString()
  },
];

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        if (data.projects && data.projects.length > 0) {
          setProjects(data.projects);
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const filteredProjects = projects.filter(project =>
    filter === 'all' || (filter === 'featured' && project.featured)
  );

  return (
    <section id="projects" className="py-20 section-bg-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore my portfolio of AI and data science projects, from healthcare applications
            to sports analytics and optimization solutions.
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Projects ({projects.length})
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
            >
              <Star className="w-4 h-4 mr-2" />
              Featured ({projects.filter(p => p.featured).length})
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
              onMouseEnter={() => project.liveUrl && setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <Card className="h-full hover-lift glass-effect group relative overflow-hidden">
                {/* Live Preview Overlay - Only for apps that allow iframe embedding (not Streamlit) */}
                <AnimatePresence>
                  {project.liveUrl && hoveredProject === project.id &&
                   (project.name === "Apollo_Healthcare_Connect" || project.name === "business-analytics-AI-platform") && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-50 bg-background/95 backdrop-blur-sm p-4 flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold">Live Preview</span>
                        </div>
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" variant="default">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Open Full
                          </Button>
                        </Link>
                      </div>
                      <div className="flex-1 rounded-lg overflow-hidden border-2 border-primary/20 bg-white">
                        <iframe
                          src={project.liveUrl}
                          className="w-full h-full"
                          title={`${project.name} preview`}
                          sandbox="allow-scripts allow-same-origin allow-forms"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                        {project.featured && (
                          <Star className="inline-block w-4 h-4 ml-2 text-yellow-500 fill-current" />
                        )}
                        {project.status === 'in-progress' && (
                          <Badge className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/30 text-xs align-middle">
                            <Construction className="w-3 h-3 mr-1" />
                            In Progress
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {project.language && (
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>{project.language}</span>
                      </div>
                    )}
                    {project.stars > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{project.technologies.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:border-primary transition-colors"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full relative group/btn"
                        >
                          <Eye className="w-4 h-4 mr-2 group-hover/btn:hidden" />
                          <ExternalLink className="w-4 h-4 mr-2 hidden group-hover/btn:inline-block" />
                          <span className="group-hover/btn:hidden">Preview</span>
                          <span className="hidden group-hover/btn:inline">Open Live</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub sync status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="inline-block p-4 glass-effect">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Projects automatically synced from</span>
              <Link
                href="https://github.com/XxRemsteelexX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
