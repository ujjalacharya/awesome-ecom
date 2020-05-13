import React from 'react';
import Link from 'next/link.js';
import axios from 'axios';
import { Cookies } from 'react-cookie';

const serverUrl = 'http://localhost:3001';

// set up cookies
const cookies = new Cookies();
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: cookies.get('token') || null
    }
  }

  onLoginClick = async () => {
    console.log("Login called");
    const response = await axios.get(serverUrl + '/api/login')
    const token = response.data.token;
    cookies.set('token', token);
    this.setState({
      token: token
    })
  }

  render() {
    return (
      <div>
        <h2>Main page</h2>
        <br></br>
        <button onClick={() => this.onLoginClick()}>Get Token</button>
        <br></br>
        <p>Token: {this.state.token}</p>
        <br></br>
        <Link href="/secret">
          <a>Secret page</a>
        </Link>
      </div >
    )
  }
}

export default Index;
