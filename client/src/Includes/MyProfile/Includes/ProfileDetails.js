import React, { Component, useContext, useState, useEffect, useRef  } from "react";
import { Row, Col } from "antd";
import { Input, Table, Form } from "antd";
import _ from "lodash";
import {
  convertDateToCurrentTz,
  openNotification,
} from "../../../../utils/common";
import { connect } from "react-redux";
import actions from "../../../../redux/actions";
import { IMAGE_BASE_URL } from "../../../../utils/constants";
const EditableContext = React.createContext();

const userData = {
  email: "",
  phone: ""
};

const activeLoc = {
  address: "",
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async (e) => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
  }

  return <td {...restProps}>{childNode}</td>;
};
class ProfileDetails extends Component {
  columns = [
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
  state = {
    userData: userData,
    activeLoc: activeLoc,
    editing: false
  };

  componentDidMount() {
    if (this.props.userData) {
      this.setState({
        userData: this.props.userData,
        activeLoc: this.props.activeLoc,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.userData !== prevProps.userData &&
      this.props.activeLoc !== prevProps.activeLoc
    ) {
      this.setState({
        userData: this.props.userData,
        activeLoc: this.props.activeLoc,
      });
    }

    if (
      this.props.user.profilePictureResp !==
      prevProps.user.profilePictureResp &&
      this.props.user.profilePictureResp
    ) {
      openNotification("Success", "Profile picture uploaded successfully");
      this.props.getUserProfile(this.state.userData._id);
    }
  }

  render() {
    let { userData, activeLoc } = this.state;



    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    let data = [];

    // if (!_.isEmpty(activeLoc.address) && !_.isEmpty(userData)) {
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
        // ,
        // {
        //   key: "4",
        //   name: "Occupation",
        //   age: "Private Sector",
        // },
      ];
    // }
    let checkSekelton = this.state.userData.email === "" ? true : false;
    // let checkLocal = userData?.photo?.split('/')[0];
    let userPhoto = userData.photo ? (`${IMAGE_BASE_URL}/${userData.photo}`) : userData.socialPhoto

    return (
      <div className="profile-details">
        <div className="main-profile">
          {!_.isEmpty(userData) && (
            <Row className={checkSekelton && "skeleton"}>
              <Col lg={6} xs={24} className="left-prof">
                <div className="change-profile">
                  <img
                    // src="/images/default-user.png"
                    src={userPhoto}
                    onError={(ev) => {
                      ev.target.src = "/images/default-user.png";
                    }}
                  />
                  {/* <div>Change Profile</div> */}
                  <input
                    type="file"
                    id={"newFile"}
                    name={"uploadCitizenship"}
                    className={
                      "inputFile " + (this.state.disableImg ? "disabFile" : "")
                    }
                    accept=".jpeg,.jpg,.png,.pdf"
                    multiple
                    onChange={(e) => {
                      let formData = new FormData();
                      formData.append("photo", e.target.files[0]);
                      this.props.updateProfilePicture(formData);
                    }}
                    disabled={this.state.disableImg ? true : false}
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
                  {!_.isEmpty(activeLoc) && (
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
          {!_.isEmpty(activeLoc) && (
            <Table
              components={components}
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
}

export default connect((state) => state, actions)(ProfileDetails);
