import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Steps,
  Button,
  message,
  Form,
} from "antd";
import { getCategories, getBrands } from "../../../../redux/actions/product_actions";
import BasicInformation from './BasicInformation'
import DetailInformation from './DetailInformation'
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
  
  useEffect(() => {
    getCategories();
    getBrands();
  }, []);  
  
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  
  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form.Provider
        onFormFinish={(name,info) => {
          if (name === 'basic') {
            // Do something...
            console.log(info)
          }
        }}
      >
      
        {current === 0 && <BasicInformation layout={layout} tailLayout={tailLayout} brands={brands}/>}
        {current === 1 && <DetailInformation layout={layout} tailLayout={tailLayout} />}
       
      
      </Form.Provider>
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
