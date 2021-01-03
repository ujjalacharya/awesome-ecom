import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Table } from "antd";
import { isEmpty } from "lodash";

// utils
import {
  convertDateToCurrentTz,
  openNotification,
  previousQuery,
} from "../../../../utils/common";
import { activeLocSkeleton, userDataSkeleton } from "../../../../utils/skeletons";
import { IMAGE_BASE_URL } from "../../../../utils/constants";

// redux
import actions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const ProfileDetails = (props) => {
  const dispatch = useDispatch();
  const profilePictureResp = useSelector((state) => state.user.profilePictureResp);

  let [userData, setUserData] = useState(userDataSkeleton);
  let [activeLoc, setActiveLoc] = useState(activeLocSkeleton);
  let [disableImg, setDisableImg] = useState('');

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData);
      setActiveLoc(props.activeLoc)
    }
  }, [props.userData])

  const prevProfilePicResp = previousQuery(profilePictureResp)

  useEffect(() => {
    if (prevProfilePicResp !== profilePictureResp && profilePictureResp) {
      openNotification("Success", "Profile picture uploaded successfully");
      dispatch(actions.getUserProfile(userData._id));
    }
  }, [profilePictureResp])

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      editable: true
    },
  ];

  let data = [];

  if (!isEmpty(activeLoc.address) && !isEmpty(userData)) {
    data = [
      {
        key: "1",
        name: "Date of Birth",
        age: userData.dob,
      },
      {
        key: "2",
        name: "Gender",
        age: userData.gender,
      },
      {
        key: "3",
        name: "Address",
        age: activeLoc.address,
      },
      {
        key: "4",
        name: "Email",
        age: userData.email,
      },
    ];
  }

  let checkSekelton = userData.email === "" ? true : false;
  let userPhoto = userData.photo ? (`${IMAGE_BASE_URL}/${userData.photo}`) : userData.socialPhoto;

  return (
    <div className="profile-details">
      <div className="main-profile">
        {!isEmpty(userData) && (
          <Row className={checkSekelton && "skeleton"}>
            <Col lg={6} xs={24} className="left-prof">
              <div className="change-profile">
                {
                  userPhoto ?
                    <img
                      src={userPhoto}
                      onError={(ev) => {
                        ev.target.src = "/images/default-user.png";
                      }}
                    /> :
                    <img
                      src="/images/default-user.png"
                    />
                }
                <input
                  type="file"
                  id={"newFile"}
                  name={"uploadCitizenship"}
                  className={
                    "inputFile " + (disableImg ? "disabFile" : "")
                  }
                  accept=".jpeg,.jpg,.png,.pdf"
                  multiple
                  onChange={(e) => {
                    let formData = new FormData();
                    formData.append("photo", e.target.files[0]);
                    dispatch(actions.updateProfilePicture(formData));
                  }}
                  disabled={disableImg ? true : false}
                />
                <label htmlFor={"newFile"}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </label>
              </div>
            </Col>
            <Col lg={18} xs={24} className="right-prof">
              <h3>
                <span>{userData.name}</span>
              </h3>
              <div className="em-det">
                <div>
                  <span className="small-line">
                    {!checkSekelton && "Email:"} {userData.email}
                  </span>
                </div>
                {!isEmpty(activeLoc) && (
                  <div>
                    <span className="medium-line">
                      {!checkSekelton && "Mobile:"} {activeLoc.phoneno}
                    </span>
                  </div>
                )}
                <div className="em-det">
                  <span className="large-line">
                    {!checkSekelton && "Joined on:"}{" "}
                    {userData.createdAt &&
                      convertDateToCurrentTz(userData.createdAt)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
      <div className="profile-bottom">
        <h4>Profile Details</h4>
        {!isEmpty(activeLoc) && (
          <Table
            columns={columns}
            dataSource={data}
            showHeader={false}
            pagination={false}
          />
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
