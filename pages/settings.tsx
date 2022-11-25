import Page from "../components/Page";
import { Text } from "@chakra-ui/react";
import Account from "../components/Account";

const Settings = () => {
  return (
    <Page>
      <Text fontSize="4xl" fontWeight="bold">
        Settings
      </Text>
      <Account />
    </Page>
  );
};

export default Settings;
