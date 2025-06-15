
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Users, FileText, BarChart } from "lucide-react";
import UserManagement from "@/components/admin/UserManagement";
import PostManagement from "@/components/admin/PostManagement";
import AnalyticsSimple from "@/components/admin/AnalyticsSimple";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <Background />
      <Header />
      <ProtectedRoute requiredRole="admin">
        <div className="min-h-screen w-full relative flex flex-col items-center pt-10 z-10">
          <Card className="glass-panel max-w-6xl w-full mx-auto">
            <CardHeader>
              <CardTitle className="text-glow flex items-center gap-3 text-2xl">
                <BarChart className="text-primary" /> NextNode Admin Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="glass-panel flex w-full mb-8">
                  <TabsTrigger value="overview">
                    <BarChart className="mr-2" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="users">
                    <Users className="mr-2" /> Users
                  </TabsTrigger>
                  <TabsTrigger value="posts">
                    <FileText className="mr-2" /> Posts
                  </TabsTrigger>
                  <TabsTrigger value="analytics">
                    <BarChart className="mr-2" /> Analytics
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <AnalyticsSimple />
                </TabsContent>
                <TabsContent value="users">
                  <div className="mt-4">
                    <UserManagement />
                  </div>
                </TabsContent>
                <TabsContent value="posts">
                  <div className="mt-4">
                    <PostManagement />
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="mt-4">
                    {/* You can add more advanced analytics here */}
                    <AnalyticsSimple />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    </div>
  );
}
