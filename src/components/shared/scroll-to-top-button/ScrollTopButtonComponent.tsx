import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, Tooltip } from "@mui/material";
import "./scroll-top-button.css";
import { useEffect, useRef } from "react";

const ScrollTopButtonComponent = () => {
  const scrollButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleScroll = () => {
    if (scrollButtonRef.current) {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        scrollButtonRef.current.style.display = "block";
      } else {
        scrollButtonRef.current.style.display = "none";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Tooltip title="Scroll to top" placement="left" arrow>
      <IconButton
        id="scroll-btn"
        onClick={handleClick}
        aria-label="scroll-to-top"
        className="scroll-top-btn"
        color="primary"
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ScrollTopButtonComponent;
