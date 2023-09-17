import Link from "next/link";
import React, { useCallback, useRef, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { styled } from "@mui/material/styles";

import BrightnessIcon from "@mui/icons-material/Brightness6";
import MenuIcon from "@mui/icons-material/Menu";

import Drawer from "./Drawer";
import NavLinks from "./NavLinks";

import { INDEX } from "../../lib/routes";
import { addOpacity } from "../../utils/colorUtils";

const BannerText = styled("a")`
  font-weight: bold;
  text-decoration: none;
  font-size: 2rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

interface Props {
  toggleDarkMode: () => void;
}

const Branding: React.FC<Props> = ({ toggleDarkMode }) => {
  return (
    <Grid container zIndex={1200} justifyContent="space-between">
      <Grid item xs={3} textAlign="center">
        <ButtonBase>
          <Link href={INDEX} passHref legacyBehavior>
            <BannerText>Partiguiden</BannerText>
          </Link>
        </ButtonBase>
      </Grid>
      <Grid
        item
        xs={3}
        sx={{
          textAlign: { xs: "right", sm: "center" },
        }}
      >
        <IconButton onClick={toggleDarkMode} aria-label="Toggle dark mode">
          <BrightnessIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

const Header: React.FC<Props> = ({ toggleDarkMode }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appBar = useRef<HTMLDivElement>(null);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <>
      <Box
        sx={(theme) => ({
          height: appBar.current?.clientHeight ?? 56,
          position: "absolute",
          width: "100%",
          bgcolor:
            theme.palette.mode === "dark"
              ? theme.palette.background.paper
              : theme.palette.primary.light,
        })}
      />
      <AppBar
        position="sticky"
        ref={appBar}
        sx={{
          backgroundColor: (theme) =>
            addOpacity(
              theme.palette.mode === "dark"
                ? theme.palette.background.paper
                : theme.palette.primary.light,
              0.8,
            ),
          backdropFilter: "blur(5px)",
        }}
      >
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={openDrawer}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Branding toggleDarkMode={toggleDarkMode} />
          </Toolbar>
          <Drawer
            isOpen={drawerOpen}
            appBarHeight={appBar.current?.clientHeight ?? 56}
            handleClose={closeDrawer}
            handleOpen={openDrawer}
          />
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Branding toggleDarkMode={toggleDarkMode} />
          <NavLinks />
        </Box>
      </AppBar>
    </>
  );
};

export default Header;
