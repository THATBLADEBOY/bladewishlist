import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import Dashboard from "../components/Dashboard";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
        //  <Account session={session} />
        <Dashboard session={session} />
      )}
    </div>
  );
};

export default Home;
