
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download, MessageSquare, Github, Linkedin, ExternalLink } from "lucide-react";
import Link from "next/link";
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
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
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

          {/* Featured project highlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 p-6 glass-effect rounded-xl hover-lift max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-semibold mb-2">Featured Project</h3>
            <p className="text-muted-foreground mb-4">
              Apollo Healthcare Connect - Live AI triage system serving patients with 93.8% accuracy
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
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
                href="https://github.com/XxRemsteelexX/Capstone_MS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm" className="text-xs">
                  <Github className="w-3 h-3 mr-1" />
                  Source Code
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex justify-center space-x-6 pt-8"
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
