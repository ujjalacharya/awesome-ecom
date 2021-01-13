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
import PriceAndStock from "./PriceAndStock";
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
  const [current, setCurrent] = useState(0);
  const [basicFormData, setBasicFormData] = useState({
    name:'',
    category:[],
    brand:'',
    tags:[],
    model:''
  })
  const [detailFormData, setDetailFormData] = useState({
    warranty: '',
    color: [],
    description: '',
    size: [],
    highlights: '',
    videoURL:'',
    weight:[],
    return:'',
    images:[]
  })

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = (newFormData) => {
    if(current === 1) {
      setDetailFormData({
        ...detailFormData,
        ...newFormData
      })
    }
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
        onFormFinish={(name,data) => {
          if (name === 'basic') {
           setBasicFormData({
             ...basicFormData,
             name:data.values.name,
             category:data.values.category,
             brand:data.values.brand,
             tags:data.values.tags,
             model:data.values.model
           })
          }
          if (name === 'detail') {
            setDetailFormData({
              ...detailFormData,
              warranty: data.values.warranty,
              color: data.values.color,
              description: data.values.description,
              size: data.values.size,
              highlights: data.values.highlights,
              videoURL: data.values.videoURL,
              weight: data.values.weight,
              return: data.values.return,
              images: data.values.images
            })
          }
        }}
      >

        {current === 0 && <BasicInformation basicFormData={basicFormData} next={next} layout={layout} tailLayout={tailLayout} brands={brands} />}
        {current === 1 && <DetailInformation detailFormData={detailFormData} next={next} prev={prev} layout={layout} tailLayout={tailLayout} />}
        {current === 2 && <PriceAndStock prev={prev} layout={layout} tailLayout={tailLayout} />}
      </Form.Provider>
        {/* <div className="steps-action">
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
