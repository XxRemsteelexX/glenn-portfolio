
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Brain, 
  Heart, 
  Target,
  ExternalLink,
  Github,
  Linkedin
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function CountUp({ end, suffix = "", duration = 2000 }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return <span className="animate-count-up">{count}{suffix}</span>;
}

export function AboutSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const achievements = [
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "Kaggle Bronze Medal",
      description: "NFL Big Data Bowl 2026 -- Top 8% of 1,134 teams",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "93.8% AI Accuracy",
      description: "Live healthcare triage system serving real patients",
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "Multi-modal AI",
      description: "Combined text and image analysis expertise",
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: "25.4% Cost Reduction",
      description: "Supply chain optimization through linear programming",
    },
  ];

  const stats = [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Technologies Mastered", value: 26, suffix: "" },
    { label: "Production Systems", value: 3, suffix: "" },
  ];

  if (!mounted) {
    return (
      <section className="py-20 section-bg-alt">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 section-bg-alt relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/about-bg-dashboard.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12]"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">About Glenn</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate AI engineer with a proven track record of building and deploying 
            production machine learning systems that make a real-world impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Personal story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-semibold">My Journey</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  My journey into AI and data science began with a fascination for solving 
                  complex problems through technology. What started as curiosity about machine 
                  learning algorithms evolved into a passion for building systems that can 
                  genuinely improve people's lives.
                </p>
                <p>
                  The turning point came when I developed Apollo Healthcare Connect - a 
                  multi-modal AI system that combines natural language processing with computer 
                  vision to provide medical triage with 93.8% accuracy. Seeing this system develop
                  into a tool that could help real patients find appropriate care reinforced my commitment to 
                  practical, impactful AI applications.
                </p>
                <p>
                  Today, I specialize in bridging the gap between cutting-edge AI research 
                  and real-world deployment, with particular expertise in data analytics, 
                  multi-modal systems, and production ML pipelines.
                </p>
              </div>
            </Card>

            {/* Education */}
            <Card className="glass-effect p-6">
              <div className="flex items-center space-x-3 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-500" />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-medium">Master of Science, Data Science and Data Analytics</div>
                      <div className="text-sm text-muted-foreground">Western Governors University</div>
                    </div>
                    <Badge variant="secondary">2025</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Advanced graduate program focused on machine learning, statistical analysis, and practical AI applications.
                    Completed advanced capstone projects in healthcare AI and sports analytics with production deployment.
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-medium">Bachelor of Science, Data Analytics</div>
                      <div className="text-sm text-muted-foreground">Western Governors University</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <div className="font-medium">Associate of Science, IT Programming</div>
                      <div className="text-sm text-muted-foreground">Clinton Community College</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Achievements and stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Key achievements */}
            <Card className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-6">Key Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-center mb-3">{achievement.icon}</div>
                    <div className="font-semibold text-sm mb-1">{achievement.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Stats */}
            <Card className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Quick links */}
            <Card className="glass-effect p-6">
              <h3 className="text-xl font-semibold mb-4">Connect & Explore</h3>
              <div className="space-y-3">
                <Link
                  href="https://apollohealthcareconnect.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-between">
                    <span>View Live Healthcare AI System</span>
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="https://github.com/XxRemsteelexX"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
