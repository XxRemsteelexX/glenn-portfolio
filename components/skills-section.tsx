"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Brain, Cloud, BarChart, Filter, Star, Layers, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  yearsExp?: number;
  featured: boolean;
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const proficiencyConfig: Record<string, { label: string; className: string }> = {
  Expert: {
    label: "Expert",
    className: "bg-primary text-primary-foreground border-primary",
  },
  Advanced: {
    label: "Advanced",
    className: "border-primary/60 text-primary bg-primary/10",
  },
  Intermediate: {
    label: "Intermediate",
    className: "border-muted-foreground/30 text-muted-foreground bg-muted/50",
  },
};

const fallbackSkills: Skill[] = [
  // Programming Languages
  { id: "s1", name: "Python", category: "Programming Languages", proficiency: "Expert", yearsExp: 4, featured: true },
  { id: "s2", name: "R", category: "Programming Languages", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s3", name: "TypeScript", category: "Programming Languages", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s4", name: "JavaScript", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: true },
  { id: "s5", name: "SQL", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: false },
  { id: "s6", name: "C++", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { id: "s7", name: "C#", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { id: "s8", name: "Java", category: "Programming Languages", proficiency: "Intermediate", yearsExp: 3, featured: false },
  { id: "s9", name: "HTML/CSS", category: "Programming Languages", proficiency: "Advanced", yearsExp: 3, featured: false },
  // AI/ML Frameworks
  { id: "s10", name: "PyTorch", category: "AI/ML Frameworks", proficiency: "Expert", yearsExp: 3, featured: true },
  { id: "s11", name: "TensorFlow", category: "AI/ML Frameworks", proficiency: "Expert", yearsExp: 3, featured: true },
  { id: "s12", name: "scikit-learn", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 4, featured: true },
  { id: "s13", name: "XGBoost", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s14", name: "LightGBM", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s15", name: "CatBoost", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s16", name: "AutoGluon", category: "AI/ML Frameworks", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { id: "s17", name: "TabPFN", category: "AI/ML Frameworks", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { id: "s18", name: "Transformers", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s19", name: "OpenAI API", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  { id: "s41", name: "GRU/RNN Architectures", category: "AI/ML Frameworks", proficiency: "Advanced", yearsExp: 1, featured: false },
  // Web Frameworks
  { id: "s20", name: "Flask", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s21", name: "FastAPI", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  { id: "s22", name: "Streamlit", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  { id: "s23", name: "React", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s24", name: "Node.js", category: "Web Frameworks", proficiency: "Advanced", yearsExp: 2, featured: false },
  // Cloud & Deployment
  { id: "s25", name: "AWS", category: "Cloud & Deployment", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s26", name: "Docker", category: "Cloud & Deployment", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { id: "s27", name: "CI/CD", category: "Cloud & Deployment", proficiency: "Intermediate", yearsExp: 1, featured: false },
  { id: "s28", name: "Weights & Biases", category: "Cloud & Deployment", proficiency: "Advanced", yearsExp: 1, featured: false },
  // Data & Analytics
  { id: "s29", name: "pandas", category: "Data & Analytics", proficiency: "Expert", yearsExp: 4, featured: true },
  { id: "s30", name: "numpy", category: "Data & Analytics", proficiency: "Expert", yearsExp: 4, featured: false },
  { id: "s31", name: "Tableau", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s32", name: "Data Visualization", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 3, featured: true },
  { id: "s33", name: "Statistical Analysis", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 3, featured: false },
  { id: "s34", name: "MongoDB", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 1, featured: false },
  { id: "s35", name: "PostgreSQL", category: "Data & Analytics", proficiency: "Advanced", yearsExp: 1, featured: false },
  // AI Specializations
  { id: "s36", name: "Computer Vision", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s37", name: "3D Medical Imaging", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { id: "s38", name: "Natural Language Processing", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s39", name: "Multi-modal AI", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s40", name: "Healthcare AI", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { id: "s42", name: "Ensemble Learning", category: "AI Specializations", proficiency: "Advanced", yearsExp: 2, featured: true },
  { id: "s43", name: "Feature Engineering", category: "AI Specializations", proficiency: "Advanced", yearsExp: 3, featured: true },
  { id: "s44", name: "Statistical Anomaly Detection", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: false },
  { id: "s45", name: "Spatial-Temporal Transformers", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { id: "s46", name: "Trajectory Prediction", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
  { id: "s47", name: "Geometric Deep Learning", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: false },
  { id: "s48", name: "Sports Analytics", category: "AI Specializations", proficiency: "Advanced", yearsExp: 1, featured: true },
];

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>(fallbackSkills);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        if (data.skills && data.skills.length > 0) {
          setSkills(data.skills);
        }
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    }
  };

  const organizeSkillsByCategory = (skillsList: Skill[]): SkillCategory[] => {
    const categories = new Map<string, Skill[]>();

    skillsList.forEach(skill => {
      if (!categories.has(skill.category)) {
        categories.set(skill.category, []);
      }
      categories.get(skill.category)!.push(skill);
    });

    const categoryIcons: { [key: string]: React.ReactNode } = {
      'Programming Languages': <Code className="w-5 h-5" />,
      'AI/ML Frameworks': <Brain className="w-5 h-5" />,
      'Web Frameworks': <Code className="w-5 h-5" />,
      'Cloud & Deployment': <Cloud className="w-5 h-5" />,
      'Data & Analytics': <BarChart className="w-5 h-5" />,
      'Data Science Libraries': <BarChart className="w-5 h-5" />,
      'Databases': <Layers className="w-5 h-5" />,
      'MLOps Tools': <Brain className="w-5 h-5" />,
      'Data Visualization': <BarChart className="w-5 h-5" />,
      'AI Specializations': <Sparkles className="w-5 h-5" />,
      'Data Engineering': <BarChart className="w-5 h-5" />,
    };

    return Array.from(categories.entries()).map(([name, skillsList]) => ({
      name,
      icon: categoryIcons[name] || <Code className="w-5 h-5" />,
      skills: skillsList.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const profOrder = { Expert: 0, Advanced: 1, Intermediate: 2 };
        const aOrder = profOrder[a.proficiency as keyof typeof profOrder] ?? 3;
        const bOrder = profOrder[b.proficiency as keyof typeof profOrder] ?? 3;
        if (aOrder !== bOrder) return aOrder - bOrder;
        return a.name.localeCompare(b.name);
      })
    }));
  };

  const filteredSkills = skills.filter(skill =>
    filter === 'all' || (filter === 'featured' && skill.featured)
  );

  const skillCategories = organizeSkillsByCategory(filteredSkills);

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-background relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/skills-bg-gears.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.06]"
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
          <h2 className="text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A comprehensive overview of my technical expertise across AI/ML, data science,
            and software development technologies.
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              <Filter className="w-4 h-4 mr-2" />
              All Skills ({skills.length})
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
            >
              <Star className="w-4 h-4 mr-2" />
              Featured ({skills.filter(s => s.featured).length})
            </Button>
          </div>

          {/* Proficiency legend */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {Object.entries(proficiencyConfig).map(([level, config]) => (
              <div key={level} className="flex items-center gap-2">
                <span className={`inline-block w-3 h-3 rounded-full border ${config.className}`} />
                <span className="text-muted-foreground">{config.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift glass-effect">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {category.icon}
                    </div>
                    <span className="text-lg">{category.name}</span>
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {category.skills.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => {
                      const config = proficiencyConfig[skill.proficiency] || proficiencyConfig.Intermediate;
                      return (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: skillIndex * 0.03 }}
                          viewport={{ once: true }}
                        >
                          <Badge
                            variant="outline"
                            className={`
                              px-3 py-1.5 text-sm font-medium cursor-default
                              transition-all duration-200 hover:scale-105
                              ${config.className}
                              ${skill.featured ? 'ring-1 ring-primary/30 shadow-sm' : ''}
                            `}
                          >
                            {skill.featured && (
                              <Star className="w-3 h-3 mr-1 fill-current opacity-70" />
                            )}
                            {skill.name}
                          </Badge>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="glass-effect">
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {skills.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {skills.filter(s => s.featured).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Featured</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {skillCategories.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
