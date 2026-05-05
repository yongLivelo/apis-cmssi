import { NavLink } from "@mantine/core";
import { HouseIcon, UserFocusIcon } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <>
      <NavLink
        onClick={() => navigate("/")}
        label="Home"
        leftSection={<HouseIcon size={16} />}
      />
      <NavLink
        onClick={() => navigate("/applicants")}
        label="Applicants"
        leftSection={<UserFocusIcon size={16} />}
      />
    </>
  );
}
