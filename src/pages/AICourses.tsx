
import React from "react";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Users, Clock, Star, Award } from "lucide-react";

const AICourses = () => {
  const courses = [
    {
      title: "AI Fundamentals",
      description: "Learn the basics of artificial intelligence and machine learning",
      icon: <BookOpen className="w-8 h-8" />,
      color: "text-blue-400",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8
    },
    {
      title: "Machine Learning Mastery",
      description: "Deep dive into ML algorithms and practical applications",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-green-400",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.9
    },
    {
      title: "Deep Learning Specialization",
      description: "Master neural networks and deep learning techniques",
      icon: <Award className="w-8 h-8" />,
      color: "text-purple-400",
      duration: "12 weeks",
      level: "Advanced",
      rating: 4.7
    },
    {
      title: "AI for Business",
      description: "Apply AI solutions to real-world business problems",
      icon: <Users className="w-8 h-8" />,
      color: "text-cyan-400",
      duration: "4 weeks",
      level: "Beginner",
      rating: 4.6
    },
    {
      title: "Computer Vision",
      description: "Build applications that can see and understand images",
      icon: <Star className="w-8 h-8" />,
      color: "text-yellow-400",
      duration: "10 weeks",
      level: "Intermediate",
      rating: 4.8
    },
    {
      title: "Natural Language Processing",
      description: "Create AI systems that understand and generate human language",
      icon: <Clock className="w-8 h-8" />,
      color: "text-red-400",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.9
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col relative bg-transparent overflow-x-hidden">
      <Background />
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-glow">
            AI <span className="text-primary">Courses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master artificial intelligence with our comprehensive courses designed for all skill levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <Card key={index} className="glass-panel hover:glow transition-all duration-300 cursor-pointer group">
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 ${course.color} group-hover:scale-110 transition-transform duration-300`}>
                  {course.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-white">
                  {course.title}
                </CardTitle>
                <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
                  <span className="bg-primary/20 px-2 py-1 rounded-full">{course.level}</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-300 mb-4">
                  {course.description}
                </CardDescription>
                <Button className="btn-primary w-full">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Why Choose Our AI Courses?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <GraduationCap className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
              <p className="text-gray-400">Learn from industry professionals with years of experience</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Community Support</h3>
              <p className="text-gray-400">Join a community of learners and get help when you need it</p>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-semibold text-white mb-2">Certification</h3>
              <p className="text-gray-400">Get recognized certificates upon course completion</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AICourses;
