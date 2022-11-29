import { Box } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal } from "@supabase/auth-ui-react";
import { GetServerSidePropsContext } from "next";

const SignIn = () => {
  const supabase = useSupabaseClient();

  return (
    <Box maxW={500}>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeMinimal }}
        theme="dark"
        magicLink={true}
      />
    </Box>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!!session)
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
};

export default SignIn;
