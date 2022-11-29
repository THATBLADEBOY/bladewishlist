/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Text,
  useDisclosure,
  VStack,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Modal } from "../Modal";
import { AddProductDetailsFrom } from "./AddProductDetailsForm";
import { AddProductUrlForm } from "./AddProductUrlForm";

interface ItemFormValues {
  title: string;
  url: string;
  price?: string;
  notes?: string;
  image?: string;
}

export const AddItemForm = ({
  onSubmit,
  id,
}: {
  onSubmit: () => void;
  id: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [isLoading, setIsLoading] = useState(false);
  let [linkPreviewData, setLinkPreviewData] = useState<ItemFormValues>();
  const session = useSession();

  const AddItemButton = () => {
    return id === session?.user.id ? (
      <Button colorScheme={"teal"} onClick={onOpen}>
        Add Item
      </Button>
    ) : null;
  };

  return (
    <>
      <AddItemButton />
      <Modal isOpen={isOpen} onClose={onClose} title="Add Item">
        {isLoading ? (
          <Center>
            <VStack spacing={4}>
              <Spinner color="teal.500" />
              <Text fontSize={"2xl"} fontWeight="bold">
                Attempting to get item information...
              </Text>
            </VStack>
          </Center>
        ) : (
          <>
            {linkPreviewData?.url ? (
              <AddProductDetailsFrom
                url={linkPreviewData.url}
                image={linkPreviewData.image ?? ""}
                title={linkPreviewData.title}
                price={linkPreviewData.price ?? ""}
                onSubmit={onSubmit}
                onClose={onClose}
              />
            ) : (
              <AddProductUrlForm
                setLoading={setIsLoading}
                setWishListItemData={setLinkPreviewData}
              />
            )}
          </>
        )}
      </Modal>
    </>
  );
};
