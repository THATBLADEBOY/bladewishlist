/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Text,
  Input,
  useDisclosure,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "./Modal";

export const AddItemForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let [newItem, setNewItem] = useState("");
  let [isLoading, setIsLoading] = useState(false);
  let [linkPreviewData, setLinkPreviewData] = useState<any>();

  const getLinkPreview = async () => {
    setIsLoading(true);
    const linkPreview = await fetch(`/api/getLinkPreview?link=${newItem}`).then(
      (res) => res.json()
    );
    setLinkPreviewData(linkPreview);
    setIsLoading(false);
  };

  const onAddItem = async () => {
    onOpen();
    await getLinkPreview();
  };

  return (
    <>
      <Input placeholder="url" onChange={(e) => setNewItem(e.target.value)} />
      <Button onClick={onAddItem}>Add Item</Button>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Item">
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Box>
            <HStack>
              <img src={linkPreviewData?.images[6]} alt="youknow" />
              <VStack>
                <Text>{linkPreviewData?.title}</Text>
                <Text>{linkPreviewData?.description}</Text>
              </VStack>
            </HStack>
          </Box>
        )}
      </Modal>
    </>
  );
};
