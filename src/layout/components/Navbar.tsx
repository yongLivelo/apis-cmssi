import { NavLink } from "@mantine/core";
import { HouseIcon, UserFocusIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <NavLink
        onClick={() => navigate("/")}
        label="Home"
        leftSection={<HouseIcon size={16} />}
      />

      <NavLink label="Applicants" href="applicants/">
        <NavLink
          onClick={() => navigate("applicants/add")}
          label="Add Applicants"
          leftSection={<UserFocusIcon size={16} />}
        />
        <NavLink
          onClick={() => navigate("applicants/search")}
          label="Search Applicants"
          leftSection={<UserFocusIcon size={16} />}
        />
      </NavLink>
    </>
  );
}
