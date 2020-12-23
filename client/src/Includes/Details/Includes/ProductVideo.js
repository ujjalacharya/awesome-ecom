import React from 'react'
import ModalVideo from 'react-modal-video'

const ProductVideo = (props) => {
    return (
        <div>
            <ModalVideo 
                channel='youtube' 
                autoplay
                isOpen={props.openVideo} 
                videoId="L61p2uyiMSo" 
                onClose={props.onCloseVideo} 
            />
            {/* <ReactPlayer controls={true} url='https://www.youtube.com/watch?v=iBFDGKfY7xU&ab_channel=BestEverFoodReviewShow' /> */}
        </div>
    )
}

export default ProductVideo