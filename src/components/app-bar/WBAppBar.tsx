import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useAppDrawer } from "../../context/AppDrawerContext";
import MenuIcon from "@mui/icons-material/Menu";

const WBAppBar = () => {
  const drawerCtx = useAppDrawer();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            drawerCtx.openAppDrawer();
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wiki Books
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default WBAppBar;
