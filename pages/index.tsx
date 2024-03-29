import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

const Home = () => {
  return <>Hello!</>;
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
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
