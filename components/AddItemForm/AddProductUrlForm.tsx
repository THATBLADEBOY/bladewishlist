import { Button, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Input = {
  url: string;
};

interface AddProductUrlFormProps {
  setLoading: (loading: boolean) => void;
  setWishListItemData: (data: any) => void;
}

export const AddProductUrlForm = ({
  setLoading,
  setWishListItemData,
}: AddProductUrlFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const getLinkPreview = async (input: Input) => {
    setLoading(true);
    try {
      const linkPreview = await fetch(
        `/api/getLinkPreview?link=${input.url}`
      ).then((res) => res.json());
      setWishListItemData({
        title: linkPreview.title,
        url: input.url,
        image: linkPreview.images[0],
      });
    } catch (error) {
      setWishListItemData({ url: input.url });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => getLinkPreview(data))}>
      <Text fontSize="md" mb={2}>
        Product URL
      </Text>
      <Input
        type="text"
        {...register("url", { required: true })}
        placeholder="www.ebay.com/charizard-pokemon-card"
      />
      {errors.url && (
        <Text color={"fuchsia"} mt={1} fontSize="sm">
          Please provide a url.
        </Text>
      )}
      <Button colorScheme={"teal"} mt={4} type="submit" w="100%">
        Add URL
      </Button>
    </form>
  );
};
