
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  MessageSquare,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          company: ''
        });
        toast({
          title: "Message sent successfully!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 section-bg-alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to collaborate on your next AI project? Let's discuss how my expertise 
            in machine learning and data science can help bring your ideas to life.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  <span>Let's Connect</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  I'm always interested in discussing new opportunities, whether you're 
                  looking for an AI consultant, data scientist, or full-time team member. 
                  Feel free to reach out for:
                </p>

                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AI & Machine Learning Consulting</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Healthcare AI Solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Data Science Projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Full-time Opportunities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Technical Collaboration</span>
                  </li>
                </ul>

                {/* Social Links */}
                <div className="pt-6 border-t border-border/50">
                  <h3 className="font-semibold mb-4">Connect on Social</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://github.com/XxRemsteelexX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm">GitHub</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                    </Link>
                  </div>
                </div>

                {/* Response time */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Quick Response</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I typically respond to all inquiries within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <span>Send a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="mt-2"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="mt-2"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="mt-2"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          type="text"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={submitting}
                          className="mt-2"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={submitting}
                        className="mt-2"
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        disabled={submitting}
                        className="mt-2"
                        placeholder="Tell me about your project, requirements, or how I can help..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full hover-lift" 
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Your message will be securely stored and I'll respond within 24 hours.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
