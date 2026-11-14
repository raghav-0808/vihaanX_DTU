import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export async function requireVetRole() {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw redirect({ to: "/auth", search: { role: "vet" } });
  }

  const { data: role, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "vet")
    .maybeSingle();
  if (error) throw new Error("We could not verify veterinarian access. Please try again.");
  if (!role) throw redirect({ to: "/dashboard" });
}
