import { useEffect } from "react";
import Router from "next/router";
import _ from "lodash";

const Private = ({ isAuth, children }) => {
  useEffect(() => {
    if (!isAuth) {
      Router.push(`/signin`);
    }
  }, []);
  return <React.Fragment>{children}</React.Fragment>;
};

export default Private;
