import puppeteer from 'puppeteer';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, convertInchesToTwip, Header, Footer } from 'docx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, '../public/resume');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read the badge image as base64
const badgeImagePath = path.join(__dirname, '../public/images/kaggle-bronze-2026.png');
const badgeBase64 = fs.existsSync(badgeImagePath)
  ? fs.readFileSync(badgeImagePath).toString('base64')
  : null;

// One Page Resume HTML
const onePageHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: letter;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 10pt;
      line-height: 1.2;
      color: #333;
      width: 8.5in;
      height: 11in;
    }
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
      display: flex;
      align-items: center;
      gap: 8px;
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
    .badge-img {
      height: 28px;
      width: 28px;
      border-radius: 50%;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="resume-header">
    <div class="header-left">
      <div class="resume-name">GLENN DALBEY</div>
      <div class="name-divider"></div>
      <div class="resume-title">Data Science & Analytics</div>
    </div>
    <div class="header-right">
      <div class="contact-row">
        319-233-4445<span class="contact-separator">|</span>dalbeyglenn@gmail.com
      </div>
      <div class="contact-row">
        <a href="https://linkedin.com/in/glenn-dalbey-205b7a44">LinkedIn</a><span class="contact-separator">|</span><a href="https://github.com/XxRemsteelexX">GitHub</a><span class="contact-separator">|</span><a href="https://www.glenndalbey.com">Portfolio</a>
      </div>
    </div>
  </div>

  <div class="resume-body">
    <div class="sidebar">
      <div class="section-title">TECHNICAL SKILLS</div>

      <div class="skills-category">Programming</div>
      <div class="skills-list">Python (Expert), SQL, TypeScript, JavaScript, R, C++</div>

      <div class="skills-category">Deep Learning</div>
      <div class="skills-list">PyTorch, TensorFlow, Spatial-Temporal Transformers, GRU/RNN, 3D CNNs, Geometric Attention</div>

      <div class="skills-category">ML & Data Science</div>
      <div class="skills-list">scikit-learn, XGBoost, Pandas, NumPy, Ensemble Methods, Feature Engineering</div>

      <div class="skills-category">Cloud & Deployment</div>
      <div class="skills-list">AWS (Certified), Multi-GPU Training, Mixed Precision, Docker, Flask, FastAPI</div>

      <div class="skills-category">Homelab & Systems</div>
      <div class="skills-list">Proxmox, pfSense, n8n, RAG Pipelines, 10Gb Networking, Ubuntu Server</div>

      <div class="skills-category">Specializations</div>
      <div class="skills-list">Trajectory Prediction, 3D Medical Imaging, Computer Vision, NLP, Multi-modal AI</div>

      <div class="section-title">EDUCATION</div>

      <div class="education-item">
        <div class="degree">MS, Data Science & Analytics</div>
        <div class="school">Western Governors University</div>
        <div class="education-dates">Aug 2024 - Aug 2025</div>
        <div class="education-notes">Healthcare AI Capstone (Production)</div>
      </div>

      <div class="education-item">
        <div class="degree">BS, Data Analytics</div>
        <div class="school">Western Governors University</div>
        <div class="education-dates">Mar 2023 - Sep 2024</div>
        <div class="education-notes">NFL Prediction Capstone</div>
      </div>

      <div class="education-item">
        <div class="degree">AS, IT / Programming + Data Analytics Cert</div>
        <div class="school">Clinton Community College</div>
        <div class="education-dates">Jan 2022 - Dec 2022</div>
      </div>

      <div class="education-item">
        <div class="degree">AA, Art Studies</div>
        <div class="school">Hawkeye Community College</div>
        <div class="education-dates">Sep 2019 - Dec 2020</div>
      </div>

      <div class="section-title">CERTIFICATIONS</div>
      <div class="cert-item">• CompTIA Data+ (2024-2027)</div>
      <div class="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
      <div class="cert-item">• CompTIA A+ (2023-2026)</div>
      <div class="cert-item">• Udacity: Deep Learning, CV, GANs, CNNs, Transformers, ML DevOps</div>

      <div class="section-title">HONORS</div>
      <div class="cert-item">• National Society of Leadership and Success</div>
      <div class="cert-item">• Phi Theta Kappa Honor Society</div>
      <div class="cert-item">• Eagle Scout</div>
    </div>

    <div class="main-content">
      <div class="main-section-title">PROFESSIONAL SUMMARY</div>
      <div class="compact-summary">
        Data Scientist with an MS in Data Science who builds things that actually work. I enjoy building and training models on my own multi-GPU homelab, deploying new techniques, and discovering unique ways to solve problems. Whether it's analysis, research, or projections, I dig into how something ticks, figure out why, and extract information that drives better outcomes. My multi-node homelab stack lets me run production applications, train models, and run MLflow, all on my own hardware. 20+ projects on GitHub covering deep learning, medical imaging, NLP, computer vision, and analytics.
      </div>

      <div class="main-section-title">FEATURED PROJECTS</div>

      <div class="project-title">
        <span>NFL Big Data Bowl 2026 | Kaggle Bronze Medal</span>
        ${badgeBase64 ? `<img src="data:image/png;base64,${badgeBase64}" class="badge-img" alt="Kaggle Bronze">` : ''}
      </div>
      <div class="project-subtitle">Player Trajectory Prediction | Top 8% of 1,134 teams </div>
      <ul>
        <li><strong>Bronze Medal</strong> in prestigious Kaggle competition predicting NFL player trajectories</li>
        <li>Conducted 847+ experiments across 15+ architectures (ST Transformers, GRU, CNN, Perceiver IO)</li>
        <li>Best ensemble: 3-model blend achieving 0.540 Public LB with architecture diversity strategy</li>
        <li>Engineered 167 features (kinematics, ball-relative, temporal, geometric with Voronoi tessellation)</li>
      </ul>

      <div class="project-title">RSNA Intracranial Aneurysm Detection | Kaggle Competition</div>
      <div class="project-subtitle">3D Medical Imaging Deep Learning | 105 Models Trained</div>
      <ul>
        <li>Trained 105 models (21 architectures × 5 folds) for CT angiography aneurysm detection</li>
        <li>Best ensemble AUC 0.8624 with discovery that smaller models outperform larger on limited medical data</li>
        <li>Built complete pipeline: DICOM→NIfTI→ROI extraction→Training→Ensemble on 4 GPUs</li>
      </ul>

      <div class="project-title">Apollo Healthcare Connect | apollohealthcareconnect.com</div>
      <div class="project-subtitle">Production Multi-modal AI Healthcare Triage | MS Capstone</div>
      <ul>
        <li>Live production healthcare AI triage achieving <strong>93.8% accuracy</strong> with sub-second response</li>
        <li>5-model ensemble combining DistilBERT (NLP) and CNNs; handled 29.7:1 class imbalance</li>
        <li>Full production pipeline with Flask API, AWS S3, and safety protocols</li>
      </ul>

      <div class="main-section-title">PROFESSIONAL EXPERIENCE</div>

      <div class="job-title">Freelance Data Science Consultant</div>
      <div class="company">Thompson Parking & Mobility Consultants <span class="dates-inline">— Current</span></div>
      <ul>
        <li>Develop AI-powered Excel analytics platform enabling natural language data queries</li>
        <li>Design custom analytical solutions and machine learning models for client challenges</li>
        <li>Support data-driven decision making through advanced analytics and predictive modeling</li>
      </ul>

      <div class="job-title">Continuous Improvement Leader & Material Flow Specialist</div>
      <div class="company">John Deere, Waterloo Works & Ankeny Works <span class="dates-inline">— 2005-2020, 2021-Present</span></div>
      <ul>
        <li>CI Department Representative leading process improvement and operational efficiency initiatives</li>
        <li>Designed and implemented Zones Project, modernizing material flow training systems</li>
        <li>Led departmental CI mapping initiatives improving operational efficiency and reducing cycle times</li>
        <li>Managed supply chain logistics and SAP-integrated inventory systems</li>
      </ul>
    </div>
  </div>
</body>
</html>
`;

// Detailed Resume HTML (multi-page)
const detailedHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page {
      size: letter;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #333;
      width: 8.5in;
    }
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
      grid-template-columns: 2.5in 1fr;
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
      display: flex;
      align-items: center;
      gap: 12px;
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
    .badge-img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      vertical-align: middle;
    }
    /* Page break controls */
    .project-block, .job-block {
      page-break-inside: avoid;
    }
    .main-section-title {
      page-break-after: avoid;
    }
    .section-title {
      page-break-after: avoid;
    }
  </style>
</head>
<body>
  <div class="resume-header">
    <div class="header-left">
      <div class="resume-name">GLENN DALBEY</div>
      <div class="name-divider"></div>
      <div class="resume-title">Data Science & Analytics</div>
    </div>
    <div class="header-right">
      <div class="contact-row">
        319-233-4445<span class="contact-separator">|</span>dalbeyglenn@gmail.com
      </div>
      <div class="contact-row">
        <a href="https://linkedin.com/in/glenn-dalbey-205b7a44">LinkedIn</a><span class="contact-separator">|</span><a href="https://github.com/XxRemsteelexX">GitHub</a><span class="contact-separator">|</span><a href="https://www.glenndalbey.com">Portfolio</a>
      </div>
    </div>
  </div>

  <div class="resume-body">
    <div class="sidebar">
      <div class="section-title">TECHNICAL SKILLS</div>

      <div class="skills-category">Programming</div>
      <div class="skills-list">Python (Expert), SQL, TypeScript, JavaScript, R, C++, HTML/CSS</div>

      <div class="skills-category">Deep Learning</div>
      <div class="skills-list">PyTorch, TensorFlow/Keras, Spatial-Temporal Transformers, GRU/RNN, 3D CNNs, Perceiver IO, Geometric Attention Networks</div>

      <div class="skills-category">ML & Data Science</div>
      <div class="skills-list">scikit-learn, XGBoost, LightGBM, CatBoost, Pandas, NumPy, Advanced Ensemble Methods, Feature Engineering</div>

      <div class="skills-category">Cloud & Infrastructure</div>
      <div class="skills-list">AWS (Certified), Multi-GPU Training, Mixed Precision (FP16), PostgreSQL, S3, Weights & Biases</div>

      <div class="skills-category">Homelab & Systems</div>
      <div class="skills-list">Proxmox VE, pfSense, Ubuntu Server, n8n Automation, RAG Pipelines, 10Gb Networking, VLAN</div>

      <div class="skills-category">Web & Deployment</div>
      <div class="skills-list">Flask, FastAPI, Streamlit, React/Next.js, Docker, CI/CD, GitHub Actions</div>

      <div class="skills-category">Specializations</div>
      <div class="skills-list">Trajectory Prediction, 3D Medical Imaging (DICOM/NIfTI), Computer Vision, NLP, Multi-modal AI, Test-Time Augmentation</div>

      <div class="section-title">EDUCATION</div>

      <div class="education-item">
        <div class="degree">MS, Data Science & Analytics</div>
        <div class="school">Western Governors University</div>
        <div class="education-dates">Aug 2024 - Aug 2025</div>
        <div class="education-notes">• Healthcare AI Capstone (Production)<br>• NSLS & Student Insights Council</div>
      </div>

      <div class="education-item">
        <div class="degree">BS, Data Analytics</div>
        <div class="school">Western Governors University</div>
        <div class="education-dates">Mar 2023 - Sep 2024</div>
        <div class="education-notes">• NFL Prediction Capstone<br>• NSLS Member</div>
      </div>

      <div class="education-item">
        <div class="degree">AS, IT / Programming</div>
        <div class="school">Clinton Community College</div>
        <div class="education-dates">Jan 2022 - Dec 2022</div>
        <div class="education-notes">• Data Analytics Certificate<br>• Phi Theta Kappa</div>
      </div>

      <div class="education-item">
        <div class="degree">Diploma, IT / Programming</div>
        <div class="school">Clinton Community College</div>
        <div class="education-dates">Jan 2021 - Dec 2021</div>
        <div class="education-notes">• Phi Theta Kappa</div>
      </div>

      <div class="education-item">
        <div class="degree">AA, Art Studies</div>
        <div class="school">Hawkeye Community College</div>
        <div class="education-dates">Sep 2019 - Dec 2020</div>
        <div class="education-notes">• Phi Theta Kappa</div>
      </div>

      <div class="education-item">
        <div class="degree">Graphic Communications</div>
        <div class="school">Hawkeye Community College</div>
        <div class="education-dates">Sep 1997 - May 1999</div>
      </div>

      <div class="section-title">CERTIFICATIONS</div>

      <div class="cert-category">Industry</div>
      <div class="cert-item">• CompTIA Data+ (2024-2027)</div>
      <div class="cert-item">• AWS Cloud Practitioner (2024-2027)</div>
      <div class="cert-item">• CompTIA A+ (2023-2026)</div>

      <div class="cert-category">Udacity Nanodegrees</div>
      <div class="cert-item">• Advanced Computer Vision & Deep Learning</div>
      <div class="cert-item">• ML DevOps & Model Deployment</div>
      <div class="cert-item">• Transformer Models & BERT</div>
      <div class="cert-item">• GANs & Convolutional Neural Networks</div>

      <div class="section-title">HONORS</div>
      <div class="cert-item">• National Society of Leadership and Success</div>
      <div class="cert-item">• Phi Theta Kappa Honor Society</div>
      <div class="cert-item">• Eagle Scout (1995)</div>
    </div>

    <div class="main-content">
      <div class="main-section-title">PROFESSIONAL SUMMARY</div>
      <p style="font-size: 11pt; line-height: 1.4; margin-bottom: 16pt;">
        Data Scientist with an MS in Data Science who builds things that actually work. I enjoy building and training models on my own multi-GPU homelab, deploying new techniques, and discovering unique ways to solve problems. Whether it's analysis, research, or projections, I dig into how something ticks, figure out why, and extract information that drives better outcomes. My multi-node homelab stack lets me run production applications, train models, and run MLflow, all on my own hardware. 20+ projects on GitHub covering deep learning, medical imaging, NLP, computer vision, and analytics.
      </p>

      <div class="main-section-title">FEATURED DATA SCIENCE PROJECTS</div>

      <div class="project-block">
        <div class="project-title">
          <span>NFL Big Data Bowl 2026 - Kaggle Bronze Medal</span>
          ${badgeBase64 ? `<img src="data:image/png;base64,${badgeBase64}" class="badge-img" alt="Kaggle Bronze">` : ''}
        </div>
        <div class="project-subtitle">Deep Learning Player Trajectory Prediction | Top 8% of 1,134 teams</div>
        <div class="project-url">github.com/XxRemsteelexX/NFL-Big-Data-Bowl-2026-</div>
        <ul>
          <li><strong>Bronze Medal</strong> in prestigious Kaggle competition predicting NFL player trajectories from tracking data</li>
          <li>Conducted systematic exploration of 847+ experiments across 15+ neural network architectures</li>
          <li>Best single model: 6-Layer Spatial-Temporal Transformer achieving 0.547 Public LB score</li>
          <li>Best ensemble: 3-model blend (ST Transformer + CNN + GRU) achieving 0.540 Public LB with architecture diversity</li>
          <li>Engineered 167 features including kinematics, ball-relative positions, temporal patterns, and geometric features with Voronoi tessellation</li>
          <li>Implemented novel geometric attention with spatial distance modulation and frozen encoder fine-tuning</li>
          <li>Utilized multi-GPU training, mixed precision (FP16), and test-time augmentation for +0.005-0.010 improvement</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">RSNA Intracranial Aneurysm Detection - Kaggle Competition</div>
        <div class="project-subtitle">3D Deep Learning Medical Imaging | 105 Models Trained</div>
        <div class="project-url">github.com/XxRemsteelexX/RSNA-Intracranial-Aneurysm-Detection-Kaggle</div>
        <ul>
          <li>Trained 105 deep learning models (21 architectures × 5 folds) for CT angiography aneurysm detection</li>
          <li>Tested 51 ensemble configurations; best ensemble META_E_top3_weighted achieved AUC 0.8624</li>
          <li>Key discovery: Smaller models (SE-ResNet18) statistically outperform larger models on limited medical data (r=-0.42, p&lt;0.01)</li>
          <li>Built complete pipeline: DICOM→NIfTI→ROI extraction→Training→Ensemble across 4 GPUs simultaneously</li>
          <li>Multi-label classification across 14 classes with severe class imbalance handling (1.2% to 42.8%)</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">Apollo Healthcare Connect</div>
        <div class="project-subtitle">Production Multi-modal AI Healthcare Triage System | MS Capstone</div>
        <div class="project-url">apollohealthcareconnect.com</div>
        <ul>
          <li>Built and deployed live production healthcare AI triage system with sub-second response times</li>
          <li>Achieved <strong>93.8% combined multi-modal accuracy</strong> and <strong>98.0% burn classification accuracy</strong></li>
          <li>Implemented 5-model ensemble architecture combining DistilBERT (NLP) and CNNs (Computer Vision)</li>
          <li>Successfully handled extreme class imbalance (29.7:1 ratio) with advanced loss functions</li>
          <li>Built production pipeline with Flask API, AWS S3 integration, and comprehensive safety protocols</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">Missing Persons Outlier Detection</div>
        <div class="project-subtitle">Statistical Anomaly Detection for Trafficking & Organized Crime Analysis</div>
        <div class="project-url">github.com/XxRemsteelexX/missing-persons-outlier-detection</div>
        <ul>
          <li>Analyzed 41,200 missing persons and unidentified bodies cases across 101 years (9,204 county-decade combinations)</li>
          <li>Identified I-35 corridor trafficking pattern with +10.80 cases/year acceleration</li>
          <li>Discovered Kenedy County, TX anomaly: 46.86 standard deviations above baseline</li>
          <li>Built 7-page interactive Streamlit dashboard with geospatial visualization and 5-year forecasting</li>
          <li>Validated methodology against known serial killers (Ridgway: 4.38σ, Gacy: 1.34σ)</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">NFL Rookie Wide Receiver Performance Prediction</div>
        <div class="project-subtitle">Advanced ML Analysis with Feature Optimization | BS Capstone</div>
        <div class="project-url">github.com/XxRemsteelexX/NFL_Rookie_WR_1K_Analysis</div>
        <ul>
          <li>Developed predictive model achieving <strong>90.9% ROC AUC</strong> on future data validation for 1000+ yard seasons</li>
          <li>Reduced overfitting gap from 18.5% to 0.4% (97.8% reduction) through feature optimization (46→20 features)</li>
          <li>Implemented temporal validation strategy ensuring model generalization to future NFL seasons</li>
          <li>Created production-ready ensemble model for NFL draft analysis with comprehensive data pipeline (2006-2024)</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">OE-OS <span style="font-size: 9pt; color: #e67e22; font-weight: normal;">(In Progress)</span></div>
        <div class="project-subtitle">Distributed AI Orchestration Platform | Python / FastAPI</div>
        <ul>
          <li>Three-tier LLM routing (local Ollama to cheap API to premium models) reducing costs by routing ~80% of requests to free local models</li>
          <li>Triple-layer RAG memory: BM25 over 5M+ chunks, ChromaDB semantic search, Redis session cache with graceful degradation</li>
          <li>18 MCP-compatible tools and multi-agent sandbox where 4 LLM personas deliberate at zero API cost</li>
          <li>4,200+ lines of async Python on FastAPI for a private multi-node GPU cluster</li>
        </ul>
      </div>

      <div class="project-block">
        <div class="project-title">AI Homelab & Active Memory Network</div>
        <div class="project-subtitle">Multi-Tier AI Infrastructure | 10Gb Network + RAG Pipeline</div>
        <div class="project-url">glenndalbey.com/infrastructure</div>
        <ul>
          <li>Designed and operate multi-tier AI homelab: <strong>dual RTX 5090</strong> training node + RTX 3090 Ti/3090 secondary node</li>
          <li>Built 256GB unified memory LLM inference cluster (2× Ryzen AI Max+ 395) running Kimi K2, Qwen 3, GLM 4.6</li>
          <li>Implemented automated active-memory pipeline with n8n orchestration, RAG storage, and hot/warm/cold tiering</li>
          <li>Deployed Proxmox VE backbone with pfSense firewall, VLAN segmentation, and 10Gb networking (100TB+ storage)</li>
        </ul>
      </div>

      <div class="main-section-title">PROFESSIONAL EXPERIENCE</div>

      <div class="job-block">
        <div class="job-title">Freelance Data Science Consultant</div>
        <div class="company">Thompson Parking & Mobility Consultants</div>
        <div class="dates">Current</div>
        <ul>
          <li>Provide data science and analytics consulting services for business intelligence initiatives</li>
          <li>Develop AI-powered Excel analytics platform enabling natural language data queries</li>
          <li>Design custom analytical solutions and machine learning models for client-specific challenges</li>
          <li>Support data-driven decision making through advanced analytics and predictive modeling</li>
        </ul>
      </div>

      <div class="job-block">
        <div class="job-title">Continuous Improvement Leader & Material Flow Specialist</div>
        <div class="company">John Deere, Waterloo Works & Ankeny Works</div>
        <div class="dates">2005-2020, 2021-Present</div>
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
</body>
</html>
`;

// ATS-Friendly Word Document Content - Full Detailed Version with Header
function createATSWordDoc(isOnePage = false) {
  const sections = [];

  // Contact info is in document header - body starts with Professional Summary

  // Professional Summary - FULL TEXT
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "PROFESSIONAL SUMMARY", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Data Scientist with an MS in Data Science who builds things that actually work. I enjoy building and training models on my own multi-GPU homelab, deploying new techniques, and discovering unique ways to solve problems. Whether it's analysis, research, or projections, I dig into how something ticks, figure out why, and extract information that drives better outcomes. My multi-node homelab stack lets me run production applications, train models, and run MLflow, all on my own hardware. 20+ projects on GitHub covering deep learning, medical imaging, NLP, computer vision, and analytics." }),
      ],
      spacing: { after: 120 },
    })
  );

  // Technical Skills - FULL
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "TECHNICAL SKILLS", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),
    new Paragraph({ children: [new TextRun({ text: "Programming: ", bold: true }), new TextRun("Python (Expert), SQL, TypeScript, JavaScript, R, C++")] }),
    new Paragraph({ children: [new TextRun({ text: "Deep Learning: ", bold: true }), new TextRun("PyTorch, TensorFlow/Keras, Spatial-Temporal Transformers, GRU/RNN, 3D CNNs, Perceiver IO")] }),
    new Paragraph({ children: [new TextRun({ text: "ML & Data Science: ", bold: true }), new TextRun("scikit-learn, XGBoost, LightGBM, CatBoost, Pandas, NumPy, Ensemble Methods, Feature Engineering")] }),
    new Paragraph({ children: [new TextRun({ text: "Cloud & Infrastructure: ", bold: true }), new TextRun("AWS (Certified), Multi-GPU Training, Mixed Precision, Docker, Flask, FastAPI")] }),
    new Paragraph({ children: [new TextRun({ text: "Specializations: ", bold: true }), new TextRun("Trajectory Prediction, 3D Medical Imaging, Computer Vision, NLP, Multi-modal AI")], spacing: { after: 120 } })
  );

  // Featured Projects - FULL BULLETS
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "FEATURED PROJECTS", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),

    new Paragraph({ children: [new TextRun({ text: "NFL Big Data Bowl 2026 - Kaggle Bronze Medal", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Player Trajectory Prediction | Top 8% of 1,134 teams", italics: true })] }),
    new Paragraph({ text: "• Bronze Medal in prestigious Kaggle competition predicting NFL player trajectories from tracking data", bullet: { level: 0 } }),
    new Paragraph({ text: "• Conducted 847+ experiments across 15+ architectures (ST Transformers, GRU, CNN, Perceiver IO)", bullet: { level: 0 } }),
    new Paragraph({ text: "• Best ensemble: 3-model blend achieving 0.540 Public LB with architecture diversity strategy", bullet: { level: 0 } }),
    new Paragraph({ text: "• Engineered 167 features (kinematics, ball-relative, temporal, geometric with Voronoi tessellation)", bullet: { level: 0 }, spacing: { after: 100 } }),

    new Paragraph({ children: [new TextRun({ text: "RSNA Intracranial Aneurysm Detection - Kaggle Competition", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "3D Medical Imaging Deep Learning | 105 Models Trained", italics: true })] }),
    new Paragraph({ text: "• Trained 105 models (21 architectures × 5 folds) for CT angiography aneurysm detection", bullet: { level: 0 } }),
    new Paragraph({ text: "• Best ensemble AUC 0.8624; discovered smaller models outperform larger on limited medical data", bullet: { level: 0 } }),
    new Paragraph({ text: "• Built complete pipeline: DICOM→NIfTI→ROI extraction→Training→Ensemble on 4 GPUs", bullet: { level: 0 }, spacing: { after: 100 } }),

    new Paragraph({ children: [new TextRun({ text: "Apollo Healthcare Connect - apollohealthcareconnect.com", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Production Multi-modal AI Healthcare Triage | MS Capstone", italics: true })] }),
    new Paragraph({ text: "• Live production healthcare AI achieving 93.8% accuracy with sub-second response", bullet: { level: 0 } }),
    new Paragraph({ text: "• 5-model ensemble combining DistilBERT (NLP) and CNNs; handled 29.7:1 class imbalance", bullet: { level: 0 } }),
    new Paragraph({ text: "• Full production pipeline with Flask API, AWS S3, and safety protocols", bullet: { level: 0 }, spacing: { after: 100 } }),

    new Paragraph({ children: [new TextRun({ text: "Missing Persons Outlier Detection", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Statistical Anomaly Detection for Trafficking & Organized Crime", italics: true })] }),
    new Paragraph({ text: "• Analyzed 41,200 cases across 101 years identifying trafficking corridors at up to 46.86σ significance", bullet: { level: 0 } }),
    new Paragraph({ text: "• Built 7-page interactive Streamlit dashboard with geospatial visualization", bullet: { level: 0 }, spacing: { after: 100 } }),

    new Paragraph({ children: [new TextRun({ text: "AI Homelab & Active Memory Network", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Multi-Tier AI Infrastructure | 10Gb Network + RAG Pipeline", italics: true })] }),
    new Paragraph({ text: "• Dual RTX 5090 training node + 256GB unified memory LLM inference cluster", bullet: { level: 0 } }),
    new Paragraph({ text: "• Automated active-memory pipeline with n8n, RAG storage, and hot/warm/cold tiering", bullet: { level: 0 }, spacing: { after: 120 } })
  );

  // Professional Experience - FULL
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "PROFESSIONAL EXPERIENCE", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),

    new Paragraph({ children: [new TextRun({ text: "Freelance Data Science Consultant", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "Thompson Parking & Mobility Consultants | Current", italics: true })] }),
    new Paragraph({ text: "• Develop AI-powered Excel analytics platform enabling natural language data queries", bullet: { level: 0 } }),
    new Paragraph({ text: "• Design custom ML solutions and support data-driven decision making", bullet: { level: 0 }, spacing: { after: 100 } }),

    new Paragraph({ children: [new TextRun({ text: "Continuous Improvement Leader & Material Flow Specialist", bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: "John Deere, Waterloo Works & Ankeny Works | 2005-2020, 2021-Present", italics: true })] }),
    new Paragraph({ text: "• CI Department Representative leading process improvement and operational efficiency initiatives", bullet: { level: 0 } }),
    new Paragraph({ text: "• Designed Zones Project modernizing material flow training; managed SAP inventory systems", bullet: { level: 0 }, spacing: { after: 120 } })
  );

  // Education - Compact (removed AA Art Studies to fit on 1 page)
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "EDUCATION", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),
    new Paragraph({ children: [new TextRun({ text: "MS, Data Science & Analytics", bold: true }), new TextRun(" - Western Governors University (Aug 2024 - Aug 2025)")] }),
    new Paragraph({ children: [new TextRun({ text: "BS, Data Analytics", bold: true }), new TextRun(" - Western Governors University (Mar 2023 - Sep 2024)")] }),
    new Paragraph({ children: [new TextRun({ text: "AS, IT / Programming + Data Analytics Certificate", bold: true }), new TextRun(" - Clinton Community College (2022)")], spacing: { after: 120 } })
  );

  // Certifications - Compact (combined certs on fewer lines)
  sections.push(
    new Paragraph({
      children: [new TextRun({ text: "CERTIFICATIONS", bold: true, size: 24 })],
      spacing: { before: 80, after: 60 },
    }),
    new Paragraph({ text: "• CompTIA Data+ (2024-2027) and CompTIA A+ (2023-2026)", bullet: { level: 0 } }),
    new Paragraph({ text: "• AWS Cloud Practitioner (2024-2027)", bullet: { level: 0 } }),
    new Paragraph({ text: "• Udacity Nanodegrees: Deep Learning, Computer Vision, GANs, Transformers, ML DevOps", bullet: { level: 0 } })
  );

  // KEY ACCOMPLISHMENTS removed - redundant with projects section

  // Create header with contact info - this doesn't take body space!
  const docHeader = new Header({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "GLENN DALBEY", bold: true, size: 32 }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Data Science & Analytics Professional", italics: true, size: 22 }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "319-233-4445 | dalbeyglenn@gmail.com | glenndalbey.com", size: 18 }),
        ],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "linkedin.com/in/glenn-dalbey-205b7a44 | github.com/XxRemsteelexX", size: 18 }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 80 },
      }),
    ],
  });

  return new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.9),  // Space for header
            bottom: convertInchesToTwip(0.3),
            left: convertInchesToTwip(0.5),
            right: convertInchesToTwip(0.5),
          },
        },
      },
      headers: {
        default: docHeader,
      },
      children: sections,
    }],
  });
}

async function generatePDFs() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Generate One Page PDF
    console.log('Generating One Page PDF...');
    const pageOnePage = await browser.newPage();
    await pageOnePage.setContent(onePageHTML, { waitUntil: 'networkidle0' });
    await pageOnePage.pdf({
      path: path.join(OUTPUT_DIR, 'Glenn_Dalbey_Resume_OnePage.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('One Page PDF generated!');

    // Generate Detailed PDF
    console.log('Generating Detailed PDF...');
    const pageDetailed = await browser.newPage();
    await pageDetailed.setContent(detailedHTML, { waitUntil: 'networkidle0' });
    await pageDetailed.pdf({
      path: path.join(OUTPUT_DIR, 'Glenn_Dalbey_Resume_Detailed.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('Detailed PDF generated!');

  } finally {
    await browser.close();
  }
}

async function generateWordDocs() {
  console.log('Generating Word documents...');

  // One Page Word Doc
  const onePageDoc = createATSWordDoc(true);
  const onePageBuffer = await Packer.toBuffer(onePageDoc);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'Glenn_Dalbey_Resume_OnePage.docx'), onePageBuffer);
  console.log('One Page Word doc generated!');

  // Detailed Word Doc
  const detailedDoc = createATSWordDoc(false);
  const detailedBuffer = await Packer.toBuffer(detailedDoc);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'Glenn_Dalbey_Resume_Detailed.docx'), detailedBuffer);
  console.log('Detailed Word doc generated!');
}

async function main() {
  console.log('Starting resume generation...');
  console.log('Output directory:', OUTPUT_DIR);

  await generatePDFs();
  await generateWordDocs();

  console.log('\nAll files generated successfully!');
  console.log('Files:');
  fs.readdirSync(OUTPUT_DIR).forEach(file => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, file));
    console.log(`  ${file} (${Math.round(stats.size / 1024)}KB)`);
  });
}

main().catch(console.error);
