
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Mic, MicOff, Volume2, VolumeX, Sparkles, Brain, Zap, Send } from "lucide-react";
import { motion } from "framer-motion";

// Extend window interface for speech APIs
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AIChatbotSection() {
  const [mounted, setMounted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Initialize speech recognition and synthesis
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';
        setRecognition(recognitionInstance);
      }
      
      if (window.speechSynthesis) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        // Show user-friendly error
        if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.');
        }
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start recognition:', error);
        setIsListening(false);
      }
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      synthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to get response');
      
      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.message };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!mounted) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="loading-skeleton w-full h-96"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="ai-chat" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="w-8 h-8 text-primary" />
            <h2 className="text-4xl font-bold">AI Assistant</h2>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ask questions about my projects, technical experience, or get insights into my work. 
            This AI assistant knows all about my GitHub repositories and professional background.
          </p>
        </motion.div>

        {/* Voice Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <Card className="p-6 glass-effect">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">Voice Controls:</div>
              
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={!recognition}
                className={`${isListening ? "voice-recording" : ""} relative`}
              >
                {isListening ? (
                  <>
                    <MicOff className="w-4 h-4 mr-2" />
                    Stop Listening
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Input
                  </>
                )}
              </Button>

              <Button
                variant={isSpeaking ? "destructive" : "outline"}
                size="sm"
                onClick={isSpeaking ? stopSpeaking : () => speakText("Hello! I'm Glenn's AI assistant. How can I help you today?")}
                disabled={!synthesis}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 mr-2" />
                    Stop Speaking
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 mr-2" />
                    Test Voice
                  </>
                )}
              </Button>
            </div>
            
            {(!recognition || !synthesis) && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Voice features require a modern browser with speech support
              </p>
            )}
          </Card>
        </motion.div>

        {/* Main Chatbot Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="chatbot-container max-w-5xl mx-auto"
        >
          <Card className="h-[600px] flex flex-col glass-effect">
            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium mb-2">Hello! I'm Glenn's AI Assistant</p>
                  <p className="text-sm">Ask me anything about Glenn's projects, technical experience, or skills!</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {message.content}
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 p-1 h-auto"
                        onClick={() => speakText(message.content)}
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-4 rounded-lg animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-6 border-t">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Glenn's projects, skills, or experience..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!input.trim() || isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="p-6 hover-lift glass-effect text-center">
            <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Project Insights</h3>
            <p className="text-sm text-muted-foreground">
              Get detailed explanations of my projects, technologies used, and implementation approaches
            </p>
          </Card>

          <Card className="p-6 hover-lift glass-effect text-center">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Technical Discussion</h3>
            <p className="text-sm text-muted-foreground">
              Discuss AI/ML concepts, ask about my experience with specific technologies
            </p>
          </Card>

          <Card className="p-6 hover-lift glass-effect text-center">
            <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Analyze my GitHub repositories and provide insights into my coding patterns
            </p>
          </Card>
        </motion.div>

        {/* Quick questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold mb-6">Try asking about:</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Apollo Healthcare Connect project",
              "Multi-modal AI implementation",
              "YouTube Video Analyzer with Whisper",
              "Production ML deployment experience",
              "TensorFlow vs PyTorch preference",
              "Healthcare AI challenges",
              "Audio-visual fusion techniques"
            ].map((question) => (
              <Button
                key={question}
                variant="outline"
                size="sm"
                className="text-xs hover-lift"
                onClick={() => {
                  setInput(question);
                }}
              >
                "{question}"
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
