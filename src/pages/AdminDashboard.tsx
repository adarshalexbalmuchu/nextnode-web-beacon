
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import Background from "@/components/Background";
import { Users, FileText, BarChart } from "lucide-react";

export default function AdminDashboard() {
  return (
    <>
      <Background />
      <Header />
      <ProtectedRoute requiredRole="admin">
        <div className="min-h-screen w-full relative flex flex-col items-center bg-gradient-futuristic pt-10">
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
                  <div className="flex flex-wrap gap-6 justify-center">
                    <Card className="glass-panel min-w-[220px] text-center flex-1">
                      <CardHeader>
                        <CardTitle>Total Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-accent drop-shadow-neon">--</div>
                        <div className="text-xs text-muted-foreground mt-2">Loaded from Supabase</div>
                      </CardContent>
                    </Card>
                    <Card className="glass-panel min-w-[220px] text-center flex-1">
                      <CardHeader>
                        <CardTitle>Total Posts</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-4xl font-bold text-primary drop-shadow-neon">--</div>
                        <div className="text-xs text-muted-foreground mt-2">Loaded from Supabase</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="users">
                  <div className="mt-4">
                    <div className="glass-panel p-6">User Management Coming Soon...</div>
                  </div>
                </TabsContent>
                <TabsContent value="posts">
                  <div className="mt-4">
                    <div className="glass-panel p-6">Post Management Coming Soon...</div>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="mt-4">
                    <div className="glass-panel p-6">Analytics Coming Soon...</div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    </>
  );
}
