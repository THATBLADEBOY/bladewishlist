import { Button, Text, Input, Image, Center } from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Database } from "../../lib/database.types";

type Input = {
  title: string;
  price: string;
};

interface AddProductDetailsFromProps {
  url: string;
  image: string;
  title: string;
  price: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const AddProductDetailsFrom = ({
  url,
  image,
  title,
  price,
  onSubmit,
  onClose,
}: AddProductDetailsFromProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  let [itemTitle, setItemTitle] = useState(title);
  let [itemPrice, setItemPrice] = useState(price);

  const supabase = useSupabaseClient<Database>();
  const session = useSession();

  const onSubmitItem = async (data: Input) => {
    const { error } = await supabase.from("wish_list_item").insert({
      user_id: session?.user.id ?? "",
      title: data?.title,
      url,
      image,
    });
    if (error) {
      console.log(error);
    } else {
      onSubmit();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmitItem(data))}>
      <Center mb={4}>
        <Image src={image} alt={itemTitle} boxSize={"250"} objectFit="cover" />
      </Center>
      <Text fontSize="md" mb={2}>
        Title
      </Text>
      <Input
        type="text"
        {...register("title", { required: true })}
        placeholder="Charizard Pokemon Card"
        value={itemTitle}
        onChange={(e) => setItemTitle(e.target.value)}
      />
      <Text color={"fuchsia"} my={2} fontSize="sm">
        {errors.title && "Please provide a title."}
      </Text>
      <Text fontSize="md" mb={2}>
        Price
      </Text>
      <Input
        type="text"
        {...register("price", { required: true })}
        placeholder="$420.69"
        value={itemPrice}
        onChange={(e) => setItemPrice(e.target.value)}
      />
      <Text color={"fuchsia"} my={2} fontSize="sm">
        {errors.price && "Please provide a price."}
      </Text>

      <Button colorScheme={"teal"} mt={4} type="submit" w="100%">
        Add Item
      </Button>
    </form>
  );
};
