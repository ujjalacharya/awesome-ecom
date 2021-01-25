import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Steps,
  Form,
} from "antd";
import { getCategories, getBrands, updateProduct, getProduct, removeUploadedImages, saveUploadedImages } from "../../../../redux/actions/product_actions";
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

const ProductForm = ({ getCategories, getBrands, brands, user, updateProduct, saveUploadedImages,removeUploadedImages, getProduct, product, productImages}) => {
  let {slug: productSlug} = useParams();
  const [current, setCurrent] = useState(0);
  const [basicFormData, setBasicFormData] = useState({
    name: '',
    category: [],
    brand: '',
    tags: [],
    model: ''
  })
  const [detailFormData, setDetailFormData] = useState({
    warranty: '',
    color: [],
    description: '',
    size: [],
    highlights: '',
    videoURL: '',
    weight: [],
    return: '',
    images: [],
    availableDistricts: []
  })
  const [priceAndStockFormData, setpriceAndStockFormData] = useState({
    price: '',
    discountRate: '',
    quantity: ''
  })  

  useEffect(() => {
    getCategories();
    getBrands();
    getProduct(productSlug);
  }, [productSlug]);

  useEffect(() => {
    product && setBasicFormData({
    ...basicFormData,
    name: product.name,
    category: product.category.map(cat=>cat.slug),
    brand: product.brand.slug,
    tags: product.tags,
    model: product.model
    })
    
    product && setDetailFormData({
      ...detailFormData,
      warranty: product.warranty,
      color: product.color,
      description: product.description,
      size: product.size,
      highlights: product.highlights,
      videoURL: product.videoURL[0],
      weight: product.weight,
      return: product.return,
      // images: product.images,
      availableDistricts: product.availableDistricts
    })

    product && setpriceAndStockFormData({
      ...priceAndStockFormData,
      price: product.price.$numberDecimal,
      discountRate: product.discountRate,
      quantity: product.quantity
    })

    let productImages = product?.images || []
    let images = productImages.map(image => {
      return {
        isLinkedWithProduct: true,
        _id: image._id,
        uid: image._id,
        name: image.large.split('/')[1],
        status: 'done',
        url: `${process.env.REACT_APP_SERVER_URL}uploads/${image.large}`,
      }
    })
    saveUploadedImages(images)
    return () => {
      removeUploadedImages()
    }
  }, [product]);

  const next = () => {
    setCurrent(current + 1);
  };

  const submitProductInfo = () => {
    let deletedProductImages = productImages.filter(img => img.status === 'removed')
    updateProduct({ id: user._id, ...basicFormData, ...detailFormData, ...priceAndStockFormData }, deletedProductImages)
  }
  const prev = (newFormData) => {
    if (current === 1) {
      setDetailFormData({
        ...detailFormData,
        ...newFormData
      })
    }
    if (current === 2) {
      setpriceAndStockFormData({
        ...priceAndStockFormData,
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
        onFormFinish={(name, data) => {
          if (name === 'basic') {
            setBasicFormData({
              ...basicFormData,
              name: data.values.name,
              category: data.values.category,
              brand: data.values.brand,
              tags: data.values.tags,
              model: data.values.model
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
              images: data.values.images,
              availableDistricts:data.values.availableDistricts
            })
          }
          if (name === 'price_and_stock') {
            setpriceAndStockFormData({
              ...priceAndStockFormData,
              price: data.values.price,
              discountRate: data.values.discountRate,
              quantity: data.values.quantity
            })
          }
        }}
      >

        {current === 0 && <BasicInformation basicFormData={basicFormData} next={next} layout={layout} tailLayout={tailLayout} brands={brands} />}
        {current === 1 && <DetailInformation detailFormData={detailFormData} next={next} prev={prev} layout={layout} tailLayout={tailLayout} />}
        {current === 2 && <PriceAndStock priceAndStockFormData={priceAndStockFormData} submitProductInfo={submitProductInfo} prev={prev} layout={layout} tailLayout={tailLayout} />}
      </Form.Provider>
    </>
  );
};
ProductForm.propTypes = {
  getCategories: PropTypes.func,
  getBrands: PropTypes.func,
  brands: PropTypes.array,
  updateProduct: PropTypes.func,
  user: PropTypes.object,
  getProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  brands: state.product.brands,
  user: state.auth.adminProfile,
  product: state.product.product,
  productImages: state.product.uploadedImages
});

const mapDispatchToProps = {
  getCategories,
  getBrands,
  updateProduct,
  getProduct,
  removeUploadedImages,
  saveUploadedImages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ProductForm));
