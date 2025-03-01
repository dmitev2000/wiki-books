import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { INavLink } from "../../models/interfaces";
import { navLinks } from "../../static/nav-data";
import { useAppDrawer } from "../../context/AppDrawerContext";

const AppDrawerItemsList = () => {
  const navigate = useNavigate();
  const drawerCtx = useAppDrawer();

  const handleLinkClick = (link: INavLink): void => {
    drawerCtx.closeAppDrawer();
    navigate(link.path);
  };

  return (
    <>
      <List>
        {navLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <ListItem
              key={link.text.concat(`${index}`)}
              disablePadding
              onClick={() => handleLinkClick(link)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={link.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List sx={{ position: "absolute", bottom: 0 }}>
        <ListItem>
          <ListItemButton>Copyrights &copy; Dario Mitev</ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default AppDrawerItemsList;
