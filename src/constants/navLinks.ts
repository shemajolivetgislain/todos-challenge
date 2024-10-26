import Logo from "../assets/logo/app_logo.svg";
import { IconType } from "react-icons";
import { TbSmartHome } from "react-icons/tb";
import { LuFolderMinus, LuSettings } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi2";

interface NavLink {
  name: string;
  path: string;
  icon: IconType;
}

interface NavLinks {
  logo: string;
  links: NavLink[];
  footerLinks: NavLink[];
}

export const navLinks: NavLinks = {
  logo: Logo,
  links: [
    {
      name: "Dashboard",
      path: "/",
      icon: TbSmartHome,
    },
    {
      name: "To dos",
      path: "/todos",
      icon: LuFolderMinus,
    },
  ],
  footerLinks: [
    {
      name: "Settings",
      path: "/setting",
      icon: LuSettings,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: HiOutlineUser,
    },
  ],
};
