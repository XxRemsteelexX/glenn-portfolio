"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function ResumePage() {
  const [activeVersion, setActiveVersion] = useState<"onepage" | "detailed">("onepage");

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
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadFile(
                  activeVersion === "onepage"
                    ? "Glenn_Dalbey_Resume_OnePage.docx"
                    : "Glenn_Dalbey_Resume_Detailed.docx"
                )}
                className="hover-lift"
              >
                <Download className="w-4 h-4 mr-2" />
                Word
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
          text-align: center;
          padding: 0.4in 0.5in 0.3in;
          background: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }
        .resume-name {
          font-size: 22pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 6pt;
          letter-spacing: 1pt;
        }
        .resume-title {
          font-size: 12pt;
          color: #34495e;
          margin-bottom: 8pt;
          font-style: italic;
        }
        .contact-info {
          font-size: 9pt;
          color: #555;
          line-height: 1.2;
        }
        .contact-info a {
          color: #3498db;
          text-decoration: none;
        }
        .resume-body {
          display: grid;
          grid-template-columns: 2.3in 1fr;
        }
        .sidebar {
          background: #f8f9fa;
          padding: 0.5in 0.3in;
          border-right: 2px solid #e9ecef;
        }
        .main-content {
          padding: 0.5in 0.5in;
        }
        .section-title {
          font-size: 11pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 3pt;
          margin-bottom: 8pt;
          margin-top: 14pt;
        }
        .section-title:first-child {
          margin-top: 0;
        }
        .main-section-title {
          font-size: 12pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 3px solid #3498db;
          padding-bottom: 4pt;
          margin-bottom: 10pt;
          margin-top: 16pt;
        }
        .main-section-title:first-child {
          margin-top: 0;
        }
        .skills-category {
          font-size: 9pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 2pt;
          margin-top: 6pt;
        }
        .skills-list {
          font-size: 8pt;
          color: #555;
          margin-bottom: 6pt;
          line-height: 1.2;
        }
        .education-item {
          margin-bottom: 8pt;
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
          margin-bottom: 1pt;
          font-style: italic;
        }
        .dates {
          font-size: 8pt;
          color: #777;
          margin-bottom: 6pt;
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
          margin-left: 14pt;
          margin-bottom: 8pt;
        }
        li {
          margin-bottom: 2pt;
          font-size: 9pt;
          line-height: 1.2;
        }
        .compact-summary {
          font-size: 10pt;
          line-height: 1.3;
          margin-bottom: 12pt;
        }
      `}</style>

      <div className="resume-header">
        <div className="resume-name">GLENN DALBEY</div>
        <div className="resume-title">Data Science & Analytics Professional</div>
        <div className="contact-info">
          319-233-4445 | dalbeyglenn@gmail.com<br />
          <a href="https://linkedin.com/in/glenn-dalbey-205b7a44">LinkedIn</a> |{" "}
          <a href="https://github.com/XxRemsteelexX">GitHub</a> |{" "}
          <a href="https://glenndalbey.com">Portfolio</a>
        </div>
      </div>

      <div className="resume-body">
        <div className="sidebar">
          <div className="section-title">TECHNICAL SKILLS</div>

          <div className="skills-category">Programming</div>
          <div className="skills-list">Python (Expert), R, SQL, TypeScript, JavaScript, C++</div>

          <div className="skills-category">ML & AI</div>
          <div className="skills-list">PyTorch, TensorFlow, scikit-learn, XGBoost, Hugging Face, DistilBERT</div>

          <div className="skills-category">Data Science</div>
          <div className="skills-list">Pandas, NumPy, Tableau, Statistical Analysis, Predictive Modeling</div>

          <div className="skills-category">Cloud & Web</div>
          <div className="skills-list">AWS (Certified), PostgreSQL, Flask, FastAPI, React, Docker</div>

          <div className="skills-category">Specializations</div>
          <div className="skills-list">Computer Vision, NLP, Multi-modal AI, Healthcare AI, MLOps</div>

          <div className="section-title">EDUCATION</div>

          <div className="education-item">
            <div className="degree">MS, Data Science & Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">August 2025</div>
            <div className="education-notes">Healthcare AI Capstone (Production)</div>
          </div>

          <div className="education-item">
            <div className="degree">BS, Data Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">March 2023 - September 2024</div>
            <div className="education-notes">NFL Prediction Capstone</div>
          </div>

          <div className="education-item">
            <div className="degree">AS, IT Programming</div>
            <div className="school">Clinton Community College</div>
            <div className="education-dates">2022</div>
          </div>

          <div className="section-title">CERTIFICATIONS</div>
          <div className="cert-item">• CompTIA Data+ (2024-2027)</div>
          <div className="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
          <div className="cert-item">• Advanced Computer Vision & Deep Learning</div>
          <div className="cert-item">• ML DevOps & Model Deployment</div>
          <div className="cert-item">• Transformer Models & BERT</div>

          <div className="section-title">HONORS</div>
          <div className="cert-item">• National Society of Leadership and Success</div>
          <div className="cert-item">• Phi Theta Kappa Honor Society</div>
          <div className="cert-item">• Eagle Scout</div>
        </div>

        <div className="main-content">
          <div className="main-section-title">PROFESSIONAL SUMMARY</div>
          <div className="compact-summary">
            Results-driven Data Science professional with MS in Data Science and proven expertise in production AI/ML systems. Successfully deployed healthcare AI serving global users with 93.8% accuracy and sub-second response times. Demonstrated success in advanced predictive modeling (90.9% ROC AUC), multi-modal AI, and MLOps. Combines technical expertise with 15+ years of operational excellence and continuous improvement leadership.
          </div>

          <div className="main-section-title">FEATURED PROJECTS</div>

          <div className="project-title">Apollo Healthcare Connect | apollohealthcareconnect.com</div>
          <div className="project-subtitle">Production Multi-modal AI Healthcare Triage System | MS Capstone</div>
          <ul>
            <li>Deployed live healthcare AI system serving global users with 93.8% accuracy and sub-second response</li>
            <li>Implemented 5-model ensemble combining DistilBERT (NLP) and CNNs (Computer Vision)</li>
            <li>Successfully handled extreme class imbalance (29.7:1) with advanced loss functions</li>
            <li>Built production pipeline with Flask API, AWS S3 integration, and safety protocols</li>
          </ul>

          <div className="project-title">TandemAI - LLM Ensemble Orchestration</div>
          <div className="project-subtitle">Local-First AI Model Collaboration System | github.com/XxRemsteelexX/TandemAI</div>
          <ul>
            <li>Built platform enabling multiple LLMs to collaborate through 4 orchestration modes</li>
            <li>Designed universal provider support for 10+ platforms (OpenAI, Anthropic, Ollama, etc.)</li>
            <li>Implemented real-time streaming, conversation history, and privacy-first architecture</li>
          </ul>

          <div className="project-title">NFL Rookie Performance Prediction</div>
          <div className="project-subtitle">Advanced ML Analysis | BS Capstone | github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis</div>
          <ul>
            <li>Achieved 90.9% ROC AUC on temporal validation for predicting 1000+ yard seasons</li>
            <li>Reduced overfitting from 18.5% to 0.4% through feature optimization (46→20 features)</li>
            <li>Created production-ready ensemble model with comprehensive data pipeline (2006-2024)</li>
          </ul>

          <div className="main-section-title">PROFESSIONAL EXPERIENCE</div>

          <div className="job-title">Freelance Data Science Consultant</div>
          <div className="company">Thompson Parking & Mobility Consultants</div>
          <div className="dates">Current</div>
          <ul>
            <li>Develop AI-powered Excel analytics platform enabling natural language data queries</li>
            <li>Design custom analytical solutions and machine learning models for client challenges</li>
            <li>Support data-driven decision making through advanced analytics and predictive modeling</li>
          </ul>

          <div className="job-title">Continuous Improvement Leader & Material Specialist</div>
          <div className="company">John Deere, Waterloo Works & Ankeny Works</div>
          <div className="dates">2005-2020, 2021-Present</div>
          <ul>
            <li>Led CI Department as Representative and Trainer, facilitating process improvement frameworks</li>
            <li>Designed and implemented Zones Project, modernizing material flow training systems</li>
            <li>Led departmental CI mapping initiatives improving operational efficiency and reducing cycle times</li>
            <li>Managed supply chain logistics, vendor relations, and SAP-integrated inventory systems</li>
          </ul>

          <div className="main-section-title">KEY ACCOMPLISHMENTS</div>
          <ul>
            <li>Deployed live AI healthcare system serving global users with 93.8% accuracy</li>
            <li>Built and deployed 5+ production systems across healthcare, business analytics, and research</li>
            <li>Reduced ML model overfitting by 97.8% through advanced feature optimization techniques</li>
            <li>Published 15+ open-source projects on GitHub with comprehensive documentation</li>
            <li>Successfully handled extreme class imbalance (29.7:1) in medical imaging classification</li>
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
          padding: 0.6in 0.6in 0.4in;
          background: #f8f9fa;
          border-bottom: 2px solid #e9ecef;
        }
        .resume-name {
          font-size: 28pt;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 8pt;
          letter-spacing: 1pt;
        }
        .resume-title {
          font-size: 14pt;
          color: #34495e;
          margin-bottom: 12pt;
          font-style: italic;
        }
        .contact-info {
          font-size: 10pt;
          color: #555;
          line-height: 1.3;
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
          padding: 1in 0.4in;
          border-right: 2px solid #e9ecef;
        }
        .main-content {
          padding: 1in 0.6in;
        }
        .section-title {
          font-size: 12pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 4pt;
          margin-bottom: 12pt;
          margin-top: 20pt;
        }
        .section-title:first-child {
          margin-top: 0;
        }
        .main-section-title {
          font-size: 14pt;
          font-weight: bold;
          color: #2c3e50;
          border-bottom: 3px solid #3498db;
          padding-bottom: 6pt;
          margin-bottom: 16pt;
          margin-top: 24pt;
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
          <a href="https://glenndalbey.com">Portfolio</a>
        </div>
      </div>

      <div className="resume-body">
        <div className="sidebar">
          <div className="section-title">TECHNICAL SKILLS</div>

          <div className="skills-category">Programming</div>
          <div className="skills-list">Python (Expert), R, SQL, TypeScript, JavaScript, C++, C#, Java, HTML/CSS</div>

          <div className="skills-category">ML & AI</div>
          <div className="skills-list">PyTorch, TensorFlow/Keras, scikit-learn, XGBoost, Hugging Face, DistilBERT, OpenAI API</div>

          <div className="skills-category">Data Science</div>
          <div className="skills-list">Pandas, NumPy, Tableau, Statistical Analysis, Data Mining, Predictive Modeling, Big Data</div>

          <div className="skills-category">Cloud & Database</div>
          <div className="skills-list">AWS (Certified), PostgreSQL, MongoDB, S3, Weights & Biases</div>

          <div className="skills-category">Web & Deployment</div>
          <div className="skills-list">Flask, FastAPI, Streamlit, React, Next.js, Docker, CI/CD, GitHub Actions</div>

          <div className="skills-category">Specializations</div>
          <div className="skills-list">Computer Vision, NLP, Multi-modal AI, Healthcare AI, Deep Learning, LLM Orchestration</div>

          <div className="section-title">EDUCATION</div>

          <div className="education-item">
            <div className="degree">MS, Data Science & Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Graduated August 2025</div>
            <div className="education-notes">• Healthcare AI Capstone (Production)<br />• NSLS & Student Council Member</div>
          </div>

          <div className="education-item">
            <div className="degree">BS, Data Analytics</div>
            <div className="school">Western Governors University</div>
            <div className="education-dates">Mar 2023 - Sep 2024</div>
            <div className="education-notes">• NFL Prediction Capstone<br />• NSLS Member</div>
          </div>

          <div className="education-item">
            <div className="degree">AS, IT Programming</div>
            <div className="school">Clinton Community College</div>
            <div className="education-dates">Jan 2022 - Dec 2022</div>
            <div className="education-notes">• Data Analytics Certificate<br />• Phi Theta Kappa</div>
          </div>

          <div className="section-title">CERTIFICATIONS</div>

          <div className="cert-category">Industry</div>
          <div className="cert-item">• CompTIA Data+ (2024-2027)</div>
          <div className="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
          <div className="cert-item">• CompTIA A+ (2023-2026)</div>

          <div className="cert-category">Specialized Training</div>
          <div className="cert-item">• Advanced Computer Vision & Deep Learning</div>
          <div className="cert-item">• ML DevOps & Model Deployment</div>
          <div className="cert-item">• Transformer Models & BERT</div>
          <div className="cert-item">• GANs & CNN Architecture</div>

          <div className="section-title">HONORS</div>
          <div className="cert-item">• National Society of Leadership and Success</div>
          <div className="cert-item">• Phi Theta Kappa Honor Society</div>
          <div className="cert-item">• Eagle Scout (1995)</div>
        </div>

        <div className="main-content">
          <div className="main-section-title">PROFESSIONAL SUMMARY</div>
          <p style={{ fontSize: "11pt", lineHeight: 1.4, marginBottom: "16pt" }}>
            Results-driven Data Science professional with MS in Data Science and proven expertise in production AI/ML systems. Successfully deployed healthcare AI serving global users with 93.8% accuracy and sub-second response times. Demonstrated success in advanced predictive modeling (90.9% ROC AUC), multi-modal AI, computer vision, NLP, and MLOps. Combines 15+ years of operational excellence and continuous improvement leadership at John Deere with cutting-edge technical expertise in Python, deep learning, and cloud technologies.
          </p>

          <div className="main-section-title">FEATURED DATA SCIENCE PROJECTS</div>

          <div className="project-title">Apollo Healthcare Connect</div>
          <div className="project-subtitle">Production Multi-modal AI Healthcare Triage System | MS Capstone</div>
          <div className="project-url">apollohealthcareconnect.com</div>
          <ul>
            <li>Deployed live healthcare AI system serving global users with sub-second response times</li>
            <li>Achieved 93.8% combined multi-modal accuracy and 98.0% burn classification accuracy</li>
            <li>Implemented 5-model ensemble architecture combining DistilBERT (NLP) and CNNs (Computer Vision)</li>
            <li>Successfully handled extreme class imbalance (29.7:1 ratio) with advanced loss functions</li>
            <li>Built production pipeline with Flask API, AWS S3 integration, and comprehensive safety protocols</li>
          </ul>

          <div className="project-title">TandemAI - LLM Ensemble Orchestration Platform</div>
          <div className="project-subtitle">Local-First AI Model Collaboration System</div>
          <div className="project-url">github.com/XxRemsteelexX/TandemAI</div>
          <ul>
            <li>Built innovative platform enabling multiple LLMs to collaborate through 4 orchestration modes</li>
            <li>Designed universal provider support for 10+ platforms (Ollama, OpenAI, Anthropic, Groq, LM Studio)</li>
            <li>Implemented real-time streaming, conversation history, and privacy-first local architecture</li>
            <li>Created cross-platform deployment with Tauri and Electron for desktop applications</li>
          </ul>

          <div className="project-title">NFL Rookie Wide Receiver Performance Prediction</div>
          <div className="project-subtitle">Advanced ML Analysis with Feature Optimization | BS Capstone</div>
          <div className="project-url">github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis</div>
          <ul>
            <li>Developed predictive model achieving 90.9% ROC AUC on future data validation for 1000+ yard seasons</li>
            <li>Reduced overfitting gap from 18.5% to 0.4% through sophisticated feature optimization (46→20 features)</li>
            <li>Implemented temporal validation strategy ensuring model generalization to future NFL seasons</li>
            <li>Created production-ready ensemble model for NFL draft analysis with comprehensive data pipeline</li>
          </ul>

          <div className="project-title">Business Analytics AI Platform</div>
          <div className="project-subtitle">AI-Powered Excel Analytics for Enterprise</div>
          <div className="project-url">business-analytics-ai-platform-production.up.railway.app</div>
          <ul>
            <li>Built professional business intelligence platform with enterprise branding</li>
            <li>Implemented natural language querying enabling non-technical users to analyze Excel data</li>
            <li>Developed automated chart generation and executive-ready visualizations</li>
            <li>Integrated AI-powered analytics for instant business intelligence from uploaded data</li>
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

          <div className="job-title">Continuous Improvement Leader & Material Specialist</div>
          <div className="company">John Deere, Waterloo Works & Ankeny Works</div>
          <div className="dates">2005-2020, 2021-Present</div>
          <ul>
            <li>Led CI Department as Representative and Wage CI Trainer, facilitating process improvement frameworks</li>
            <li>Developed comprehensive training curriculum for warehouse personnel, improving onboarding efficiency</li>
            <li>Designed and implemented the Zones Project, modernizing material flow training systems</li>
            <li>Led departmental CI mapping initiatives to improve operational efficiency and reduce cycle times</li>
            <li>Optimized material replenishment processes using bin methodology, reducing operational inefficiencies</li>
            <li>Managed supply chain logistics, vendor relations, and SAP-integrated inventory management</li>
            <li>Supported engineering teams in workflow re-splits and cycle time analysis for production optimization</li>
          </ul>

          <div className="main-section-title">KEY ACCOMPLISHMENTS</div>
          <ul>
            <li>Deployed live AI healthcare system serving global users with 93.8% accuracy and sub-second response</li>
            <li>Achieved 90.9% ROC AUC on temporal validation for sports analytics with production deployment</li>
            <li>Built and deployed 5+ live production systems across healthcare, business analytics, and research</li>
            <li>Successfully handled extreme class imbalance (29.7:1 ratio) in medical imaging classification</li>
            <li>Reduced ML model overfitting by 97.8% (18.5% to 0.4% gap) through feature optimization</li>
            <li>Published 15+ open-source projects on GitHub with comprehensive documentation</li>
            <li>Developed scalable ML pipelines and REST APIs for real-world applications with safety protocols</li>
          </ul>
        </div>
      </div>
    </div>
  );
}