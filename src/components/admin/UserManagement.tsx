
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

function getRoleColor(role: string) {
  if (role === "admin") return "bg-cyan-600";
  if (role === "author") return "bg-purple-600";
  return "bg-gray-700";
}

// Utility function to fetch all users with their roles and emails from profiles table
async function fetchUsers() {
  // Join public.profiles and user_roles
  let { data, error } = await supabase
    .from("user_roles")
    .select("id, role, user_id, assigned_at, profiles:profiles!user_roles_user_id_fkey(email)")
    .order("assigned_at", { ascending: false });

  if (error) throw error;
  // Filter for unique users (by user_id)
  const uniqueUsers: { [id: string]: any } = {};
  for (const row of data) {
    if (!uniqueUsers[row.user_id]) {
      uniqueUsers[row.user_id] = {
        user_id: row.user_id,
        role: row.role,
        email: row.profiles?.email || "N/A",
        assigned_at: row.assigned_at,
        id: row.id,
      };
    }
  }
  return Object.values(uniqueUsers);
}

function useUsers() {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });
}

function useSetRole() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ user_id, role }: { user_id: string; role: string }) => {
      // Insert new user role, Supabase policy will only let admin do this
      const { data, error } = await supabase
        .from("user_roles")
        .insert([{ user_id, role }]);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({ description: "Role updated!", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Role update failed", variant: "destructive" });
    },
  });
}

const ROLES = [
  { label: "Admin", value: "admin" },
  { label: "Author", value: "author" },
  { label: "User", value: "user" },
];

const UserManagement = () => {
  const { data: users, isLoading } = useUsers();
  const setRole = useSetRole();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Users</h3>
      <div className="overflow-x-auto">
        <Table className="glass-panel min-w-[500px]">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>Loading users...</TableCell>
              </TableRow>
            ) : (Array.isArray(users) && users.length > 0 ? users.map(user => (
              <TableRow key={user.user_id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {ROLES.map(role =>
                      role.value !== user.role && (
                        <Button
                          key={role.value}
                          size="sm"
                          variant="outline"
                          onClick={() => setRole.mutate({ user_id: user.user_id, role: role.value })}
                        >
                          Make {role.label}
                        </Button>
                      )
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>No users found</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
