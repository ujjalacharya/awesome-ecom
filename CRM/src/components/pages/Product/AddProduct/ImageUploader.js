import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect, useSelector } from 'react-redux'
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

export const ImageUploader = ({user}) => {
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    // const user = useSelector(state => state.auth.user)
    useEffect(() => {
        user && console.log(user._id)
    }, [user])
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    return (
        <ImgCrop rotate>
             <Upload
                action={`http://localhost:3001/api/product/images/${user?._id}`}
                listType="picture-card"
                multiple={true}
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                name="productImages"
            >
                {user && fileList.length < 6 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
}

ImageUploader.propTypes = {
    user: PropTypes.object,
}

const mapStateToProps = (state) => {
    console.log(state,'sdfsf');
    return ({
    user:state.auth.user
})}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploader)
