
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart2, Users, FileText } from "lucide-react";

async function fetchStats() {
  // Count users from profiles table
  const { count: userCount } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });
  // Count posts from posts table
  const { count: postCount } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });
  // Get total views
  const { data: postsData } = await supabase
    .from("posts")
    .select("view_count");
  const viewCount = postsData?.reduce(
    (acc: number, row: any) => acc + (row.view_count || 0), 0
  );
  return {
    users: userCount || 0,
    posts: postCount || 0,
    views: viewCount || 0,
  };
}

export default function AnalyticsSimple() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: fetchStats,
  });

  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <Card className="glass-panel min-w-[220px] text-center flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <Users className="text-primary" /> Total Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-accent drop-shadow-neon">{isLoading ? "--" : data?.users}</div>
          <div className="text-xs text-muted-foreground mt-2">Loaded from Supabase</div>
        </CardContent>
      </Card>
      <Card className="glass-panel min-w-[220px] text-center flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <FileText className="text-primary" /> Total Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary drop-shadow-neon">{isLoading ? "--" : data?.posts}</div>
          <div className="text-xs text-muted-foreground mt-2">Loaded from Supabase</div>
        </CardContent>
      </Card>
      <Card className="glass-panel min-w-[220px] text-center flex-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2">
            <BarChart2 className="text-primary" /> Total Views
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-blue-400 drop-shadow-neon">{isLoading ? "--" : data?.views}</div>
          <div className="text-xs text-muted-foreground mt-2">Loaded from Supabase</div>
        </CardContent>
      </Card>
    </div>
  );
}
