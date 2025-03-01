import { INavLink } from "../models/interfaces";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HomeIcon from "@mui/icons-material/Home";

export const navLinks: INavLink[] = [
  {
    text: "Home",
    path: "",
    icon: HomeIcon,
  },
  {
    text: "Books",
    path: "/books",
    icon: AutoStoriesIcon,
  },
];
