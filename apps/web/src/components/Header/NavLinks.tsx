import type { NextRouter } from "next/router";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import type { TabProps } from "@mui/material/Tab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { useTheme } from "@mui/material/styles";

import pages from "./pages";

interface DropDownProps extends TabProps {
  title: string;
  href: string;
  subPages: Array<{ title: string; id: string }>;
  router: NextRouter;
}

const DropDown: React.FC<DropDownProps> = ({
  title,
  href,
  subPages,
  router,
}) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const urlPrefix = href.replace(/\s*\[.*?\]\s*/g, "");

  const handleOpen: TabProps["onClick"] = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchor(null);
  };

  useEffect(() => {
    handleClose();
  }, [router.asPath]);

  return (
    <>
      <Tab label={title} onClick={handleOpen} />
      <Menu keepMounted anchorEl={anchor} open={!!anchor} onClose={handleClose}>
        {subPages.map((page) => (
          <div key={page.id}>
            <Link
              href={href}
              as={`${urlPrefix}${page.id}`}
              passHref
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <MenuItem>{page.title}</MenuItem>
            </Link>
          </div>
        ))}
      </Menu>
    </>
  );
};

const NavLinks: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();

  const selectedTab = useMemo(() => {
    const index = pages.findIndex(
      (page) =>
        page.href === router.pathname ||
        (page.associated && page.associated.includes(router.pathname)),
    );
    return index === -1 ? false : index;
  }, [router.pathname]);

  return (
    <Tabs
      variant="scrollable"
      indicatorColor={theme.palette.mode === "dark" ? "primary" : "secondary"}
      scrollButtons
      value={selectedTab}
    >
      {pages.map(({ href, title, subPages }) =>
        subPages ? (
          <DropDown
            key={href}
            title={title}
            href={href}
            subPages={subPages}
            router={router}
          />
        ) : (
          <Link key={href} href={href} passHref legacyBehavior>
            <Tab label={title} />
          </Link>
        ),
      )}
    </Tabs>
  );
};

export default NavLinks;
