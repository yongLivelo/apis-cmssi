import { Burger, Flex } from "@mantine/core";

interface HeaderProps {
  toggle: () => void;
  opened: boolean;
}

function Header({ toggle, opened }: HeaderProps) {
  return (
    <>
      <Flex p="5" gap="10" align="center" h="100%">
        <Burger opened={opened} onClick={toggle} size="sm" />
        <div>APIS-CMSSI</div>
      </Flex>
    </>
  );
}

export default Header;
