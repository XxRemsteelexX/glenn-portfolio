
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <header className="fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 loading-skeleton">
          </div>
        </div>
      </header>
    );
  }

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#ai-chat", label: "AI Assistant" },
    { href: "#resume", label: "Resume" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "glass-effect shadow-lg" 
          : "bg-transparent"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="#home" 
            className="font-bold text-xl gradient-text hover:scale-105 transition-transform"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Glenn Dalbey
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors duration-200 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://github.com/XxRemsteelexX"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-effect rounded-lg mt-2 mb-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Social Links */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-border/50">
                <Link
                  href="https://github.com/XxRemsteelexX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/glenn-dalbey-205b7a44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
