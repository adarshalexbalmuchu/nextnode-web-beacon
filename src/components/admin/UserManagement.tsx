
import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Add optional first_name and last_name for better admin UI experience
type UserRole = "admin" | "author" | "user";

interface ManagedUser {
  id: string;
  email: string;
  role: UserRole;
  assigned_at: string;
  first_name?: string | null;
  last_name?: string | null;
}

function roleBadgeColor(role: UserRole) {
  if (role === "admin") return "bg-cyan-600";
  if (role === "author") return "bg-purple-600";
  return "bg-gray-700";
}

async function fetchUsers(): Promise<ManagedUser[]> {
  // Corrected join: profiles is joined on user_roles.user_id = profiles.id
  const { data, error } = await supabase
    .from("user_roles")
    .select("user_id, role, assigned_at, profiles(id, email, first_name, last_name)")
    .order("assigned_at", { ascending: false });

  if (error) throw error;
  // Guard for empty data or error
  if (!Array.isArray(data)) return [];

  // Filter and de-duplicate by user_id, only use the latest role assignment
  const seen = new Set<string>();
  const users: ManagedUser[] = [];

  for (const row of data) {
    // Skip rows where there is no profiles join (could be a query error object)
    if (!row.profiles || typeof row.profiles !== "object") continue;
    if (!seen.has(row.user_id)) {
      users.push({
        id: row.user_id,
        email: row.profiles.email || "N/A",
        first_name: row.profiles.first_name ?? "",
        last_name: row.profiles.last_name ?? "",
        role: row.role as UserRole,
        assigned_at: row.assigned_at,
      });
      seen.add(row.user_id);
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
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Change Role</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading users...</TableCell>
              </TableRow>
            ) : (Array.isArray(users) && users.length > 0 ? users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  {(user.first_name || user.last_name)
                    ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim()
                    : "—"}
                </TableCell>
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
                <TableCell colSpan={5}>No users found</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;

