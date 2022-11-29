import { SimpleGrid } from "@chakra-ui/react";
import { WishCard } from "../../components/WishCard";
import SideNav from "../../components/SideNav";
import { GetServerSidePropsContext } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

type Wish = {
  id: string;
  title: string;
  url: string;
  image: string;
  user_id: string;
  created_at: string;
};

type WishesResponse = {
  wishes: Wish[] | null;
};

const WishList = ({ wishes }: WishesResponse) => {
  return (
    <SideNav>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {wishes?.map((wish, i) => (
          <WishCard key={i} wish={wish} />
        ))}
      </SimpleGrid>
    </SideNav>
  );
};

export default WishList;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: WishesResponse }> {
  const supabase = createServerSupabaseClient(context);
  const { id } = context.params as { id: string };
  const { data, error, status } = await supabase
    .from("wish_list_item")
    .select("id, user_id, url, image, title, created_at")
    .eq("user_id", id);

  return {
    props: {
      wishes: data,
    },
  };
}
