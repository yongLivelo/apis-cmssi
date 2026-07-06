import { useAuth } from "@/context/AuthContext";
import { useDisclosure } from "@mantine/hooks";
import {
  Anchor,
  Breadcrumbs,
  Burger,
  Button,
  Flex,
  Group,
  Modal,
  Text,
} from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  toggle: () => void;
  opened: boolean;
}

export default function Header({ toggle, opened }: HeaderProps) {
  const segments = useLocation().pathname.split("/").slice(1);
  const { setIsLogin } = useAuth();
  const [modalOpened, { open: openModal, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const items = segments.map((segment, index) => {
    const to = "/" + segments.slice(0, index + 1).join("/") + "/";
    return (
      <Anchor component={Link} to={to} key={index}>
        {segment.charAt(0).toUpperCase() + segment.slice(1)}
      </Anchor>
    );
  });

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/");
  };

  return (
    <Flex justify="space-between" p="5" gap="10" align="center" h="100%">
      <Group>
        <Burger opened={opened} onClick={toggle} size="sm" />
        <Breadcrumbs>{items}</Breadcrumbs>
      </Group>
      <Button onClick={openModal} variant="default">
        Logout
      </Button>
      <Modal
        opened={modalOpened}
        onClose={close}
        title={<Text fw={700}>Confirm Logout</Text>}
      >
        <Text>Are you sure you want to log out?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleLogout}>
            Logout
          </Button>
        </Group>
      </Modal>
    </Flex>
  );
}
