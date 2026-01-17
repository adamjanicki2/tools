import "src/components/nav.css";

import {
  Box,
  Link,
  TripleFade as Hamburger,
  ui,
  UnstyledLink,
} from "@adamjanicki/ui";
import { useState } from "react";
import Logo from "src/img/logo.svg?react";
import { tools } from "src/pages/tools";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  function Navlink(props: NavlinkProps) {
    return (
      <ui.li className="navlink-li">
        <Link className="navlink" onClick={closeMenu} {...props} />
      </ui.li>
    );
  }

  return (
    <ui.nav className="nav">
      <Box vfx={{ axis: "x", align: "center", justify: "between" }}>
        <UnstyledLink
          to="/"
          vfx={{ axis: "x", align: "center", gap: "s" }}
          onClick={closeMenu}
        >
          <ui.span className="nav-title desktop">Tools</ui.span>
          <Logo width="36" height="36" />
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <ui.ul
        vfx={{ axis: "y" }}
        className="desktop link-container"
        style={{ display: open ? "flex" : undefined }}
      >
        {tools.map((tool, i) => (
          <Navlink key={i} to={`/${tool.path}`}>
            {tool.name}
          </Navlink>
        ))}
      </ui.ul>
    </ui.nav>
  );
}

export default Nav;
