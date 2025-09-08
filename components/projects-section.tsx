
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Star, GitFork, Calendar, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  featured: boolean;
  stars: number;
  forks: number;
  language?: string;
  createdAt: string;
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    filter === 'all' || (filter === 'featured' && project.featured)
  );

  if (loading) {
    return (
      <section className="py-20 section-bg-alt">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 section-bg-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore my portfolio of AI and data science projects, from healthcare applications 
            to sports analytics and optimization solutions.
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All Projects ({projects.length})
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'outline'}
              onClick={() => setFilter('featured')}
            >
              <Star className="w-4 h-4 mr-2" />
              Featured ({projects.filter(p => p.featured).length})
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift glass-effect group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                        {project.featured && (
                          <Star className="inline-block w-4 h-4 ml-2 text-yellow-500 fill-current" />
                        )}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    {project.language && (
                      <div className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span>{project.language}</span>
                      </div>
                    )}
                    {project.stars > 0 && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 6 && (
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          +{project.technologies.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex space-x-2">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full group-hover:border-primary transition-colors"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          size="sm"
                          className="w-full"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Button>
                      </Link>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border/50">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(project.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* GitHub sync status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="inline-block p-4 glass-effect">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Projects automatically synced from</span>
              <Link
                href="https://github.com/XxRemsteelexX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
