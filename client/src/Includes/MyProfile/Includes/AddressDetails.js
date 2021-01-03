import React, { useEffect, useState } from "react";
import { capitalize } from "lodash";
import { Table, Space, Button, Empty, message } from "antd";

// includes
import AddressForm from "./AddressForm";

// redux
import actions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

// utils
import { previousQuery } from "../../../../utils/common";

const AddressDetails = (props) => {
  const dispatch = useDispatch();

  const toggleActiveAddResp = useSelector((state) => state.user.toggleActiveAddResp);
  const userProfileLoading = useSelector((state) => state.user.userProfileLoading);

  let [show, setShow] = useState("table");
  let [userData, setUserData] = useState([]);
  let [allAddress, setAllAddress] = useState([]);
  let [editAddressData, setEditAddressData] = useState([]);
  let [showAddNewForm, setShowAddNewForm] = useState("addTable");

  useEffect(() => {
    if (props.userData) {
      setUserData(props.userData);
      setAllAddress(props.allAddress)
    }
  }, [props.userData])

  const prevToggleActiveAddResp = previousQuery(toggleActiveAddResp)

  useEffect(() => {
    if (toggleActiveAddResp !== prevToggleActiveAddResp && toggleActiveAddResp) {
      message.success("Active address changed successfully")
      dispatch(actions.getUserProfile(userData._id));
    }
  }, [toggleActiveAddResp])

  const changeShow = (show, userId) => {
    setShow(show);
    setShowAddNewForm("addTable");

    if (userId) {
      dispatch(actions.getUserProfile(userId));
    }
  };

  const toggleAddress = (label) => {
    dispatch(actions.toggleActiveAddress(`label=${label}`));
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNo",
      key: "phoneNo",
    },
    {
      title: "GeoLocation",
      dataIndex: "geoLocation",
      key: "geoLocation",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setEditAddressData(record);
              changeShow("form");
            }}
          >
            Edit
          </a>
        </Space>
      ),
    },
  ];

  let data = [];
  if (allAddress.length > 0) {
    allAddress.map((address, i) => {
      let ele = {
        key: address._id,
        fullname: userData.name,
        label: address.label,
        address: address.address,
        area: address.area,
        city: address.city,
        region: address.region,
        phoneNo: address.phoneno ? address.phoneno : "-",
        geoLocation:
          address.geolocation.coordinates[0] +
          " , " +
          address.geolocation.coordinates[1],
        isActive: (
          <div className="yes-no">
            <span>No</span>
            <label className="switch">
              <input
                type="checkbox"
                onChange={() => {
                  !address.isActive && toggleAddress(address.label);
                }}
                checked={address.isActive ? true : false}
              />
              <span className="slider round"></span>
            </label>
            <span>Yes</span>
          </div>
        ),
        // isActive: address.isActive ? "true" : "false",
      };

      data.push(ele);
    });
  }
  return (
    <div className="address-details">
      <div className="title-add">
        <h4>Profile Details</h4>
        {show === "table" &&
          showAddNewForm === "addTable" && (
            <Button
              className="secondary"
              onClick={() => setShowAddNewForm("addForm")}
            >
              Add new address
            </Button>
          )}
      </div>
      {show === "form" ||
        showAddNewForm === "addForm" ? (
          show === "form" ? (
            <AddressForm
              changeShow={changeShow}
              editAddressData={editAddressData}
              userId={userData._id}
            />
          ) : (
              <AddressForm
                changeShow={changeShow}
                editAddressData={{}}
                userId=""
              />
            )
        ) : (
          <Table
            className="orders-table table-wrapper"
            columns={columns}
            dataSource={data}
            pagination={false}
            loading={userProfileLoading}
            expandable={{
              expandedRowRender: (record) =>
                <table className="expanded-table">
                  <tbody>
                    {
                      Object.entries(record).map(([key, value], i) => {
                        if (key !== 'key' && key !== 'fullname' && key !== 'label') {
                          return (
                            <tr key={i}>
                              <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                              <td>{capitalize(key)}</td>
                              <td>{value}</td>
                            </tr>
                          )
                        }
                      })
                    }
                    <tr>
                      <td><button type="button" class="ant-table-row-expand-icon" style={{ visibility: 'hidden' }} ></button></td>
                      <td>Action  </td>
                      <td>
                        <Space size="middle">
                          <a
                            onClick={() => {
                              setEditAddressData(record);
                              changeShow("form");
                            }}
                          >
                            Edit
                        </a>
                        </Space>
                      </td>
                    </tr>
                  </tbody>
                </table>
            }}
          />
        )}

      {(allAddress.length === 0 && showAddNewForm === "addTable") && <div className="no-data-table"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
    </div>
  );
}

export default AddressDetails;
