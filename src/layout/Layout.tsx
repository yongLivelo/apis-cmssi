import { AppShell, Group, Burger, NavLink, Box } from "@mantine/core";
import { type ReactNode } from "react";
import { BsFillPeopleFill, BsFillHouseDoorFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

function Layout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: opened ? 300 : 55,
          breakpoint: "xs",
          collapsed: { mobile: !opened },
        }}
        padding="md"
        styles={{
          navbar: {
            transition: "transform 250ms ease, width 250ms ease",
          },
        }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} size="sm"></Burger>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <NavLink
            onClick={() => navigate("/")}
            leftSection={
              <Box>
                <BsFillHouseDoorFill size={30} />
              </Box>
            }
            label={"Home"}
            active={location.pathname === "/"}
          />
          <NavLink
            onClick={() => navigate("/applicant")}
            leftSection={<BsFillPeopleFill size={30} />}
            label={"Applicant"}
            active={location.pathname === "/applicant"}
          />
        </AppShell.Navbar>
        <AppShell.Main bg="gray.2" style={{ height: "100vh" }}>
          {children}
        </AppShell.Main>
      </AppShell>
    </>
  );
}

export default Layout;
