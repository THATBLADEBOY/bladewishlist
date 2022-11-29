import React, { ReactNode } from "react";
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Text,
  FlexProps,
} from "@chakra-ui/react";
import { FiHome, FiStar, FiUsers, FiSettings } from "react-icons/fi";
import { IconType } from "react-icons";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/home" },
  { name: "My Wishes", icon: FiStar, href: "/wishlist" },
  { name: "Following", icon: FiUsers, href: "/following" },
  { name: "Settings", icon: FiSettings, href: "/settings" },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent />
      <Box ml={{ base: 20, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = () => {
  const session = useSession();
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: 20, md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="20" alignItems="center" ml="7">
        <Text fontSize="3xl">🤞</Text>
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          href={
            link.href === "/wishlist"
              ? link.href + `/${session?.user.id}`
              : link.href
          }
          key={link.name}
          icon={link.icon}
          name={link.name}
        />
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
  href: string;
}
const NavItem = ({ icon, name, href, ...rest }: NavItemProps) => {
  const { pathname } = useRouter();
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        alignItems={"center"}
        justifyContent="center"
        color="black"
        p="4"
        w="fit-content"
        borderRadius="full"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "gray.100",
        }}
        {...rest}
      >
        {icon && <Icon mr={{ base: 0, md: 4 }} fontSize="24" as={icon} />}
        <Text fontSize={"lg"} display={{ base: "none", md: "inline" }}>
          {name}
        </Text>
      </Flex>
    </Link>
  );
};
