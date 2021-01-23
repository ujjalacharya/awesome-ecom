import React, { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Upload, Modal, message } from 'antd';
import { SideBySideMagnifier } from "react-image-magnifiers";
import {saveUploadedImages,uploadImages, deleteImageById,} from '../../../../redux/actions/product_actions'
const ImageUploader = ({ user, uploadImages, deleteImageById, uploadedImages,form,saveUploadedImages}) => {
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
    ]);
    const [preview, setPreview] = useState ({
    previewVisible: false,
    previewImage: '',
    previewTitle: ''
    })
    useEffect(() => {
        // console.log(uploadedImages);
        form && form.setFieldsValue({
            images: uploadedImages.map(image => {
                return image.response?._id
            })
        })
        setFileList(uploadedImages)
    }, [uploadedImages,form])

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const handleCancel = () => setPreview({...preview, previewVisible: false });

    const onChange = info => {
        let fileList = [...info.fileList];
        fileList = fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
            }
            return file;
        });
        fileList = fileList.filter(file => file.status !== 'error')
        setFileList(fileList);
        saveUploadedImages(fileList)
    };

    const onPreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
    };

    const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
        return false
    }
    const isOverSize = file.size > 2480 * 3230;
    if (isOverSize) {
        message.error('Image must smaller than 2480 * 32308!');
        return false
    }
    return true
    }

    const uploadPhotos = ({
        action,
        file,
        filename,
        onError,
        onProgress,
        onSuccess,
    }) => {
        return uploadImages({
            action,    
            file,
            filename,
            onError,
            onProgress,
            onSuccess,
        })
  }

    return (
        <>
            {/* <ImgCrop rotate quality={1}> */}
             <Upload
                action={`/product/images/${user?._id}`}
                customRequest ={uploadPhotos}
                listType="picture-card"
                multiple={false}
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                onRemove={async image=>{
                    return await deleteImageById(user?._id, image.response?._id)
                    }}
                progress={{ strokeColor: {
                    '0%': '#108ee9',
                    '100%': '#87d068',
                    },
                    strokeWidth: 3,
                    format: (percent) => {
                        return `${percent}%`
                        },
                }}
                name="productImages"
            >
                {user && fileList.length < 6 && '+ Upload'}
            </Upload>
        {/* </ImgCrop> */}
         <Modal
          visible={preview.previewVisible}
          title={preview.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          {/* <img alt="example" style={{ width: '100%' }} src={preview.previewImage} /> */}
            <SideBySideMagnifier
                style={{ height: '100%', width: '100%' }}
                alwaysInPlace={true}
                imageSrc={preview.previewImage}
                imageAlt="Example"
            />
        </Modal>
        </>
    );
}

ImageUploader.propTypes = {
    user: PropTypes.object,
    uploadImages:PropTypes.func.isRequired,
    saveUploadedImages: PropTypes.func.isRequired,
    uploadedImages: PropTypes.array,
}

const mapStateToProps = (state) =>  ({
    user:state.auth.adminProfile,
    uploadedImages: state.product.uploadedImages
})

const mapDispatchToProps = {
    uploadImages,
    deleteImageById,
    saveUploadedImages
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
