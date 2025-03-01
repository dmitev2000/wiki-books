import { ReactNode } from "react";
import "./layout.css";
import { Box } from "@mui/material";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ p: 5 }}>{children}</Box>;
};

export default PageWrapper;
