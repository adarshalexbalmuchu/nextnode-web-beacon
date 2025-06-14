
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Fetch all posts with author name and published state
async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("id,title,slug,author,published,created_at,updated_at,view_count")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

function usePosts() {
  return useQuery({
    queryKey: ["admin-posts"],
    queryFn: fetchPosts,
  });
}

function useUpdatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (post: any) => {
      const { id, ...fields } = post;
      const { error } = await supabase
        .from("posts")
        .update(fields)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ description: "Post updated", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Error updating post", variant: "destructive" });
    },
  });
}

function useDeletePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ description: "Post deleted", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Error deleting post", variant: "destructive" });
    },
  });
}

// Create post
function useCreatePost() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      // Slug: lower-case, dashes
      const slug = title.toLowerCase().replace(/\s+/g, "-");
      const { error } = await supabase
        .from("posts")
        .insert([{ title, slug, content: "", author: "Admin", published: false }]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ description: "Post created", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["admin-posts"] });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Error creating post", variant: "destructive" });
    }
  });
}

const PostManagement = () => {
  const { data: posts, isLoading } = usePosts();
  const createPost = useCreatePost();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();

  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Posts</h3>
      {/* Create new post */}
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="New post title"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          className="max-w-xs"
        />
        <Button
          disabled={!newTitle}
          onClick={() => {
            createPost.mutate({ title: newTitle });
            setNewTitle("");
          }}
        >Create</Button>
      </div>
      <div className="overflow-x-auto">
        <Table className="glass-panel min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading posts...</TableCell>
              </TableRow>
            ) : (Array.isArray(posts) && posts.length > 0 ? posts.map((post: any) => (
              <TableRow key={post.id}>
                <TableCell>
                  {editingId === post.id ? (
                    <div className="flex gap-2">
                      <Input
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button
                        size="sm"
                        onClick={() => {
                          updatePost.mutate({ id: post.id, title: editTitle });
                          setEditingId(null);
                        }}
                      >Save</Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        setEditingId(post.id);
                        setEditTitle(post.title);
                      }}
                    >{post.title}</span>
                  )}
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updatePost.mutate({ id: post.id, published: !post.published })}
                    className="ml-2"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                </TableCell>
                <TableCell>{post.view_count ?? 0}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deletePost.mutate(post.id)}
                  >Delete</Button>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5}>No posts found</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PostManagement;
