import { ReactNode } from "react";
import WBAppBar from "../app-bar/WBAppBar";
import AppDrawer from "../app-drawer/AppDrawer";
import { AppDrawerProvider } from "../../context/AppDrawerContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AppDrawerProvider>
      <WBAppBar />
      <AppDrawer />
      {children}
    </AppDrawerProvider>
  );
};

export default Layout;
