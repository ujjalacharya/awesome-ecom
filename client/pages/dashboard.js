import Layout from "../src/Components/Layout";
import withPrivate from "../utils/auth/withPrivate";

const Dashboard = () => (
    <Layout title="Dashboard">
      <h3>Dashboard</h3>
    </Layout>
);

export default withPrivate(Dashboard);
