
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState<"login" | "signup">("login");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (loading) return;
    if (user) {
      if (role === "admin") navigate("/admin", { replace: true });
      else navigate("/", { replace: true });
    }
  }, [user, role, loading, navigate]);

  const handleAuth = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setPending(true);
    setError("");
    let response;
    if (variant === "login") {
      response = await supabase.auth.signInWithPassword({ email, password });
    } else {
      response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });
    }
    setPending(false);
    if (response.error) {
      setError(response.error.message || "Error with authentication.");
      toast({ description: response.error.message || "Error with authentication.", variant: "destructive" });
      return;
    }
    if (variant === "signup") {
      toast({ description: "Sign up successful! Please check your email to confirm." });
      setVariant("login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-futuristic">
      <Card className="glass-panel max-w-sm w-full">
        <CardHeader>
          <CardTitle className="mb-2">{variant === "login" ? "Log In" : "Sign Up"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleAuth}>
            <Input
              type="email"
              autoFocus
              placeholder="Email"
              value={email}
              required
              disabled={pending}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              required
              disabled={pending}
              minLength={6}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="text-sm text-red-400">{error}</div>}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? (variant === "login" ? "Logging in..." : "Signing up...") : (variant === "login" ? "Log In" : "Sign Up")}
            </Button>
          </form>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>
              {variant === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <button
              type="button"
              className="text-cyan-400 hover:underline ml-2"
              onClick={() => {
                setVariant(variant === "login" ? "signup" : "login");
                setError("");
              }}
              disabled={pending}
            >
              {variant === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
