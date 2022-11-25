import { useState, useEffect } from "react";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { Database } from "../lib/database.types";
import { Avatar, Text, Box, VStack, HStack } from "@chakra-ui/react";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
type WishList = Database["public"]["Tables"]["wish_list"]["Row"];
type WishListItem = Database["public"]["Tables"]["wish_list_item"]["Row"];

type DashboardResult = {
  username: Profiles["username"] | null;
  avatar_url: Profiles["avatar_url"] | null;
  wish_list: WishList[] | null;
  wish_list_item: WishListItem[] | null;
};

export default function Dashboard() {
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
        `username,
          avatar_url,
          wish_list (id, items),
          wish_list_item (id, url)`
      );

      console.log(data);

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

  const getOrderedWishList = (
    wishList: WishList[],
    wishListItems: WishListItem[]
  ) => {
    const wishListItemOrder = wishList[0].items;
    const orderedWishList = wishListItemOrder?.map((item) => {
      const wishListItem = wishListItems.find(
        (wishListItem) => wishListItem.id == Number(item)
      );
      return wishListItem;
    });
    return orderedWishList;
  };

  return (
    <>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        Friends
      </Text>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <HStack>
          {dashboardData.map((user) => (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p="4"
              bg="white"
              shadow="md"
              key={user.username}
            >
              <VStack>
                <Avatar
                  name={user.username ?? undefined}
                  src={user.avatar_url ?? undefined}
                  size="xl"
                />
                <Text fontSize={"lg"} fontWeight="bold">
                  {user.username}
                </Text>
                <Text fontSize={"sm"} color="gray.600">
                  {user.wish_list_item?.length || 0} wishes
                </Text>
              </VStack>
            </Box>
          ))}
        </HStack>
      )}
    </>
  );
}
