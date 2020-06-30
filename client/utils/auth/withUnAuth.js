import React from "react";
import Router from "next/router";
import initialize from "../initialize";

const index = "/";

const checkUserAuthentication = (ctx) => {
  let auth = ctx.store.getState().authentication.token;
  return { auth };
};

export default (WrappedComponent) => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (ctx) => {
    initialize(ctx);

    const userAuth = await checkUserAuthentication(ctx);

    if (userAuth?.auth) {
      // Handle server-side and client-side rendering.
      if (ctx.res) {
        ctx.res.writeHead(302, {
          Location: index,
        });
        ctx.res.end();
      } else {
        Router.replace(index);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps(userAuth);
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
