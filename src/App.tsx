
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoadingPage from "@/components/LoadingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/Auth";
import AIBlog from "./pages/AIBlog";
import AITools from "./pages/AITools";
import AICourses from "./pages/AICourses";
import AnimationPreview from "./pages/AnimationPreview";
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time (e.g., fetch data/resources)
    const timer = setTimeout(() => setLoading(false), 2000); // 2.0s for smoother experience
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
            {/* Auth Page */}
            <Route path="/auth" element={<AuthPage />} />
            {/* AI Blog */}
            <Route path="/ai-blog" element={<AIBlog />} />
            {/* AI Tools */}
            <Route path="/ai-tools" element={<AITools />} />
            {/* Animation Preview */}
            <Route path="/animations" element={<AnimationPreview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
