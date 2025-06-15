
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Code, Image, MessageSquare, Zap, Wrench } from "lucide-react";

const AITools = () => {
  const tools = [
    {
      title: "Code Generator",
      description: "Generate code snippets and complete functions using AI",
      icon: <Code className="w-8 h-8" />,
      color: "text-blue-400"
    },
    {
      title: "Image Creator",
      description: "Create stunning images and artwork with AI assistance",
      icon: <Image className="w-8 h-8" />,
      color: "text-purple-400"
    },
    {
      title: "Chat Assistant",
      description: "Intelligent conversational AI for all your questions",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "text-green-400"
    },
    {
      title: "Smart Analytics",
      description: "Analyze data and generate insights automatically",
      icon: <Brain className="w-8 h-8" />,
      color: "text-cyan-400"
    },
    {
      title: "Automation Builder",
      description: "Create automated workflows and processes",
      icon: <Zap className="w-8 h-8" />,
      color: "text-yellow-400"
    },
    {
      title: "Development Tools",
      description: "Advanced tools for developers and creators",
      icon: <Wrench className="w-8 h-8" />,
      color: "text-red-400"
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-x-hidden">
      <Background />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            AI <span className="text-primary">Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover powerful AI-driven tools to enhance your productivity and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool, index) => (
            <Card key={index} className="glass-panel hover:glow transition-all duration-300 cursor-pointer group">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {tool.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 mb-4">
                  {tool.description}
                </CardDescription>
                <Button className="btn-primary w-full">
                  Try Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            More tools coming soon! Stay tuned for exciting new AI capabilities.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AITools;
