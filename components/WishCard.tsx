import { Box, HStack, Image, VStack, Text, Button } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../lib/database.types";

interface Wish {
  id: string;
  title: string;
  url: string;
  image: string;
  price?: string;
  created_at: string;
  user_id: string;
}

export const WishCard = ({ wish }: { wish: Wish }) => {
  const supabase = useSupabaseClient<Database>();

  const markPurchased = async () => {
    const { error } = await supabase.from("wish_list_item_purchase").insert([
      {
        id: Number(wish.id),
        purchased_by: wish.user_id,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      //   onSubmit();
    }
  };

  return (
    <Box
      borderWidth="1px"
      //   borderColor={"black"}
      overflow="hidden"
      //   boxShadow="lg"
      bg="white"
      p={4}
      _hover={{
        boxShadow: "xl",
        bg: "gray.50",
      }}
      w="100%"
    >
      <HStack spacing={4}>
        <Image
          src={wish.image}
          alt={wish.title}
          boxSize={{ base: 100, md: "200" }}
          objectFit="cover"
          minW={100}
        />
        <VStack align={"flex-start"}>
          <Text fontSize={"lg"} maxW={250} fontWeight="bold" noOfLines={1}>
            {wish.title}
          </Text>
          <Text fontSize={"xs"} color="gray.600">
            Added {new Date(wish.created_at).toLocaleDateString()}
          </Text>
          <HStack>
            <Button colorScheme="twitter">Go to site</Button>
            <Button colorScheme={"messenger"} onClick={markPurchased}>
              Mark Purchased
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};
