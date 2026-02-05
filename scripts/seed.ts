
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface ProjectData {
  name: string;
  description: string;
  longDescription?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  imageUrl?: string;
  featured: boolean;
  language?: string;
}

interface SkillData {
  name: string;
  category: string;
  proficiency: string;
  yearsExp?: number;
  featured: boolean;
}

interface CertificationData {
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  featured: boolean;
}

const projects: ProjectData[] = [
  {
    name: "OceanEterna",
    description: "Multi-month engineering effort building a high-performance local RAG system. Originally prototyped in Python but rewritten from scratch in C++17 for performance — evolved through 4 major versions with systematic optimization. Search engine core indexes 2.45 billion tokens across 5M+ chunks with 0-42ms search latency (avg 12ms, down from 500ms in v1) and 12-second cold startup (down from 41s). Runs entirely on CPU with minimal RAM. Dual LZ4/Zstd compression with auto-format detection. Conversations and queries continuously indexed with intelligent tagging; supports ingesting any file type to grow the corpus. 47 tests at 100% accuracy, 15 REST API endpoints, zero per-query costs — no GPU, Docker, database, or cloud required. Next: LLM chat interface and MCP tool integration for terminal-based AI workflows and project knowledge management.",
    technologies: ["C++17", "Information Retrieval", "RAG", "Search Engine", "LZ4/Zstd Compression", "Memory-Mapped I/O", "REST API", "BM25", "MCP"],
    featured: true,
    language: "C++"
  },
  {
    name: "NFL_Big_Data_Bowl_2026",
    description: "Kaggle Bronze Medal (Top 8% of 1,134 teams) - Deep learning solution for predicting NFL player trajectories from tracking data. Explored 15+ architectures across 847+ experiments with systematic hyperparameter optimization.",
    longDescription: "Bronze Medal achievement in Kaggle's NFL Big Data Bowl 2026 competition (Top 8% of 1,134 teams). Developed comprehensive deep learning pipeline for player trajectory prediction featuring: 8 model architectures (Spatial-Temporal Transformers, Multi-scale CNN, GRU, Position-Specific ST, Geometric Network, Perceiver IO, Co4), 20-fold cross-validation with multi-seed ensembling, 167 engineered features (kinematics, ball-relative, temporal, geometric), novel geometric attention with Voronoi tessellation, and Test-Time Augmentation providing +0.005-0.010 improvement. Best ensemble achieved 0.540 Public LB score. Key discovery: Architecture diversity in ensembles outperforms model stacking.",
    githubUrl: "https://github.com/XxRemsteelexX/NFL-Big-Data-Bowl-2026-",
    imageUrl: "https://storage.googleapis.com/kaggle-media/Images/competition-medals/bronze-medal-2026.png",
    technologies: ["Python", "PyTorch", "Spatial-Temporal Transformers", "GRU/RNN", "Multi-scale CNN", "Geometric Attention", "Perceiver IO", "Mixed Precision Training", "Multi-GPU Training", "Test-Time Augmentation", "Kaggle Competition"],
    featured: true,
    language: "Python"
  },
  {
    name: "RSNA_Intracranial_Aneurysm_Detection",
    description: "Comprehensive 3D deep learning solution for detecting and localizing intracranial aneurysms from CT angiography scans. First Kaggle competition with systematic exploration of 21 architectures across 5-fold cross-validation.",
    longDescription: "Advanced 3D medical imaging project for Kaggle RSNA competition. Trained 105 models (21 architectures × 5 folds), tested 51 ensemble configurations. Best ensemble achieved AUC 0.8624. Key discovery: smaller models outperform larger ones on limited medical data (r=-0.42, p<0.01). Multi-GPU training on 4 GPUs with complete DICOM→NIfTI→ROI extraction→Training→Ensemble pipeline.",
    githubUrl: "https://github.com/XxRemsteelexX/RSNA-Intracranial-Aneurysm-Detection-Kaggle",
    technologies: ["Python", "PyTorch", "3D CNNs", "SE-ResNet", "DenseNet", "EfficientNet", "Medical Imaging", "DICOM/NIfTI", "Multi-GPU Training", "Kaggle"],
    featured: true,
    language: "Python"
  },
  {
    name: "missing-persons-outlier-detection",
    description: "Statistical analysis of 41K missing persons cases to detect serial crime patterns and trafficking corridors",
    longDescription: "Statistical outlier detection system analyzing 41,200 cases (15,457 bodies + 25,743 missing persons) across 54 states and 101 years. Uses standard deviation methodology to identify anomalous crime patterns. Detected I-35 corridor trafficking crisis (+170% increase), validated against known serial killers (Ridgway 4.38σ detected, Gacy 1.34σ detected). Flags 269 counties (2.9%) for priority investigation. Interactive Streamlit dashboard with geospatial visualization, temporal forecasting, and multi-tier correlation analysis.",
    githubUrl: "https://github.com/XxRemsteelexX/missing-persons-outlier-detection",
    liveUrl: "https://xxremsteelexx-missing-persons-outlier-dete-streamlit-app-dwe4j4.streamlit.app/",
    technologies: ["Python", "Streamlit", "Plotly", "Statistical Analysis", "Geospatial Analysis", "Time Series Forecasting", "Crime Analytics", "Data Visualization"],
    featured: true,
    language: "Python"
  },
  {
    name: "Kaggle_House_Prices_Advanced_Regression",
    description: "Comprehensive machine learning solution for Kaggle House Prices competition featuring advanced feature engineering, ensemble methods, and modern AutoML techniques",
    longDescription: "Advanced regression project implementing 100+ engineered features (age-based, quality interactions, aggregations) with 20+ model ensemble including XGBoost, LightGBM, CatBoost, Ridge, Lasso, and ElasticNet. Integrates modern AutoML tools (TabPFN, AutoGluon 2024-2025) with GPU-accelerated training. Features multi-level stacking with optimized weighted blending and complete ML pipeline documented across 5 comprehensive Jupyter notebooks. Demonstrates systematic experimentation with cross-validation and inverse RMSE weighting strategy.",
    githubUrl: "https://github.com/XxRemsteelexX/Kaggle--House-Prices---Advanced-Regression-Techniques",
    technologies: ["Python", "Jupyter Notebook", "XGBoost", "LightGBM", "CatBoost", "TabPFN", "AutoGluon", "scikit-learn", "GPU Acceleration", "Feature Engineering", "Ensemble Learning", "Kaggle"],
    featured: true,
    language: "Jupyter Notebook"
  },
  {
    name: "Blue-Zones-Longevity-Analysis",
    description: "Independent research investigating gravitational variations and longevity in Blue Zones. Advanced ML ensemble, statistical analysis, and actionable policy recommendations for extending life expectancy.",
    longDescription: "Cutting-edge research project combining gravitational physics with longevity studies. Uses advanced machine learning ensembles to analyze patterns in Blue Zones regions where people live exceptionally long lives. Features comprehensive statistical analysis and provides actionable policy recommendations based on scientific findings.",
    githubUrl: "https://github.com/XxRemsteelexX/Blue-Zones-Longevity-Analysis",
    liveUrl: "https://xxremsteelexx-blue-zones-longevity--blue-zones-dashboard-xgbvew.streamlit.app/",
    technologies: ["Jupyter Notebook", "Machine Learning", "Statistical Analysis", "Research", "Data Science", "Ensemble Methods", "Streamlit"],
    featured: true,
    language: "Jupyter Notebook"
  },
  {
    name: "business-analytics-AI-platform",
    description: "AI-powered Excel analytics platform for Thompson Parking & Mobility Consultants. Upload Excel files, get instant business insights, generate professional charts, and chat with your data using natural language queries.",
    longDescription: "Professional business intelligence platform built for Thompson PMC. Features natural language querying of Excel data, automated chart generation, executive-ready visualizations, and AI-powered business insights. Built with Next.js and Thompson PMC branding for enterprise use.",
    githubUrl: "https://github.com/XxRemsteelexX/business-analytics-AI-platform",
    liveUrl: "https://business-analytics-ai-platform-production.up.railway.app/",
    technologies: ["TypeScript", "Next.js", "AI", "Excel Processing", "Business Intelligence", "Natural Language Processing"],
    featured: true,
    language: "TypeScript"
  },
  {
    name: "TandemAI",
    description: "Local-First LLM Ensemble Orchestration Platform. Let your AI models work together: relay, debate, verify. Support for Ollama, LM Studio, OpenAI, Anthropic, Groq and more.",
    longDescription: "Innovative AI orchestration platform that enables multiple Large Language Models to collaborate through different modes including relay, debate, and verification. Supports 10+ providers including local models (Ollama, LM Studio) and cloud APIs (OpenAI, Anthropic, Groq). Features real-time streaming, conversation history, and privacy-first design.",
    githubUrl: "https://github.com/XxRemsteelexX/TandemAI",
    technologies: ["TypeScript", "React", "Node.js", "AI Orchestration", "LLM Integration", "Privacy-First"],
    featured: false,
    language: "TypeScript"
  },
  {
    name: "Ml-Model-Recommender",
    description: "Automated ML model selection for tabular data. Analyzes datasets, compares preprocessing strategies, trains baselines, and provides actionable recommendations.",
    longDescription: "Intelligent machine learning assistant that automates the model selection process for tabular datasets. Features comprehensive EDA, automatic problem type inference, smart preprocessing techniques, high-cardinality and class imbalance detection, model baseline generation with cross-validation, and exportable diagnostic reports in markdown and HTML formats.",
    githubUrl: "https://github.com/XxRemsteelexX/Ml-Model-Recommender",
    technologies: ["Jupyter Notebook", "Python", "Machine Learning", "AutoML", "Data Analysis", "scikit-learn", "Model Selection"],
    featured: true,
    language: "Jupyter Notebook"
  },
  {
    name: "Computer-Vision-Portfolio",
    description: "Advanced computer vision portfolio featuring GAN face generation and CNN landmark classification with production-ready implementations",
    longDescription: "Comprehensive computer vision portfolio showcasing advanced techniques including Generative Adversarial Networks for face generation and Convolutional Neural Networks for landmark classification. Features production-ready implementations with optimized performance and deployment considerations.",
    githubUrl: "https://github.com/XxRemsteelexX/Computer-Vision-Portfolio",
    technologies: ["HTML", "Computer Vision", "GANs", "CNNs", "Deep Learning", "Production Ready"],
    featured: true,
    language: "HTML"
  },
  {
    name: "Apollo_Healthcare_Connect",
    description: "Multi-modal AI healthcare triage system with deep learning models for intelligent patient routing and provider preparation",
    longDescription: "Apollo Healthcare Connect - A comprehensive AI-powered healthcare triage system that analyzes both text descriptions and medical images to provide accurate initial assessments with 93.8% accuracy. Combines DistilBERT for NLP and computer vision models for image analysis. Live production deployment serving real patients.",
    githubUrl: "https://github.com/XxRemsteelexX/Apollo_Healthcare_Connect",
    liveUrl: "https://apollohealthcareconnect.com",
    technologies: ["HTML", "Python", "PyTorch", "TensorFlow", "DistilBERT", "Flask", "AWS", "Multi-modal AI", "Healthcare AI"],
    featured: true,
    language: "HTML"
  },
  {
    name: "NFL_Rookie_WR_1K_Analysis",
    description: "Capstone project for Master's in Data Science - using previous years rookie statistics to determine future WR production",
    longDescription: "Advanced machine learning analysis with feature optimization and temporal validation to predict which NFL rookie wide receivers will achieve 1000+ yard receiving seasons. Achieved 90.9% ROC AUC with sophisticated overfitting reduction techniques and comprehensive data pipeline covering 2006-2024.",
    githubUrl: "https://github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis",
    technologies: ["Jupyter Notebook", "Python", "scikit-learn", "XGBoost", "Sports Analytics", "Machine Learning", "Feature Engineering"],
    featured: true,
    language: "Jupyter Notebook"
  },
  {
    name: "Data-Production-Pipe-Line-and-Deployment",
    description: "Comprehensive data pipeline for production ML deployment with automated workflows and monitoring",
    longDescription: "Production-ready data pipeline architecture featuring automated data processing, model training workflows, deployment automation, and monitoring systems. Demonstrates end-to-end MLOps practices for scalable machine learning systems.",
    githubUrl: "https://github.com/XxRemsteelexX/Data-Production-Pipe-Line-and-Deployment",
    technologies: ["Jupyter Notebook", "MLOps", "Data Pipelines", "Automation", "Monitoring", "Production Deployment"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "Classification-Data-Mining-Clustering-Techniques-Time-Series-Modeling",
    description: "Comprehensive data mining project featuring classification, clustering, and time series modeling techniques",
    longDescription: "Advanced data mining project demonstrating multiple analytical techniques including classification algorithms, clustering methods, and time series modeling. Showcases comprehensive statistical analysis and machine learning approaches for complex data patterns.",
    githubUrl: "https://github.com/XxRemsteelexX/Classification-Data-Mining-Clustering-Techniques-Time-Series-Modeling",
    technologies: ["Jupyter Notebook", "Data Mining", "Classification", "Clustering", "Time Series", "Statistical Analysis"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "Principal-Component-Analysis",
    description: "Principal Component Analysis implementation and applications for dimensionality reduction",
    longDescription: "Comprehensive implementation of Principal Component Analysis for dimensionality reduction. Features mathematical foundations, practical applications, and visualization techniques for understanding high-dimensional data structures.",
    githubUrl: "https://github.com/XxRemsteelexX/Principal-Component-Analysis",
    technologies: ["Jupyter Notebook", "PCA", "Dimensionality Reduction", "Data Analysis", "Visualization"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "NYC-Airbnb-ML-Pipeline",
    description: "Machine learning pipeline for NYC Airbnb data analysis and price prediction",
    longDescription: "Comprehensive ML pipeline for analyzing NYC Airbnb data, featuring data preprocessing, feature engineering, model training, and price prediction capabilities. Demonstrates end-to-end machine learning workflow with real-world dataset.",
    githubUrl: "https://github.com/XxRemsteelexX/NYC-Airbnb-ML-Pipeline",
    technologies: ["Jupyter Notebook", "Machine Learning", "Data Pipeline", "Price Prediction", "Feature Engineering"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "Logistic-Regression-Analysis",
    description: "Comprehensive logistic regression analysis with statistical modeling techniques",
    longDescription: "Detailed implementation and analysis of logistic regression methods, featuring statistical foundations, model interpretation, and practical applications for classification problems.",
    githubUrl: "https://github.com/XxRemsteelexX/Logistic-Regression-Analysis",
    technologies: ["Jupyter Notebook", "Logistic Regression", "Statistical Analysis", "Classification", "Machine Learning"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "Statistical-Data-Mining",
    description: "Linear Regression Analysis and statistical data mining techniques",
    longDescription: "Comprehensive statistical data mining project featuring linear regression analysis, statistical modeling, and data exploration techniques. Demonstrates fundamental statistical methods for data analysis and interpretation.",
    githubUrl: "https://github.com/XxRemsteelexX/Statistical-Data-Mining",
    technologies: ["Jupyter Notebook", "Linear Regression", "Statistical Analysis", "Data Mining", "Statistical Modeling"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "Deploying-a-Scalable-ML-Pipeline-with-FastAPI",
    description: "Production ML deployment using FastAPI with scalable architecture and CI/CD integration",
    longDescription: "Professional ML deployment solution using FastAPI framework, featuring RESTful API development, CI/CD pipeline with GitHub Actions, comprehensive testing with pytest, and production deployment best practices.",
    githubUrl: "https://github.com/XxRemsteelexX/Deploying-a-Scalable-ML-Pipeline-with-FastAPI",
    technologies: ["Python", "FastAPI", "CI/CD", "GitHub Actions", "pytest", "ML Deployment", "API Development"],
    featured: false,
    language: "Python"
  },
  {
    name: "amazon_optimization",
    description: "Optimization model for Amazon's global distribution network using Python, PuLP, and Excel data.",
    longDescription: "Linear programming solution to optimize Amazon's multi-tier cargo distribution network, achieving 25.4% cost reduction. Features constraint satisfaction for capacity, flow balance, and demand optimization across 2 hubs, 3 focus cities, and 65 distribution centers.",
    githubUrl: "https://github.com/XxRemsteelexX/amazon_optimization",
    technologies: ["Jupyter Notebook", "Python", "PuLP", "Linear Programming", "Optimization", "Operations Research", "Supply Chain"],
    featured: false,
    language: "Jupyter Notebook"
  },
  {
    name: "YouTube_Video_Analyzer",
    description: "GPU-accelerated multimodal AI for YouTube video analysis with transcription, visual frame analysis, and comprehensive summaries",
    longDescription: "Advanced multimodal AI tool that analyzes YouTube videos using GPU-accelerated models. Features Whisper for audio transcription with timestamps, BLIP for visual frame captioning, smart audio-visual fusion with 84% average confidence, and BART for comprehensive summaries. Real-time processing updates with Streamlit UI and FastAPI backend. Exports to multiple formats including TXT, SRT subtitles, and Markdown reports.",
    githubUrl: "https://github.com/XxRemsteelexX/XxRemsteelexX-YouTube_Video_text_-_Description_Analyzer",
    technologies: ["Python", "FastAPI", "Streamlit", "PyTorch", "Whisper", "BLIP", "BART", "Multi-modal AI", "Computer Vision", "NLP", "GPU Acceleration"],
    featured: false,
    language: "Python"
  }
];

const skills: SkillData[] = [
  // Programming Languages
  { name: "Python", category: "Programming Languages", proficiency: "Expert", yearsExp: 4, featured: true },
  { name: "R", category: "Programming Languages", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "TypeScript", category: "Programming Languages", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "JavaScript", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: true },
  { name: "SQL", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: false },
  { name: "C++", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { name: "C#", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { name: "Java", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { name: "HTML/CSS", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: false },
  
  // AI/ML Frameworks
  { name: "PyTorch", category: "AI/ML Frameworks", proficiency: "Expert", yearsExp: 3, featured: true },
  { name: "TensorFlow", category: "AI/ML Frameworks", proficiency: "Expert", yearsExp: 3, featured: true },
  { name: "scikit-learn", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 4, featured: true },
  { name: "XGBoost", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "LightGBM", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "CatBoost", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "AutoGluon", category: "AI/ML Frameworks", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { name: "TabPFN", category: "AI/ML Frameworks", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { name: "Transformers", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "OpenAI API", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  
  // Web Frameworks
  { name: "Flask", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "FastAPI", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  { name: "Streamlit", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  { name: "React", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Node.js", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  
  // Cloud & Deployment
  { name: "AWS", category: "Cloud & Deployment", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Docker", category: "Cloud & Deployment", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { name: "CI/CD", category: "Cloud & Deployment", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { name: "Weights & Biases", category: "Cloud & Deployment", proficiency: "Advanced", yearsExp: 1, featured: false },
  
  // Data & Analytics
  { name: "pandas", category: "Data & Analytics", proficiency: "Expert", yearsExp: 4, featured: true },
  { name: "numpy", category: "Data & Analytics", proficiency: "Expert", yearsExp: 4, featured: false },
  { name: "Tableau", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Data Visualization", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 3, featured: true },
  { name: "Statistical Analysis", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 3, featured: false },
  { name: "MongoDB", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 1, featured: false },
  { name: "PostgreSQL", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 1, featured: false },
  
  // Specializations
  { name: "Computer Vision", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "3D Medical Imaging", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { name: "Natural Language Processing", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Multi-modal AI", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Healthcare AI", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { name: "Ensemble Learning", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { name: "Feature Engineering", category: "AI Specializations", proficiency: "Advanced", yearsExp: 3, featured: true },
  { name: "Statistical Anomaly Detection", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: false },
  { name: "Spatial-Temporal Transformers", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { name: "Trajectory Prediction", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { name: "GRU/RNN Architectures", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 1, featured: false },
  { name: "Geometric Deep Learning", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: false },
  { name: "Sports Analytics", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true }
];

const certifications: CertificationData[] = [
  {
    name: "CompTIA Data+",
    issuer: "CompTIA",
    issueDate: new Date("2024-02-01"),
    expiryDate: new Date("2027-02-01"),
    credentialId: "FBVPDK8621RQ1TW2",
    featured: true
  },
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    issueDate: new Date("2024-01-01"),
    expiryDate: new Date("2027-01-01"),
    featured: true
  },
  {
    name: "CompTIA A+",
    issuer: "CompTIA",
    issueDate: new Date("2023-06-01"),
    expiryDate: new Date("2026-06-01"),
    credentialId: "EJL6T0MQE2RQ149L",
    featured: false
  },
  {
    name: "Advanced Computer Vision and Deep Learning",
    issuer: "Udacity",
    issueDate: new Date("2025-07-01"),
    featured: true
  },
  {
    name: "Machine Learning DevOps",
    issuer: "Udacity",
    issueDate: new Date("2025-02-01"),
    featured: true
  },
  {
    name: "Building Generative Adversarial Networks",
    issuer: "Udacity",
    issueDate: new Date("2025-02-01"),
    featured: false
  },
  {
    name: "Convolutional Neural Networks",
    issuer: "Udacity",
    issueDate: new Date("2025-02-01"),
    featured: false
  },
  {
    name: "Transformer Models and BERT Model with Google Cloud",
    issuer: "Udacity",
    issueDate: new Date("2025-02-01"),
    featured: false
  },
  {
    name: "Introduction to Deep Learning",
    issuer: "Udacity",
    issueDate: new Date("2025-04-01"),
    featured: false
  }
];

async function main() {
  console.log('Starting database seeding...');
  
  try {
    // Clear existing data
    console.log('Clearing existing data...');
    await prisma.contact.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.certification.deleteMany();
    await prisma.resume.deleteMany();
    await prisma.gitHubSync.deleteMany();
    
    // Seed Projects
    console.log('Seeding projects...');
    for (const project of projects) {
      await prisma.project.create({
        data: {
          ...project,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastSyncAt: new Date()
        }
      });
    }
    console.log(`Created ${projects.length} projects`);
    
    // Seed Skills
    console.log('Seeding skills...');
    for (const skill of skills) {
      await prisma.skill.create({
        data: {
          ...skill,
          createdAt: new Date()
        }
      });
    }
    console.log(`Created ${skills.length} skills`);

    // Seed Certifications
    console.log('Seeding certifications...');
    for (const certification of certifications) {
      await prisma.certification.create({
        data: {
          ...certification,
          createdAt: new Date()
        }
      });
    }
    console.log(`Created ${certifications.length} certifications`);

    // Create initial GitHub sync record
    console.log('Creating GitHub sync record...');
    await prisma.gitHubSync.create({
      data: {
        username: 'XxRemsteelexX',
        totalRepos: projects.length,
        syncStatus: 'success',
        lastSyncAt: new Date()
      }
    });
    console.log('GitHub sync record created');
    
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error during seeding:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
