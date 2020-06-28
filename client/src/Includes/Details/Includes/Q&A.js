import React, { Component } from "react";

class QA extends Component {
  render() {
    return (
      <div className="q-a-tab">
        <h3>Questions about this product (5)</h3>
        <div className="not-logged-in">
          <a>Login</a> or <a>Register</a> to ask questions
        </div>
        <div className="qns-ans-section">
          <div className="title">Questions answered by The Fashionista</div>
          <div className="qns-details">
            <div className="qns">
              <span className="q-icon">
                Q<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">discount xaina??</span>
                <div className="user">Bibek L. - 37 minutes ago</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">Already discounted rate</span>
                <div className="user">The Fashionista - 12 minutes ago</div>
              </span>
            </div>

            <div className="qns">
              <span className="q-icon">
                Q<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">discount xaina??</span>
                <div className="user">Bibek L. - 37 minutes ago</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">Already discounted rate</span>
                <div className="user">The Fashionista - 12 minutes ago</div>
              </span>
            </div>

            <div className="qns">
              <span className="q-icon">
                Q<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">comes with charger?</span>
                <div className="user">Jayesh R. - 28 Oct 2019</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span class="arrow-bottom"></span>
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
                Q<span class="arrow-bottom"></span>
              </span>
              <span className="q-title">
                <span className="q-text">can it be returned??</span>
                <div className="user">Pancha R. - 13 Nov 2019</div>
              </span>
            </div>
            <div className="ans">
              <span className="q-icon a-btn">
                A<span class="arrow-bottom"></span>
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

export default QA;
