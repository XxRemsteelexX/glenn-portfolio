"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const [activeVersion, setActiveVersion] = useState<"onepage" | "detailed">("detailed");

  const downloadFile = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/resume/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Download Buttons */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Glenn Dalbey - Resume</h1>
            </div>

            {/* Version Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={activeVersion === "onepage" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveVersion("onepage")}
              >
                One Page
              </Button>
              <Button
                variant={activeVersion === "detailed" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveVersion("detailed")}
              >
                Detailed
              </Button>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                size="sm"
                onClick={() => downloadFile(
                  activeVersion === "onepage"
                    ? "Glenn_Dalbey_Resume_OnePage.pdf"
                    : "Glenn_Dalbey_Resume_Detailed.pdf"
                )}
                className="hover-lift"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          key={activeVersion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-[8.5in] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          {activeVersion === "onepage" ? <OnePageResume /> : <DetailedResume />}
        </motion.div>
      </div>
    </div>
  );
}

function OnePageResume() {
  return (
    <div className="resume-container" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: "10pt",
      lineHeight: 1.2,
      color: "#333"
    }}>
      <style jsx>{`
        .resume-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.15in 0.3in;
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          border-bottom: 3px solid #3498db;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .resume-name {
          font-size: 22pt;
          font-weight: bold;
          color: #fff;
          letter-spacing: 1pt;
          margin: 0;
        }
        .name-divider {
          width: 2px;
          height: 28px;
          background: #3498db;
        }
        .resume-title {
          font-size: 10pt;
          color: #bdc3c7;
          font-style: italic;
          margin: 0;
        }
        .header-right {
          text-align: right;
        }
        .contact-row {
          font-size: 8.5pt;
          color: #ecf0f1;
          line-height: 1.4;
        }
        .contact-row a {
          color: #85c1e9;
          text-decoration: none;
        }
        .contact-separator {
          color: #7f8c8d;
          margin: 0 4px;
        }
        .resume-body {
          display: grid;
          grid-template-columns: 2.3in 1fr;
        }
        .sidebar {
          background: #f8f9fa;
          padding: 0.2in 0.2in;
          border-right: 2px solid #e9ecef;
        }
        .main-content {
          padding: 0.2in 0.35in;
        }
        .section-title {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 2pt;
          margin-bottom: 5pt;
          margin-top: 8pt;
        }
        .section-title:first-child {
          margin-top: 0;
        }
        .main-section-title {
          font-size: 11pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 2pt;
          margin-bottom: 6pt;
          margin-top: 10pt;
        }
        .main-section-title:first-child {
          margin-top: 0;
        }
        .skills-category {
          font-size: 9pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 1pt;
          margin-top: 5pt;
        }
        .skills-list {
          font-size: 8pt;
          color: #555;
          margin-bottom: 4pt;
          line-height: 1.15;
        }
        .education-item {
          margin-bottom: 6pt;
        }
        .degree {
          font-size: 9pt;
          font-weight: bold;
          color: #2c3e50;
        }
        .school {
          font-size: 8pt;
          color: #555;
          font-style: italic;
        }
        .education-dates {
          font-size: 8pt;
          color: #777;
        }
        .education-notes {
          font-size: 8pt;
          color: #666;
          margin-top: 1pt;
        }
        .cert-item {
          font-size: 8pt;
          color: #555;
          margin-bottom: 2pt;
        }
        .job-title {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 1pt;
        }
        .company {
          font-size: 9pt;
          color: #555;
          margin-bottom: 4pt;
          font-style: italic;
        }
        .dates-inline {
          font-size: 8pt;
          color: #777;
          font-style: normal;
        }
        .project-title {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 1pt;
        }
        .project-subtitle {
          font-size: 9pt;
          color: #555;
          font-style: italic;
          margin-bottom: 4pt;
        }
        ul {
          margin-left: 12pt;
          margin-bottom: 6pt;
        }
        li {
          margin-bottom: 1pt;
          font-size: 9pt;
          line-height: 1.15;
        }
        .compact-summary {
          font-size: 9pt;
          line-height: 1.25;
          margin-bottom: 8pt;
        }
      `}</style>

      <div className="resume-header">
        <div className="header-left">
          <div className="resume-name">GLENN DALBEY</div>
          <div className="name-divider"></div>
          <div className="resume-title">Data Science & Analytics</div>
        </div>
        <div className="header-right">
          <div className="contact-row">
            319-233-4445<span className="contact-separator">|</span>dalbeyglenn@gmail.com
          </div>
          <div className="contact-row">
            <a href="https://linkedin.com/in/glenn-dalbey-205b7a44">LinkedIn</a><span className="contact-separator">|</span><a href="https://github.com/XxRemsteelexX">GitHub</a><span className="contact-separator">|</span><a href="https://www.glenndalbey.com">Portfolio</a>
          </div>
        </div>
      </div>

      <div className="resume-body">
        <div className="sidebar">
          <div className="section-title">TECHNICAL SKILLS</div>

          <div className="skills-category">Programming</div>
          <div className="skills-list">Python (Expert), SQL, TypeScript, JavaScript, R, C++</div>

          <div className="skills-category">Deep Learning</div>
          <div className="skills-list">PyTorch, TensorFlow, Spatial-Temporal Transformers, GRU/RNN, 3D CNNs, Geometric Attention</div>

          <div className="skills-category">ML & Data Science</div>
          <div className="skills-list">scikit-learn, XGBoost, Pandas, NumPy, Ensemble Methods, Feature Engineering</div>

          <div className="skills-category">Cloud & Deployment</div>
          <div className="skills-list">AWS (Certified), Multi-GPU Training, Mixed Precision, Docker, Flask, FastAPI</div>

          <div className="skills-category">Homelab & Systems</div>
          <div className="skills-list">Proxmox, pfSense, n8n, RAG Pipelines, 10Gb Networking, Ubuntu Server</div>

          <div className="skills-category">Specializations</div>
          <div className="skills-list">Trajectory Prediction, 3D Medical Imaging, Computer Vision, NLP, Multi-modal AI</div>

          <div className="section-title">EDUCATION</div>

          <div className="education-item">
            <div className="degree">MS, Data Science & Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Aug 2024 - Aug 2025</div>
            <div className="education-notes">Healthcare AI Capstone (Production)</div>
          </div>

          <div className="education-item">
            <div className="degree">BS, Data Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Mar 2023 - Sep 2024</div>
            <div className="education-notes">NFL Prediction Capstone</div>
          </div>

          <div className="education-item">
            <div className="degree">AS, IT / Programming + Data Analytics Cert</div>
            <div className="school">Clinton Community College</div>
            <div className="education-dates">Jan 2022 - Dec 2022</div>
          </div>

          <div className="education-item">
            <div className="degree">AA, Art Studies</div>
            <div className="school">Hawkeye Community College</div>
            <div className="education-dates">Sep 2019 - Dec 2020</div>
          </div>

          <div className="section-title">CERTIFICATIONS</div>
          <div className="cert-item">• CompTIA Data+ (2024-2027)</div>
          <div className="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
          <div className="cert-item">• CompTIA A+ (2023-2026)</div>
          <div className="cert-item">• Udacity: Deep Learning, CV, GANs, CNNs, Transformers, ML DevOps</div>

          <div className="section-title">HONORS</div>
          <div className="cert-item">• National Society of Leadership and Success</div>
          <div className="cert-item">• Phi Theta Kappa Honor Society</div>
          <div className="cert-item">• Eagle Scout</div>
        </div>

        <div className="main-content">
          <div className="main-section-title">PROFESSIONAL SUMMARY</div>
          <div className="compact-summary">
            Data Scientist with an MS in Data Science who builds things that actually work. I enjoy building and training models on my own multi-GPU homelab, deploying new techniques, and discovering unique ways to solve problems. Whether it's analysis, research, or projections, I dig into how something ticks, figure out why, and extract information that drives better outcomes. My multi-node homelab stack lets me run production applications, train models, and run MLflow, all on my own hardware. 20+ projects on GitHub covering deep learning, medical imaging, NLP, computer vision, and analytics.
          </div>

          <div className="main-section-title">FEATURED PROJECTS</div>

          <div className="project-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>NFL Big Data Bowl 2026 | Kaggle Bronze Medal</span>
            <img src="/images/kaggle-bronze-2026.png" alt="Kaggle Bronze Medal" style={{ height: "28px", width: "28px", borderRadius: "50%" }} />
          </div>
          <div className="project-subtitle">Player Trajectory Prediction | Top 8% of 1,134 teams</div>
          <ul>
            <li><strong>Bronze Medal</strong> in prestigious Kaggle competition predicting NFL player trajectories</li>
            <li>Conducted 847+ experiments across 15+ architectures (ST Transformers, GRU, CNN, Perceiver IO)</li>
            <li>Best ensemble: 3-model blend achieving 0.540 Public LB with architecture diversity strategy</li>
            <li>Engineered 167 features (kinematics, ball-relative, temporal, geometric with Voronoi tessellation)</li>
          </ul>

          <div className="project-title">RSNA Intracranial Aneurysm Detection | Kaggle Competition</div>
          <div className="project-subtitle">3D Medical Imaging Deep Learning | 105 Models Trained</div>
          <ul>
            <li>Trained 105 models (21 architectures × 5 folds) for CT angiography aneurysm detection</li>
            <li>Best ensemble AUC 0.8624 with discovery that smaller models outperform larger on limited medical data</li>
            <li>Built complete pipeline: DICOM→NIfTI→ROI extraction→Training→Ensemble on 4 GPUs</li>
          </ul>

          <div className="project-title">Apollo Healthcare Connect | apollohealthcareconnect.com</div>
          <div className="project-subtitle">Production Multi-modal AI Healthcare Triage | MS Capstone</div>
          <ul>
            <li>Live production healthcare AI triage achieving <strong>93.8% accuracy</strong> with sub-second response</li>
            <li>5-model ensemble combining DistilBERT (NLP) and CNNs; handled 29.7:1 class imbalance</li>
            <li>Full production pipeline with Flask API, AWS S3, and safety protocols</li>
          </ul>

          <div className="main-section-title">PROFESSIONAL EXPERIENCE</div>

          <div className="job-title">Freelance Data Science Consultant</div>
          <div className="company">Thompson Parking & Mobility Consultants <span className="dates-inline">— Current</span></div>
          <ul>
            <li>Develop AI-powered Excel analytics platform enabling natural language data queries</li>
            <li>Design custom analytical solutions and machine learning models for client challenges</li>
            <li>Support data-driven decision making through advanced analytics and predictive modeling</li>
          </ul>

          <div className="job-title">Continuous Improvement Leader & Material Flow Specialist</div>
          <div className="company">John Deere, Waterloo Works & Ankeny Works <span className="dates-inline">— 2005-2020, 2021-Present</span></div>
          <ul>
            <li>CI Department Representative leading process improvement and operational efficiency initiatives</li>
            <li>Designed and implemented Zones Project, modernizing material flow training systems</li>
            <li>Led departmental CI mapping initiatives improving operational efficiency and reducing cycle times</li>
            <li>Managed supply chain logistics and SAP-integrated inventory systems</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function DetailedResume() {
  return (
    <div className="resume-container" style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      fontSize: "11pt",
      lineHeight: 1.4,
      color: "#333"
    }}>
      <style jsx>{`
        .resume-header {
          text-align: center;
          padding: 0.3in 0.5in 0.2in;
          background: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }
        .resume-name {
          font-size: 24pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 4pt;
          letter-spacing: 1pt;
        }
        .resume-title {
          font-size: 12pt;
          color: #34495e;
          margin-bottom: 6pt;
          font-style: italic;
        }
        .contact-info {
          font-size: 10pt;
          color: #555;
          line-height: 1.2;
        }
        .contact-info a {
          color: #3498db;
          text-decoration: none;
        }
        .resume-body {
          display: grid;
          grid-template-columns: 2.5in 1fr;
          min-height: 100vh;
        }
        .sidebar {
          background: #f8f9fa;
          padding: 0.35in 0.35in;
          border-right: 2px solid #e9ecef;
        }
        .main-content {
          padding: 0.35in 0.5in;
        }
        .section-title {
          font-size: 12pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 4pt;
          margin-bottom: 10pt;
          margin-top: 14pt;
        }
        .section-title:first-child {
          margin-top: 0;
        }
        .main-section-title {
          font-size: 14pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 3px solid #3498db;
          padding-bottom: 4pt;
          margin-bottom: 12pt;
          margin-top: 16pt;
        }
        .main-section-title:first-child {
          margin-top: 0;
        }
        .skills-category {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 4pt;
          margin-top: 8pt;
        }
        .skills-list {
          font-size: 9pt;
          color: #555;
          margin-bottom: 8pt;
          line-height: 1.3;
        }
        .education-item {
          margin-bottom: 12pt;
        }
        .degree {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
        }
        .school {
          font-size: 10pt;
          color: #555;
          font-style: italic;
        }
        .education-dates {
          font-size: 9pt;
          color: #777;
        }
        .education-notes {
          font-size: 9pt;
          color: #666;
          margin-top: 2pt;
        }
        .cert-category {
          font-size: 10pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 6pt;
          margin-top: 12pt;
        }
        .cert-item {
          font-size: 9pt;
          color: #555;
          margin-bottom: 3pt;
        }
        .job-title {
          font-size: 11pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 2pt;
        }
        .company {
          font-size: 10pt;
          color: #555;
          margin-bottom: 2pt;
          font-style: italic;
        }
        .dates {
          font-size: 9pt;
          color: #777;
          margin-bottom: 8pt;
        }
        .project-title {
          font-size: 11pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 2pt;
        }
        .project-subtitle {
          font-size: 10pt;
          color: #555;
          font-style: italic;
          margin-bottom: 6pt;
        }
        .project-url {
          font-size: 9pt;
          color: #3498db;
          margin-bottom: 8pt;
        }
        ul {
          margin-left: 16pt;
          margin-bottom: 12pt;
        }
        li {
          margin-bottom: 4pt;
          font-size: 10pt;
          line-height: 1.3;
        }
      `}</style>

      <div className="resume-header">
        <div className="resume-name">GLENN DALBEY</div>
        <div className="resume-title">Data Science & Analytics Professional</div>
        <div className="contact-info">
          319-233-4445 | dalbeyglenn@gmail.com<br />
          <a href="https://linkedin.com/in/glenn-dalbey-205b7a44">LinkedIn</a> |{" "}
          <a href="https://github.com/XxRemsteelexX">GitHub</a> |{" "}
          <a href="https://www.glenndalbey.com">Portfolio</a>
        </div>
      </div>

      <div className="resume-body">
        <div className="sidebar">
          <div className="section-title">TECHNICAL SKILLS</div>

          <div className="skills-category">Programming</div>
          <div className="skills-list">Python (Expert), SQL, TypeScript, JavaScript, R, C++, HTML/CSS</div>

          <div className="skills-category">Deep Learning</div>
          <div className="skills-list">PyTorch, TensorFlow/Keras, Spatial-Temporal Transformers, GRU/RNN, 3D CNNs, Perceiver IO, Geometric Attention Networks</div>

          <div className="skills-category">ML & Data Science</div>
          <div className="skills-list">scikit-learn, XGBoost, LightGBM, CatBoost, Pandas, NumPy, Advanced Ensemble Methods, Feature Engineering</div>

          <div className="skills-category">Cloud & Infrastructure</div>
          <div className="skills-list">AWS (Certified), Multi-GPU Training, Mixed Precision (FP16), PostgreSQL, S3, Weights & Biases</div>

          <div className="skills-category">Homelab & Systems</div>
          <div className="skills-list">Proxmox VE, pfSense, Ubuntu Server, n8n Automation, RAG Pipelines, 10Gb Networking, VLAN</div>

          <div className="skills-category">Web & Deployment</div>
          <div className="skills-list">Flask, FastAPI, Streamlit, React/Next.js, Docker, CI/CD, GitHub Actions</div>

          <div className="skills-category">Specializations</div>
          <div className="skills-list">Trajectory Prediction, 3D Medical Imaging (DICOM/NIfTI), Computer Vision, NLP, Multi-modal AI, Test-Time Augmentation</div>

          <div className="section-title">EDUCATION</div>

          <div className="education-item">
            <div className="degree">MS, Data Science & Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Aug 2024 - Aug 2025</div>
            <div className="education-notes">• Healthcare AI Capstone (Production)<br />• NSLS & Student Insights Council</div>
          </div>

          <div className="education-item">
            <div className="degree">BS, Data Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Mar 2023 - Sep 2024</div>
            <div className="education-notes">• NFL Prediction Capstone<br />• NSLS Member</div>
          </div>

          <div className="education-item">
            <div className="degree">AS, IT / Programming</div>
            <div className="school">Clinton Community College</div>
            <div className="education-dates">Jan 2022 - Dec 2022</div>
            <div className="education-notes">• Data Analytics Certificate<br />• Phi Theta Kappa</div>
          </div>

          <div className="education-item">
            <div className="degree">Diploma, IT / Programming</div>
            <div className="school">Clinton Community College</div>
            <div className="education-dates">Jan 2021 - Dec 2021</div>
            <div className="education-notes">• Phi Theta Kappa</div>
          </div>

          <div className="education-item">
            <div className="degree">AA, Art Studies</div>
            <div className="school">Hawkeye Community College</div>
            <div className="education-dates">Sep 2019 - Dec 2020</div>
            <div className="education-notes">• Phi Theta Kappa</div>
          </div>

          <div className="education-item">
            <div className="degree">Graphic Communications</div>
            <div className="school">Hawkeye Community College</div>
            <div className="education-dates">Sep 1997 - May 1999</div>
          </div>

          <div className="section-title">CERTIFICATIONS</div>

          <div className="cert-category">Industry</div>
          <div className="cert-item">• CompTIA Data+ (2024-2027)</div>
          <div className="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
          <div className="cert-item">• CompTIA A+ (2023-2026)</div>

          <div className="cert-category">Udacity Nanodegrees</div>
          <div className="cert-item">• Advanced Computer Vision & Deep Learning</div>
          <div className="cert-item">• ML DevOps & Model Deployment</div>
          <div className="cert-item">• Transformer Models & BERT</div>
          <div className="cert-item">• GANs & Convolutional Neural Networks</div>

          <div className="section-title">HONORS</div>
          <div className="cert-item">• National Society of Leadership and Success</div>
          <div className="cert-item">• Phi Theta Kappa Honor Society</div>
          <div className="cert-item">• Eagle Scout (1995)</div>
        </div>

        <div className="main-content">
          <div className="main-section-title">PROFESSIONAL SUMMARY</div>
          <p style={{ fontSize: "11pt", lineHeight: 1.4, marginBottom: "16pt" }}>
            Data Scientist with an MS in Data Science who builds things that actually work. I enjoy building and training models on my own multi-GPU homelab, deploying new techniques, and discovering unique ways to solve problems. Whether it's analysis, research, or projections, I dig into how something ticks, figure out why, and extract information that drives better outcomes. My multi-node homelab stack lets me run production applications, train models, and run MLflow, all on my own hardware. 20+ projects on GitHub covering deep learning, medical imaging, NLP, computer vision, and analytics.
          </p>

          <div className="main-section-title">FEATURED DATA SCIENCE PROJECTS</div>

          <div className="project-title" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span>NFL Big Data Bowl 2026 - Kaggle Bronze Medal</span>
            <img src="/images/kaggle-bronze-2026.png" alt="Kaggle Bronze Medal 2026" style={{ height: "40px", width: "40px", borderRadius: "50%" }} />
          </div>
          <div className="project-subtitle">Deep Learning Player Trajectory Prediction | Top 8% of 1,134 teams</div>
          <div className="project-url">github.com/XxRemsteelexX/NFL-Big-Data-Bowl-2026-</div>
          <ul>
            <li><strong>Bronze Medal</strong> in prestigious Kaggle competition predicting NFL player trajectories from tracking data</li>
            <li>Conducted systematic exploration of 847+ experiments across 15+ neural network architectures</li>
            <li>Best single model: 6-Layer Spatial-Temporal Transformer achieving 0.547 Public LB score</li>
            <li>Best ensemble: 3-model blend (ST Transformer + CNN + GRU) achieving 0.540 Public LB with architecture diversity</li>
            <li>Engineered 167 features including kinematics, ball-relative positions, temporal patterns, and geometric features with Voronoi tessellation</li>
            <li>Implemented novel geometric attention with spatial distance modulation and frozen encoder fine-tuning</li>
            <li>Utilized multi-GPU training, mixed precision (FP16), and test-time augmentation for +0.005-0.010 improvement</li>
          </ul>

          <div className="project-title">RSNA Intracranial Aneurysm Detection - Kaggle Competition</div>
          <div className="project-subtitle">3D Deep Learning Medical Imaging | 105 Models Trained</div>
          <div className="project-url">github.com/XxRemsteelexX/RSNA-Intracranial-Aneurysm-Detection-Kaggle</div>
          <ul>
            <li>Trained 105 deep learning models (21 architectures × 5 folds) for CT angiography aneurysm detection</li>
            <li>Tested 51 ensemble configurations; best ensemble META_E_top3_weighted achieved AUC 0.8624</li>
            <li>Key discovery: Smaller models (SE-ResNet18) statistically outperform larger models on limited medical data (r=-0.42, p&lt;0.01)</li>
            <li>Built complete pipeline: DICOM→NIfTI→ROI extraction→Training→Ensemble across 4 GPUs simultaneously</li>
            <li>Multi-label classification across 14 classes with severe class imbalance handling (1.2% to 42.8%)</li>
          </ul>

          <div className="project-title">Apollo Healthcare Connect</div>
          <div className="project-subtitle">Production Multi-modal AI Healthcare Triage System | MS Capstone</div>
          <div className="project-url">apollohealthcareconnect.com</div>
          <ul>
            <li>Built and deployed live production healthcare AI triage system with sub-second response times</li>
            <li>Achieved <strong>93.8% combined multi-modal accuracy</strong> and <strong>98.0% burn classification accuracy</strong></li>
            <li>Implemented 5-model ensemble architecture combining DistilBERT (NLP) and CNNs (Computer Vision)</li>
            <li>Successfully handled extreme class imbalance (29.7:1 ratio) with advanced loss functions</li>
            <li>Built production pipeline with Flask API, AWS S3 integration, and comprehensive safety protocols</li>
          </ul>

          <div className="project-title">Missing Persons Outlier Detection</div>
          <div className="project-subtitle">Statistical Anomaly Detection for Trafficking & Organized Crime Analysis</div>
          <div className="project-url">github.com/XxRemsteelexX/missing-persons-outlier-detection</div>
          <ul>
            <li>Analyzed 41,200 missing persons and unidentified bodies cases across 101 years (9,204 county-decade combinations)</li>
            <li>Identified I-35 corridor trafficking pattern with +10.80 cases/year acceleration</li>
            <li>Discovered Kenedy County, TX anomaly: 46.86 standard deviations above baseline</li>
            <li>Built 7-page interactive Streamlit dashboard with geospatial visualization and 5-year forecasting</li>
            <li>Validated methodology against known serial killers (Ridgway: 4.38σ, Gacy: 1.34σ)</li>
          </ul>

          <div className="project-title">NFL Rookie Wide Receiver Performance Prediction</div>
          <div className="project-subtitle">Advanced ML Analysis with Feature Optimization | BS Capstone</div>
          <div className="project-url">github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis</div>
          <ul>
            <li>Developed predictive model achieving <strong>90.9% ROC AUC</strong> on future data validation for 1000+ yard seasons</li>
            <li>Reduced overfitting gap from 18.5% to 0.4% (97.8% reduction) through feature optimization (46→20 features)</li>
            <li>Implemented temporal validation strategy ensuring model generalization to future NFL seasons</li>
            <li>Created production-ready ensemble model for NFL draft analysis with comprehensive data pipeline (2006-2024)</li>
          </ul>

          <div className="project-title">OceanEterna RAG Engine <span style={{ fontSize: "9pt", color: "#e67e22", fontWeight: "normal" }}>(In Progress)</span></div>
          <div className="project-subtitle">High-Performance Local Retrieval-Augmented Generation System | C++17 | CPU-Only</div>
          <ul>
            <li>Originally prototyped in Python, rewritten in C++17 for performance — evolved through <strong>4 major versions</strong> with systematic optimization</li>
            <li>Indexes <strong>2.45 billion tokens</strong> across 5M+ chunks with <strong>0-42ms search</strong> (avg 12ms, down from 500ms in v1) — CPU-only, minimal RAM</li>
            <li>Dual LZ4/Zstd compression, 15 REST API endpoints, 47 tests at near 100% accuracy; conversations and files continuously indexed</li>
            <li>Building LLM chat interface and MCP tool for terminal-based AI workflows and project knowledge management</li>
          </ul>

          <div className="project-title">OE-OS <span style={{ fontSize: "9pt", color: "#e67e22", fontWeight: "normal" }}>(In Progress)</span></div>
          <div className="project-subtitle">Distributed AI Orchestration Platform | Python / FastAPI</div>
          <ul>
            <li>Three-tier LLM routing (local Ollama to cheap API to premium models) reducing costs by routing ~80% of requests to free local models</li>
            <li>Triple-layer RAG memory: BM25 over 5M+ chunks, ChromaDB semantic search, Redis session cache with graceful degradation</li>
            <li>18 MCP-compatible tools and multi-agent sandbox where 4 LLM personas deliberate at zero API cost</li>
            <li>4,200+ lines of async Python on FastAPI for a private multi-node GPU cluster</li>
          </ul>

          <div className="project-title">AI Homelab & Active Memory Network</div>
          <div className="project-subtitle">Multi-Tier AI Infrastructure | 10Gb Network + RAG Pipeline</div>
          <div className="project-url">glenndalbey.com/infrastructure</div>
          <ul>
            <li>Designed and operate multi-tier AI homelab: <strong>dual RTX 5090</strong> training node + RTX 3090 Ti/3090 secondary node</li>
            <li>Built 256GB unified memory LLM inference cluster (2× Ryzen AI Max+ 395) running Kimi K2, Qwen 3, GLM 4.6</li>
            <li>Implemented automated active-memory pipeline with n8n orchestration, RAG storage, and hot/warm/cold tiering</li>
            <li>Deployed Proxmox VE backbone with pfSense firewall, VLAN segmentation, and 10Gb networking (100TB+ storage)</li>
          </ul>

          <div className="main-section-title">PROFESSIONAL EXPERIENCE</div>

          <div className="job-title">Freelance Data Science Consultant</div>
          <div className="company">Thompson Parking & Mobility Consultants</div>
          <div className="dates">Current</div>
          <ul>
            <li>Provide data science and analytics consulting services for business intelligence initiatives</li>
            <li>Develop AI-powered Excel analytics platform enabling natural language data queries</li>
            <li>Design custom analytical solutions and machine learning models for client-specific challenges</li>
            <li>Support data-driven decision making through advanced analytics and predictive modeling</li>
          </ul>

          <div className="job-title">Continuous Improvement Leader & Material Flow Specialist</div>
          <div className="company">John Deere, Waterloo Works & Ankeny Works</div>
          <div className="dates">2005-2020, 2021-Present</div>
          <ul>
            <li>CI Department Representative leading process improvement and operational efficiency initiatives</li>
            <li>Developed comprehensive training curriculum for warehouse personnel, improving onboarding efficiency</li>
            <li>Designed and implemented the Zones Project, modernizing material flow training systems</li>
            <li>Led departmental CI mapping initiatives to improve operational efficiency and reduce cycle times</li>
            <li>Optimized material replenishment processes using bin methodology, reducing operational inefficiencies</li>
            <li>Managed supply chain logistics and SAP-integrated inventory management</li>
            <li>Supported engineering teams in workflow re-splits and cycle time analysis for production optimization</li>
          </ul>
        </div>
      </div>
    </div>
  );
}