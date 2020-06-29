import Layout from "../src/Components/Layout";
import initialize from "../utils/initialize";
import Private from "../utils/auth/Private";
import jwt from "jsonwebtoken";


const Dashboard = (props) => {
console.log(props)
  return<Private isAuth={props.isAuth}>
    <Layout title="Dashboard">
      <h3>Dashboard</h3>
    </Layout>
  </Private>
}

Dashboard.getInitialProps = function (ctx) {
  initialize(ctx);
  const token = ctx.store.getState().authentication.token;

  // let usableToken;
  // if(token){
  //   usableToken = jwt.decode(token).exp > (new Date().getTime() + 1) / 1000;
  // }

  // if(!token){
  //     this.props.url.push('/')
  //   }

  if (token) {
    return {
      isAuth: true
    };
  }
};

export default Dashboard;
