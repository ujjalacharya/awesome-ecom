import { Result } from "antd";
import Layout from "../src/Components/Layout";

const page404 = () => {
  return (
    <Layout>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    </Layout>
  );
};

export default page404;
