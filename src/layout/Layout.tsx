import { AppShell, Group, Burger, NavLink } from "@mantine/core";
import { type ReactNode, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Layout({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(true);
  const navigate = useNavigate();
  function toggle() {
    setOpened((curr) => !curr);
  }
  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: opened ? 300 : 50, breakpoint: "xs" }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm"></Burger>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar style={{ transition: "width 0.2s ease" }}>
          <NavLink
            onClick={() => navigate("/")}
            leftSection={<FaBeer size={30} />}
            label={opened ? "Customers" : ""}
          />
          <NavLink
            onClick={() => navigate("/applicant")}
            leftSection={<FaBeer size={30} />}
            label={opened ? "Accounts" : ""}
            active={true}
          />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}

export default Layout;
