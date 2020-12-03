import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Steps,
  Button,
  message,
  Form,
  Input,
  AutoComplete,
  Cascader,
  Select,
} from "antd";
import Categories from "./Categories";
import { getCategories, getBrands } from "../../../../redux/actions/product_actions";
const { Option } = Select;
const { Option:AutoCompleteOption } = AutoComplete;

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
  style: {
    marginTop: "2%",
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Step } = Steps;

const steps = [
  {
    title: "Basic Information",
  },
  {
    title: "Detail Description",
  },
  {
    title: "Price & Stock",
  },
];

const ProductForm = ({ getCategories, getBrands, brands }) => {
  const [current, setCurrent] = React.useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [result, setResult] = useState([]);

    const handleSearch = (value) => {
        let newResult = result.filter(r => {
            if (r.slug.toUpperCase().indexOf(value.toUpperCase()) !== -1) return r
        })
        setResult([...newResult])
    };

  const handleClick = (e) => {
    let isAlreadyAdded = selectedCategories.includes(e.key);
    return isAlreadyAdded
      ? null
      : setSelectedCategories([...selectedCategories, e.key]);
  };
  const handleDeselect = (value) => {
    return setSelectedCategories(
      selectedCategories.filter((cat) => cat !== value)
    );
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

    useEffect(() => {
        setResult([...brands])
    }, [brands]);
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const BasicInformation = () => {
    return (
      <>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Categories"
          name="categories"
          rules={[
            {
              required: true,
              message: "Please input product categories!",
            },
          ]}
        >
          <Categories
            selectedCategories={selectedCategories}
            handleClick={handleClick}
            handleDeselect={handleDeselect}
          />
        </Form.Item>
        <Form.Item
          label="Video URL"
          name="videoURL"
          rules={[
            {
              required: false,
              // message: 'Please input product categories!',
            },
          ]}
        >
          <Input />
        </Form.Item>
            <Form.Item
                label="Brand"
                name="brand"
                rules={[
                    {
                        required: false,
                        // message: 'Please input product categories!',
                    },
                ]}
            >
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    onSearch={handleSearch}
                    placeholder="input here"
                >
                    {result.map((brand) => (
                        <AutoCompleteOption key={brand._id} value={brand.slug}>
                            {brand.brandName}
                        </AutoCompleteOption>
                    ))}
                    <Input/>
                </AutoComplete>
            </Form.Item>
      </>
    );
  };
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {current === 0 && <BasicInformation />}
        {/* <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
      </Form>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
      {/* <div className="col-md-12" >
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Form row</h5>
                    <h6 className="card-subtitle text-muted">Bootstrap column layout.</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputEmail4">Email</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputPassword4">Password</label>
                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                            </div>
                        </div>
                        <Categories/>
                        <div className="form-group">
                            <label htmlFor="inputAddress2">Address 2</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option >Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox m-0">
                                <input type="checkbox" className="custom-control-input" />
                                <span className="custom-control-label">Check me out</span>
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div> */}
    </>
  );
};
ProductForm.propTypes = {
  getCategories: PropTypes.func,
  getBrands: PropTypes.func,
  brands: PropTypes.array,
};

const mapStateToProps = (state) => ({
    brands: state.product.brands
});

const mapDispatchToProps = {
  getCategories,
  getBrands
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProductForm));
