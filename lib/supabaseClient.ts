import { createClient, SupabaseClient } from "@supabase/supabase-js";

const makeSupabaseClient = (): SupabaseClient => {
  let supabase;

  try {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_KEY || ""
    );
  } catch (error) {
    console.error(
      "Error creating Supabase client: You probably need to add your Supabase URL and key to your environment variables.",
      error
    );
  }

  return supabase as SupabaseClient;
};

const supabase = makeSupabaseClient();

export { supabase };
