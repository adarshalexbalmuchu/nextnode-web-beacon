
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type UserRole = "admin" | "author" | "user";

interface ManagedUser {
  id: string;
  email: string;
  role: UserRole;
  assigned_at: string;
}

function roleBadgeColor(role: UserRole) {
  if (role === "admin") return "bg-cyan-600";
  if (role === "author") return "bg-purple-600";
  return "bg-gray-700";
}

async function fetchUsers(): Promise<ManagedUser[]> {
  // Get all users by joining user_roles to profiles (supabase-js expects the join as .select(..., profiles!fk(email, first_name, ...)))
  const { data, error } = await supabase
    .from("user_roles")
    .select("user_id: user_id, role, assigned_at, profiles: profiles!user_roles_user_id_fkey(email)")
    .order("assigned_at", { ascending: false });

  if (error) throw error;

  // De-duplicate by user_id (most recent assignment per user)
  const seen = new Set<string>();
  const users: ManagedUser[] = [];
  if (Array.isArray(data)) {
    for (const row of data) {
      if (!seen.has(row.user_id)) {
        users.push({
          id: row.user_id,
          email: row.profiles?.email || "N/A",
          role: row.role as UserRole,
          assigned_at: row.assigned_at,
        });
        seen.add(row.user_id);
      }
    }
  }
  return users;
}

function useUsers() {
  return useQuery<ManagedUser[], Error>({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
  });
}

function useSetRole() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, newRole }: { userId: string; newRole: UserRole }) => {
      // Insert new user_roles entry (do not update, always append, as per the schema)
      const { error } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId, role: newRole as UserRole }]);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast({ description: "Role updated successfully", variant: "default" });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: any) => {
      toast({ description: error.message || "Failed to update role", variant: "destructive" });
    },
  });
}

const ROLES: UserRole[] = ["admin", "author", "user"];

const UserManagement = () => {
  const { data: users, isLoading } = useUsers();
  const setRole = useSetRole();

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Users</h3>
      <div className="overflow-x-auto">
        <Table className="glass-panel min-w-[600px]">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Change Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading users...</TableCell>
              </TableRow>
            ) : (Array.isArray(users) && users.length > 0 ? users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={roleBadgeColor(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={val => setRole.mutate({ userId: user.id, newRole: val as UserRole })}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(role => (
                        <SelectItem key={role} value={role} disabled={user.role === role}>
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  {user.assigned_at ? new Date(user.assigned_at).toLocaleDateString() : "--"}
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4}>No users found</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
