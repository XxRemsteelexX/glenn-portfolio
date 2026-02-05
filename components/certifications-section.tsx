"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  featured: boolean;
}

export function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      console.log('[CERTS] Fetching certifications...');
      const response = await fetch('/api/certifications');
      console.log('[CERTS] Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('[CERTS] Data received:', data);
        setCertifications(data.certifications || []);
      } else {
        console.error('[CERTS] Response not OK:', response.status, await response.text());
      }
    } catch (error) {
      console.error('[CERTS] Failed to fetch certifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (loading) {
    return (
      <section className="py-20 section-bg">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-20 section-bg relative overflow-hidden">
      {/* Dot grid pattern with fade */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Professional certifications and completed courses demonstrating expertise
            in data science, machine learning, and cloud technologies.
          </p>

          <div className="max-w-4xl mx-auto text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-effect rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-3">Industry Certifications</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• CompTIA Data+ (Valid until Feb 2027)</li>
                  <li>• AWS Certified Cloud Practitioner (Valid until Jan 2027)</li>
                  <li>• CompTIA A+ (Valid until Jun 2026)</li>
                </ul>
              </div>

              <div className="glass-effect rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-3">Specialized Training</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Advanced Computer Vision & Deep Learning - Udacity</li>
                  <li>• Machine Learning DevOps - Udacity</li>
                  <li>• Introduction to Deep Learning - Udacity</li>
                  <li>• Building Generative Adversarial Networks - Udacity</li>
                  <li>• Convolutional Neural Networks - Udacity</li>
                  <li>• Transformer Models & BERT with Google Cloud - Udacity</li>
                  <li>• PostgreSQL Essential Training - LinkedIn Learning</li>
                  <li>• Learning MongoDB - LinkedIn Learning</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover-lift glass-effect">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Award className="w-8 h-8 text-primary flex-shrink-0" />
                    {cert.featured && (
                      <Badge variant="secondary" className="ml-2">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{cert.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">
                    {cert.issuer}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Issued {formatDate(cert.issueDate)}</span>
                  </div>

                  {cert.expiryDate && (
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={isExpired(cert.expiryDate) ? "destructive" : "outline"}
                        className="text-xs"
                      >
                        {isExpired(cert.expiryDate)
                          ? `Expired ${formatDate(cert.expiryDate)}`
                          : `Expires ${formatDate(cert.expiryDate)}`}
                      </Badge>
                    </div>
                  )}

                  {cert.credentialId && (
                    <div className="text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <span className="font-medium">ID:</span> {cert.credentialId}
                    </div>
                  )}

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-sm text-primary hover:underline"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}