import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TripleFade as Hamburger } from "@adamjanicki/ui";
import Link, { UnstyledLink } from "src/components/Link";
import { ReactComponent as Logo } from "src/components/logo.svg";
import "src/components/nav.css";
import { tools } from "src/pages/tools";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

const Nav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Navlink = (props: NavlinkProps) => (
    <li className="navlink-li">
      <Link className="navlink" onClick={closeMenu} {...props} />
    </li>
  );

  return (
    <nav className="flex items-center justify-between w-100 nav pv2 ph4">
      <div className="flex items-center justify-between bar-container">
        <UnstyledLink to="/" className="flex items-center">
          <Logo width="36" height="36" />
        </UnstyledLink>
        <div className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <ul
        className="flex items-center desktop link-container ma0"
        style={{ display: open ? "flex" : undefined }}
      >
        {tools.map((tool, i) => (
          <Navlink key={i} to={`/${tool.path}`}>
            {tool.name}
          </Navlink>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
