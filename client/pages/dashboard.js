import Layout from "../components/Layout";
import initialize from "../utils/initialize";
import Private from "../auth/Private";

const Dashboard = ({ isAuth }) => (
  <Private isAuth={isAuth}>
    <Layout title="Who Am I">
      <h3>Dashboard</h3>
    </Layout>
  </Private>
);

Dashboard.getInitialProps = function (ctx) {
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;
  if (token) {
    return {
      isAuth: true,
    };
  }
};

export default Dashboard;
