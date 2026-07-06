import { Flex, NavLink } from "@mantine/core";
import {
  HouseIcon,
  UserPlusIcon,
  BookBookmarkIcon,
  GearIcon,
} from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Flex justify={"center"}>
        <h2>APIS-CMSSI</h2>
      </Flex>

      <NavLink
        component={Link}
        to="/home/"
        label="Home"
        leftSection={<HouseIcon size={16} />}
      />

      <NavLink
        component={Link}
        to="/applicants/"
        label="Applicants"
        leftSection={<UserPlusIcon size={16} />}
      />

      <NavLink
        component={Link}
        to="/references/"
        label="References"
        leftSection={<BookBookmarkIcon size={16} />}
      />

      <NavLink
        component={Link}
        to="/settings/"
        label="Settings"
        leftSection={<GearIcon size={16} />}
      />
    </>
  );
}
