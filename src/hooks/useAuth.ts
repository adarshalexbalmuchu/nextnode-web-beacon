
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type UserRole = "admin" | "author" | "user" | null;

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSessionAndRole = async () => {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      // fetch role if logged in
      if (session?.user) {
        const { data, error } = await supabase.rpc("get_current_user_role");
        if (data) setRole(data as UserRole);
        else setRole(null);
      } else {
        setRole(null);
      }
      setLoading(false);
    };

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session?.user) setRole(null);
      else {
        // Delay fetching role to avoid deadlocks
        setTimeout(() => { getSessionAndRole(); }, 0);
      }
    });

    getSessionAndRole();

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, role, loading };
}
