
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, MessageSquare, Github, Linkedin, ExternalLink, Trophy } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="loading-skeleton w-full max-w-4xl h-96 mx-auto"></div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg-gears.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.07]"
          sizes="100vw"
          priority
        />
      </div>

      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title font-bold tracking-tight text-foreground mb-6">
              Hi, I'm{" "}
              <span className="gradient-text">Glenn Dalbey</span>
            </h1>
            <p className="hero-subtitle text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              AI Engineer & Data Scientist specializing in{" "}
              <span className="text-primary font-semibold">Data Analytics</span>,{" "}
              <span className="text-primary font-semibold">multi-modal systems</span>, and{" "}
              <span className="text-primary font-semibold">production ML deployments</span>
            </p>
          </motion.div>

          {/* Key achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Kaggle Bronze Medalist</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>93.8% Healthcare AI Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Live Production Systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>WGU Data Science Graduate</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="#ai-chat">
              <Button size="lg" className="group hover-lift">
                <MessageSquare className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ask AI About My Work
              </Button>
            </Link>
            
            <Link href="#projects">
              <Button variant="outline" size="lg" className="hover-lift">
                View Projects
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            <Link href="#resume">
              <Button variant="secondary" size="lg" className="hover-lift">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </Link>
          </motion.div>

          {/* Achievement highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto"
          >
            {/* Kaggle Bronze Medal */}
            <Link
              href="/images/kaggle-bronze-medal.png"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="glass-effect rounded-xl hover-lift cursor-pointer group border-yellow-500/20 hover:border-yellow-500/50 transition-colors h-full overflow-hidden">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src="/images/kaggle-bronze-medal.png"
                    alt="Kaggle Bronze Medal - NFL Big Data Bowl 2026"
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold">Kaggle Bronze Medal</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    NFL Big Data Bowl 2026 -- Top 8% of 1,134 teams
                  </p>
                </div>
              </div>
            </Link>

            {/* Featured Project */}
            <div className="p-5 glass-effect rounded-xl hover-lift h-full flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <ExternalLink className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-semibold">Live Production AI</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Apollo Healthcare Connect -- Multi-modal AI triage system serving real patients with 93.8% accuracy and sub-second response times.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">DistilBERT</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Computer Vision</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">Flask</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">AWS</span>
              </div>
              <ul className="text-xs text-muted-foreground space-y-1 mb-4 flex-1">
                <li>5-model ensemble (NLP + CV)</li>
                <li>98% burn classification accuracy</li>
                <li>Handles 29.7:1 class imbalance</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="https://apollohealthcareconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Live Demo
                  </Button>
                </Link>
                <Link
                  href="https://github.com/XxRemsteelexX/Apollo_Healthcare_Connect"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="text-xs">
                    <Github className="w-3 h-3 mr-1" />
                    Source Code
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center space-x-6 pt-4"
          >
            <Link
              href="https://github.com/XxRemsteelexX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:bg-muted rounded-full transition-all hover:scale-110"
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:bg-muted rounded-full transition-all hover:scale-110"
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Link href="#about">
          <Button variant="ghost" size="sm" className="animate-bounce">
            <ArrowDown className="w-5 h-5" />
            <span className="sr-only">Scroll to about section</span>
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
