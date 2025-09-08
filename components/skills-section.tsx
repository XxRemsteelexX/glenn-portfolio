
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Code, Brain, Cloud, BarChart, Filter } from "lucide-react";
import { motion } from "framer-motion";

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

const getProficiencyLevel = (proficiency: string): number => {
  switch (proficiency.toLowerCase()) {
    case 'expert': return 95;
    case 'advanced': return 80;
    case 'intermediate': return 65;
    case 'beginner': return 40;
    default: return 50;
  }
};

const getProficiencyColor = (proficiency: string): string => {
  switch (proficiency.toLowerCase()) {
    case 'expert': return 'bg-green-500';
    case 'advanced': return 'bg-blue-500';
    case 'intermediate': return 'bg-yellow-500';
    case 'beginner': return 'bg-orange-500';
    default: return 'bg-gray-500';
  }
};

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setLoading(false);
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
      'Programming Languages': <Code className="w-6 h-6" />,
      'AI/ML Frameworks': <Brain className="w-6 h-6" />,
      'Web Frameworks': <Code className="w-6 h-6" />,
      'Cloud & Deployment': <Cloud className="w-6 h-6" />,
      'Data & Analytics': <BarChart className="w-6 h-6" />,
      'AI Specializations': <Brain className="w-6 h-6" />,
    };

    return Array.from(categories.entries()).map(([name, skillsList]) => ({
      name,
      icon: categoryIcons[name] || <Code className="w-6 h-6" />,
      skills: skillsList.sort((a, b) => {
        // Sort by featured first, then by proficiency level, then by name
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const proficiencyOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
        const aLevel = proficiencyOrder[a.proficiency as keyof typeof proficiencyOrder] || 0;
        const bLevel = proficiencyOrder[b.proficiency as keyof typeof proficiencyOrder] || 0;
        if (aLevel !== bLevel) return bLevel - aLevel;
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
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex justify-center space-x-4">
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
              Featured ({skills.filter(s => s.featured).length})
            </Button>
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
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="text-primary">{category.icon}</div>
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.skills.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{skill.name}</span>
                            {skill.featured && (
                              <Badge variant="outline" className="text-xs px-2 py-0">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getProficiencyColor(skill.proficiency)} text-white`}
                            >
                              {skill.proficiency}
                            </Badge>
                            {skill.yearsExp && (
                              <span>{skill.yearsExp}y</span>
                            )}
                          </div>
                        </div>
                        <Progress 
                          value={getProficiencyLevel(skill.proficiency)} 
                          className="h-2"
                        />
                      </motion.div>
                    ))}
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {skills.filter(s => s.proficiency === 'Expert').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Expert Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {skills.filter(s => s.proficiency === 'Advanced').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Advanced Skills</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(skills.filter(s => s.yearsExp).reduce((acc, s) => acc + (s.yearsExp || 0), 0) / skills.filter(s => s.yearsExp).length) || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Experience</div>
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
