import { useRouter } from "next/router";
import Page from "../../components/Page";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { Database } from "../../lib/database.types";
import { useEffect, useState } from "react";
import { Box, Text, Input, Button } from "@chakra-ui/react";
import { AddItemForm } from "../../components/AddItemForm";

const WishList = () => {
  const session = useSession();
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();
  const { id } = router.query;
  const [wishes, setWishes] = useState<any[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [newWish, setNewWish] = useState("");
  console.log(id);

  const getWishes = async () => {
    setLoading(true);
    const { data, error, status } = await supabase
      .from("wish_list_item")
      .select("id, url")
      .eq("user_id", id);

    setWishes(data);
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    if (id) {
      getWishes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!session) return;

  const createWish = async () => {
    const { data, error } = await supabase
      .from("wish_list_item")
      .insert({ user_id: session.user.id, url: newWish });
    console.log(data);
  };

  const getLinkPreview = async () => {
    await fetch(`/api/getLinkPreview?link=${newWish}`).then((res) =>
      console.log(res)
    );
    // console.log(linkPreviewData);
  };

  return (
    <Page>
      {loading ? (
        <Box>Loading...</Box>
      ) : (
        <>
          <Text fontSize="4xl" fontWeight="bold">
            wish list
          </Text>
          {wishes?.map((wish, i) => (
            <Box key={wish.id ?? i} bg="white">
              <div key={wish.id}>{wish.id}</div>
              <div key={wish.url}>{wish.url}</div>
            </Box>
          ))}
          {/* <Input
            placeholder="url"
            onChange={(e) => setNewWish(e.target.value)}
          />
          <Button onClick={getLinkPreview}>create wish</Button> */}
          <AddItemForm />
        </>
      )}
    </Page>
  );
};

export default WishList;
