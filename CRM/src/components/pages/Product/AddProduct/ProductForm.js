import React, { useState, useEffect, useRef } from "react";
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
  const basicFormRef = useRef(null);
  const detailFormRef = useRef(null);
  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };
  const submitBasicForm = () => {
    // console.log(basicFormRef.current);
    basicFormRef.current.submit()
  }
  const submitDetailForm = () => {
    detailFormRef.current.submit()
  }
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
        onFormFinish={name => {
          if (name === 'form1') {
            // Do something...
          }
        }}
      >

        {current === 0 && <BasicInformation ref={basicFormRef} next={next} layout={layout} tailLayout={tailLayout} brands={brands} />}
        {current === 1 && <DetailInformation ref={detailFormRef} next={next} layout={layout} tailLayout={tailLayout} />}
        {current === 2 && 'done'}
      </Form.Provider>
        <div className="steps-action">
          {current === 0 && (
            <Button type="primary" onClick={() => submitBasicForm()}>
              Next
            </Button>
          )}
        {current === 1 && (
          <Button type="primary" onClick={() => submitDetailForm()}>
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
