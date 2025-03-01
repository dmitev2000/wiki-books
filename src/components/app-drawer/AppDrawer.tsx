import { useAppDrawer } from "../../context/AppDrawerContext";
import { Box, Drawer } from "@mui/material";
import AppDrawerItemsList from "./AppDrawerItemsList";

const AppDrawer = () => {
  const drawerCtx = useAppDrawer();

  return (
    <Drawer open={drawerCtx.isOpen} onClose={() => drawerCtx.closeAppDrawer()}>
      <Box sx={{ width: 250 }} role="presentation">
        <AppDrawerItemsList />
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
