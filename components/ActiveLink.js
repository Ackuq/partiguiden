import { withRouter } from "next/router";
import Link from "next/link";
import React, { Children } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";

const ActiveLink = ({ router, ...props }) => {
  var className = "MuiButtonBase-root-1 menu-btn";

  if (router.pathname === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;

  return (
    <ButtonBase onClick={props.onClick} className={`${className}`}>
      <Link href={props.href}>
        <a className="custom-nav-link">{props.title}</a>
      </Link>
    </ButtonBase>
  );
};

export default withRouter(ActiveLink);
