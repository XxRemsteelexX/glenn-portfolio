
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Calendar, 
  CheckCircle, 
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Target,
  Zap,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function ResumeSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const downloadFile = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/resume/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="resume" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Resume & CV</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Complete professional resume showcasing my experience in AI, data science, and machine learning.
          </p>

          {/* View Resume Button */}
          <div className="flex justify-center mb-6">
            <Link href="/resume">
              <Button size="lg" className="hover-lift">
                <FileText className="w-5 h-5 mr-2" />
                View Full Resume
              </Button>
            </Link>
          </div>

          {/* Download buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-medium text-muted-foreground">One Page</span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => downloadFile('Glenn_Dalbey_Resume_OnePage.pdf')}
                  className="hover-lift"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadFile('Glenn_Dalbey_Resume_OnePage.docx')}
                  className="hover-lift"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </Button>
              </div>
            </div>

            <div className="h-16 w-px bg-border mx-2"></div>

            <div className="flex flex-col items-center space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Detailed</span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => downloadFile('Glenn_Dalbey_Resume_Detailed.pdf')}
                  className="hover-lift"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadFile('Glenn_Dalbey_Resume_Detailed.docx')}
                  className="hover-lift"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Word
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Resume Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect mb-8">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-5xl font-bold mb-2">Glenn Dalbey</h1>
                  <p className="text-xl text-primary font-semibold mb-4">Data Science & Analytics Professional</p>
                  
                  <div className="flex flex-wrap justify-center items-center gap-6 text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>319.233.4445</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>dalbeyglenn@gmail.com</span>
                    </div>
                    <Link
                      href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-primary transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Profile</span>
                    </Link>
                    <Link
                      href="https://github.com/XxRemsteelexX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 hover:text-primary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub Portfolio</span>
                    </Link>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Professional Summary
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Data Science professional with <strong>Master's in Data Science and Analytics</strong> and proven expertise in competitive ML.
                    <strong> Kaggle Bronze Medalist</strong> (NFL Big Data Bowl 2026 - Top 8%, 74th open / 94th closed of 1,134 teams) with 847+ experiments across 15+ architectures.
                    Trained 105 3D medical imaging models and deployed production healthcare AI achieving <strong>93.8% accuracy</strong>.
                    Expert in spatial-temporal modeling, trajectory prediction, ensemble methods, and multi-modal AI.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Core Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2 text-primary" />
                  Core Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Programming & Deep Learning</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Python", "PyTorch", "TensorFlow", "SQL", "TypeScript"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-3">Neural Network Architectures</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["Spatial-Temporal Transformers", "GRU/RNN", "3D CNNs", "Geometric Attention"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">ML & Infrastructure</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {["scikit-learn", "XGBoost", "Multi-GPU Training", "Mixed Precision", "AWS"].map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>

                    <h4 className="font-semibold mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Trajectory Prediction", "3D Medical Imaging", "Multi-modal AI", "Ensemble Methods"].map((skill) => (
                        <Badge key={skill} variant="default">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Selected Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Selected Projects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* NFL Big Data Bowl 2026 */}
                <div className="border-l-4 border-yellow-500 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg">NFL Big Data Bowl 2026 - Kaggle Bronze Medal</h4>
                    <Link
                      href="https://github.com/XxRemsteelexX/NFL-Big-Data-Bowl-2026-"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      GitHub
                    </Link>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">Player Trajectory Prediction | 74th open / 94th closed of 1,134 teams (Top 8%)</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                    <li>• <strong>Bronze Medal</strong> in prestigious Kaggle competition predicting NFL player trajectories</li>
                    <li>• 847+ experiments across 15+ architectures (ST Transformers, GRU, CNN, Perceiver IO)</li>
                    <li>• Engineered 167 features with Voronoi tessellation and geometric attention</li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {["PyTorch", "Transformers", "GRU", "Multi-GPU", "TTA"].map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* RSNA Medical Imaging */}
                <div className="border-l-4 border-primary pl-6">
                  <h4 className="font-bold text-lg mb-2">RSNA Intracranial Aneurysm Detection</h4>
                  <p className="text-sm text-primary font-medium mb-2">3D Medical Imaging | 105 Models Trained</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                    <li>• Trained 105 deep learning models (21 architectures × 5 folds) for CT angiography</li>
                    <li>• Best ensemble <strong>AUC 0.8624</strong>; discovered smaller models outperform larger on limited data</li>
                    <li>• Complete pipeline: DICOM→NIfTI→ROI→Training→Ensemble on 4 GPUs</li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {["PyTorch", "3D CNNs", "SE-ResNet", "nibabel", "Multi-GPU"].map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* Apollo Healthcare Connect */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg">Apollo Healthcare Connect</h4>
                    <Link
                      href="https://apollohealthcareconnect.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live System
                    </Link>
                  </div>
                  <p className="text-sm text-primary font-medium mb-2">Production Multi-modal AI Healthcare Triage | MS Capstone</p>
                  <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                    <li>• Live production system achieving <strong>93.8% accuracy</strong> with sub-second response</li>
                    <li>• 5-model ensemble combining DistilBERT and CNNs; handled 29.7:1 class imbalance</li>
                  </ul>
                  <div className="flex flex-wrap gap-1">
                    {["PyTorch", "TensorFlow", "Flask", "DistilBERT", "AWS S3"].map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Professional Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-primary" />
                  Professional Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg">Freelance Data Science Consultant</h4>
                    <Badge>Current</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Thompson Parking and Consultants</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Provide data science and analytics consulting services</li>
                    <li>• Develop custom analytical solutions and machine learning models</li>
                    <li>• Support business intelligence and data-driven decision making</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Previous Professional Experience</h4>
                  <p className="text-primary font-medium">John Deere</p>
                  <p className="text-sm text-muted-foreground">Applied data science and analytical skills in corporate environment</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-lg">Master of Science in Data Science</h4>
                    <Badge variant="secondary">August 2025</Badge>
                  </div>
                  <p className="text-primary font-medium mb-1">Western Governors University</p>
                  <p className="text-sm text-muted-foreground">
                    Capstone: Multi-modal AI healthcare triage system (production deployed)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg mb-2">Bachelor of Science in Data Analytics</h4>
                  <p className="text-primary font-medium mb-1">Western Governors University</p>
                  <p className="text-sm text-muted-foreground">
                    Capstone: NFL Rookie Wide Receiver Performance Prediction Model
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Accomplishments */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Key Accomplishments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                      <strong>Kaggle Bronze Medal</strong> - NFL Big Data Bowl 2026 (Top 8%, 74th open / 94th closed of 1,134)
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      847+ deep learning experiments across 15+ neural network architectures
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      Trained 105 3D medical imaging models achieving AUC 0.8624 ensemble
                    </li>
                  </ul>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      Production healthcare AI achieving 93.8% accuracy with sub-second response
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      Analyzed 41,200 cases identifying trafficking patterns at 44.75σ significance
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                      Published 15+ open-source projects on GitHub
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
