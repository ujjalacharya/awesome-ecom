import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Upload, Modal, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import {uploadImages, deleteImageById} from '../../../../redux/actions/product_actions'
const ImageUploader = ({user, uploadImages, deleteImageById}) => {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const [preview, setPreview] = useState ({
    previewVisible: false,
    previewImage: '',
    previewTitle: ''
    })

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    const handleCancel = () => setPreview({...preview, previewVisible: false });
    const onChange = ({ file, fileList: newFileList, event }) => {
        file.status==='success' && setFileList(newFileList);
        console.log(file,'this is file');
        console.log(newFileList, 'this is file list');
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
        progress,
        onSuccess,
    }) => {
        return uploadImages({
            action,    
            file,
            filename,
            onError,
            onProgress,
            progress,
            onSuccess,
        })
  }

    return (
        <>
        <ImgCrop rotate>
             <Upload
                action={`/product/images/${user?._id}`}
                customRequest ={uploadPhotos}
                listType="picture-card"
                multiple={true}
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                beforeUpload={beforeUpload}
                onRemove={file=>deleteImageById(user?.id, file._id)}
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
        </ImgCrop>
         <Modal
          visible={preview.previewVisible}
          title={preview.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={preview.previewImage} />
        </Modal>
        </>
    );
}

ImageUploader.propTypes = {
    user: PropTypes.object,
    uploadImages:PropTypes.func.isRequired,
}

const mapStateToProps = (state) =>  ({
    user:state.auth.user
})

const mapDispatchToProps = {
    uploadImages,
    deleteImageById
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
