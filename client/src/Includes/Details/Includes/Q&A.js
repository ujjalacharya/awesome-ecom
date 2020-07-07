import React, { Component } from "react";
import { getUserInfo } from "../../../../utils/common";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import Link from "next/link";
import { withRouter } from "next/router";

class QA extends Component {
  state = {
    token: "",
  };

  componentDidMount() {
    console.log(this.props);
    if (this.props.authentication?.token) {
      this.setState({
        token: this.props.authentication.token,
      });
    }
  }

  render() {
    console.log(this.props)
    console.log(this.props.router.asPath)
    return (
      <div className="q-a-tab">
        <h3>Questions about this product (5)</h3>
        {!this.state.token && (
          <div className="not-logged-in">
            <Link
              // href=`/login?origin=`
              href={{
                pathname: "/login",
                query: { origin: ""+this.props.router.asPath},
              }}
            >
              Login
            </Link>{" "}
            or <a>Register</a> to ask questions
          </div>
        )}
        <div className="qns-ans-section">
          <div className="title">Questions answered by The Fashionista</div>
          <div className="qns-details">
            <div className="qns">
              <span className="q-icon">
                Q<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">discount xaina??</span>
                <div className="user">Bibek L. - 37 minutes ago</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">Already discounted rate</span>
                <div className="user">The Fashionista - 12 minutes ago</div>
              </span>
            </div>

            <div className="qns">
              <span className="q-icon">
                Q<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">discount xaina??</span>
                <div className="user">Bibek L. - 37 minutes ago</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">Already discounted rate</span>
                <div className="user">The Fashionista - 12 minutes ago</div>
              </span>
            </div>

            <div className="qns">
              <span className="q-icon">
                Q<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">comes with charger?</span>
                <div className="user">Jayesh R. - 28 Oct 2019</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">
                  Dear customer,you can charge it with your mobile charger
                </span>
                <div className="user">
                  Titan Official - answered within 2 days
                </div>
              </span>
            </div>

            <div className="qns">
              <span className="q-icon">
                Q<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">can it be returned??</span>
                <div className="user">Pancha R. - 13 Nov 2019</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span className="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">Why sir didn't you liked it</span>
                <div className="user">
                  Titan Official - answered within 5 minutes
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, actions)(withRouter(QA));
