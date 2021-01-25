import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Upload, Modal, message } from 'antd';
import { SideBySideMagnifier } from "react-image-magnifiers";
import { saveUploadedImages, uploadImages, removeUploadedImages} from '../../../../redux/actions/product_actions'
const ImageUploader = ({ user, uploadImages,uploadedImages, form, saveUploadedImages,}) => {
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
        if (uploadedImages.length && form) {
            uploadedImages = uploadedImages.filter(img => img.status !== 'removed')
            
            form.setFieldsValue({
                images: uploadedImages.map(image => {
                    return image.response?._id || image._id
                })
            })
            
            setFileList(uploadedImages)
        }
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
    const _saveUploadedImages = (fileList) => saveUploadedImages(fileList)
    const onChange = info => {
        let _fileList = [...info.fileList];
        _fileList = _fileList.map(file => {
            if (file.response) {
                file.url = file.response.url;
                file._id = file.response._id;
            }
            return file;
        });
        _fileList = _fileList.filter(file => file.status !== 'error')
        setFileList(_fileList);
        if (info.file.status === 'removed') {
            let index = uploadedImages.findIndex(img => img._id===info.file._id)
            // uploadedImages = uploadedImages.splice(index,1,info.file)
            uploadedImages[index] = info.file 
            _saveUploadedImages(uploadedImages)
            //    _saveUploadedImages([..._fileList,info.file])
        }
        if (info.file.status === 'done') {
        //  _saveUploadedImages(_fileList)
        _saveUploadedImages([...uploadedImages,info.file])
        }
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
                // onRemove={ image=>{
                //     // console.log(image)
                //     // return  deleteImageById(user?._id, image.response?._id)
                //     return true
                //     }}
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
    // productImages: PropTypes.array,
}

const mapStateToProps = (state) =>  ({
    user:state.auth.adminProfile,
    uploadedImages: state.product.uploadedImages,
    // productImages: state.product.product?.images || []
})

const mapDispatchToProps = {
    uploadImages,
    saveUploadedImages,
    removeUploadedImages
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
