import { Link } from "../lib/routes";
import React, { Children } from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withRouter } from "next/router";

const ActiveLink = ({ router, ...props }) => {
  var className = "MuiButtonBase-root-1 menu-btn";

  if (router.route === props.href && props.activeClassName) {
    className = `${className} ${props.activeClassName}`.trim();
  }

  delete props.activeClassName;
  return (
    <ButtonBase onClick={props.onClick} className={`${className}`}>
      <Link route={`${props.href}`}>
        <a className="custom-nav-link">{props.title}</a>
      </Link>
    </ButtonBase>
  );
};

export default withRouter(ActiveLink);
