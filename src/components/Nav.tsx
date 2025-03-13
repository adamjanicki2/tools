import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TripleFade as Hamburger } from "@adamjanicki/ui";
import Link, { UnstyledLink } from "src/components/Link";
import { ReactComponent as Logo } from "src/components/logo.svg";
import "src/components/nav.css";

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
        <UnstyledLink className="flex" to="/">
          <Logo width="24" height="24" className="mr2" />
          <span className="nav-title desktop">React Skeleton</span>
        </UnstyledLink>
        <div className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </div>
      </div>
      <ul
        className="flex items-center desktop link-container ma0"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="/">Home</Navlink>
        <Navlink to="/about/">About</Navlink>
      </ul>
    </nav>
  );
};

export default Nav;
