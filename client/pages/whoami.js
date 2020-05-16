import axios from "axios";
import { connect } from "react-redux";
import initialize from "../utils/initialize";
import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

const Whoami = ({ user }) => (
  <Layout title="Who Am I">
    {(user && (
      <h3 className="title is-3">
        You are logged in as{" "}
        <strong className="is-size-2 has-text-primary">{user}</strong>.
      </h3>
    )) || (
      <h3 className="title is-3 has-text-danger	">You are not authenticated.</h3>
    )}
  </Layout>
);

Whoami.getInitialProps = async (ctx) => {
  console.log("who am I");
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;
  // if (token) {
    const data = await fetch(`http://localhost:3000/api/user`, {
      headers: {
        authorization: token,
      },
    });
    const response = await data.json();
    const user = response.user;
    return {
      user,
    };
  // }
};

export default connect((state) => state)(Whoami);
