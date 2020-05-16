import { connect } from "react-redux";
import initialize from "../utils/initialize";
import Layout from "../components/Layout";
import { Card } from "antd";
import fetch from "isomorphic-unfetch";

const Index = ({ response }) => {

  return (
    <Layout title="Home">
      <h2 className="title is-2">Authentication with Next.js and JWT</h2>
      <img src="/static/nextjs.jpg" />
      <p>A rock solid boilerplate by Uzz !</p>
      <div>
        {response.map((datum) => (
          <Card
            title={datum.title}
            style={{
              width: "100%",
              backgroundColor: "lightblue",
              margin: "2rem",
            }}
          >
            <p>{datum.body}</p>
          </Card>
        ))}
      </div>
      ,
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  initialize(ctx);

  const data = await fetch("https://jsonplaceholder.typicode.com/posts");
  const response = await data.json();

  return {
    response,
  };
};

export default connect((state) => state)(Index);
