import React from 'react';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { handleAuthSSR } from '../utils/auth';

const serverUrl = 'http://localhost:3001';

// set up cookies
const cookies = new Cookies();

class Secret extends React.Component {

  onPingCall = async (e) => {
    const token = cookies.get('token')

    try {
      const res = await axios.get(serverUrl + '/api/ping', { headers: { 'Authorization': token } });
      console.log(res.data.msg);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  }

  render() {
    return (
      <div>
        <h2>Secret page</h2>
        <p>Only accessible via a valid JWT</p>
        <br></br>
        <button onClick={(e) => this.onPingCall(e)}>Ping Call</button>
        <p>Check console for response</p>
      </div>
    );
  }
}

// Server-Side Rendering
Secret.getInitialProps = async (ctx) => {
  // Must validate JWT
  // If the JWT is invalid it must redirect
  // back to the main page. We can do that
  // with Router from 'next/router
  await handleAuthSSR(ctx);

  // Must return an object
  return {}
}

export default Secret;