import Logo from "../assets/logo/app_logo.svg";
import { IconType } from "react-icons";
import { TbSmartHome } from "react-icons/tb";
import { LuFolderMinus, LuSettings } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi2";
import { BsFileText } from "react-icons/bs";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
import picOne from "../assets/pics/picOne.jpg";
import picTwo from "../assets/pics/picTwo.jpg";
import picThree from "../assets/pics/picThree.jpg";

interface NavLink {
  name: string;
  path: string;
  icon: IconType;
}

interface NavLinks {
  logo: string;
  links: NavLink[];
  footerLinks: NavLink[];
  imageSideBar: ImageSideBar[];
}

interface ImageSideBar {
  name: string;
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
    {
      name: "Files",
      path: "/files",
      icon: BsFileText,
    },
    {
      name: "Charts",
      path: "/chart",
      icon: HiOutlineChartBarSquare,
    },
  ],

  imageSideBar: [
    {
      name: picOne,
    },
    {
      name: picTwo,
    },
    {
      name: picThree,
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
