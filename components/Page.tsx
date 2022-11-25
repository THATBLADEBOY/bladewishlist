import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";
import SideNav from "./SideNav";

interface Props {
  children: React.ReactNode;
}

const Page = ({ children }: Props) => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return !session ? (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeMinimal }}
      theme="dark"
      magicLink={true}
    />
  ) : (
    <SideNav>{children}</SideNav>
  );
};

export default Page;
