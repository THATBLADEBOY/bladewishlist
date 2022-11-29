import {
  HStack,
  Avatar,
  Text,
  Box,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { GetServerSidePropsContext } from "next";
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { Database } from "../lib/database.types";

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any[]>([]);

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function getUsers() {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase.from("profiles").select(
        `id,
        username,
        avatar_url,
        wish_list_item (id, url)`
      );

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setDashboardData(data);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SideNav>
      <Box
        w={{ base: "full", md: "60%" }}
        borderBottom="1px"
        borderRight={{ base: "none", md: "1px" }}
        borderColor={{ base: "gray.200", md: "gray.200" }}
        p={4}
      >
        <HStack>
          <Avatar size="md" />
          <Box w="full">
            <Input w="full" variant={"filled"} placeholder="What ya want?" />
            <Text fontSize={"small"} color="gray.400" pl={4}>
              ex: https://www.target.com/dp/B08H95Y452
            </Text>
          </Box>
        </HStack>
        <Flex justifyContent={"flex-end"}>
          <Button mt={4} colorScheme={"twitter"} w={{ base: "100%" }}>
            Add Item
          </Button>
        </Flex>
      </Box>
    </SideNav>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
